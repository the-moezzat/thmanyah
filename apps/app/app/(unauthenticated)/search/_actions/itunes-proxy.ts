'use server';

import type { ItunesSearchResponse } from './itunes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';

export async function searchItunesProxy(
  term: string,
  limit = 25,
  media?: string,
  entity?: string
): Promise<ItunesSearchResponse> {
  try {
    // Validate input parameters
    if (!term || term.trim().length === 0) {
      throw new Error('Search term is required');
    }

    if (limit < 1 || limit > 200) {
      throw new Error('Limit must be between 1 and 200');
    }

    // Build query parameters for our NestJS API
    const params = new URLSearchParams({
      term: term.trim(),
      limit: limit.toString(),
      ...(media && { media }),
      ...(entity && { entity }),
    });

    // Make request to our NestJS API endpoint
    const response = await fetch(
      `${API_BASE_URL}/search?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'Thmanyah-App/1.0',
        },
        // Add timeout and error handling
        signal: AbortSignal.timeout(15000), // 15 second timeout
      }
    );

    // Handle different HTTP status codes
    if (!response.ok) {
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If we can't parse error response, use default message
      }

      // Handle specific status codes
      switch (response.status) {
        case 400:
          throw new Error(`Bad request: ${errorMessage}`);
        case 401:
          throw new Error('Unauthorized access to API');
        case 403:
          throw new Error('Access forbidden');
        case 404:
          throw new Error('API endpoint not found');
        case 429:
          throw new Error('Too many requests. Please try again later.');
        case 500:
          throw new Error('Internal server error. Please try again later.');
        case 502:
        case 503:
        case 504:
          throw new Error(
            'Service temporarily unavailable. Please try again later.'
          );
        default:
          throw new Error(errorMessage);
      }
    }

    const data: ItunesSearchResponse = await response.json();

    // Validate response structure
    if (
      !data ||
      typeof data.resultCount !== 'number' ||
      !Array.isArray(data.results)
    ) {
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (error) {
    console.error('iTunes proxy error:', error);

    // Handle different types of errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Network error: Unable to connect to the API. Please check your internet connection.'
      );
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        'Request timeout: The API took too long to respond. Please try again.'
      );
    }

    // Return a structured error response
    if (error instanceof Error) {
      throw new Error(`Failed to search iTunes: ${error.message}`);
    }

    throw new Error('Failed to search iTunes: Unknown error occurred');
  }
}

// Alternative server action for more specific searches
export async function searchItunesByCategory(
  term: string,
  category: 'music' | 'movie' | 'podcast' | 'audiobook' | 'software' | 'ebook',
  limit = 25
): Promise<ItunesSearchResponse> {
  const mediaMap = {
    music: 'music',
    movie: 'movie',
    podcast: 'podcast',
    audiobook: 'audiobook',
    software: 'software',
    ebook: 'ebook',
  };

  return searchItunesProxy(term, limit, mediaMap[category]);
}
