export interface iTunesSearchResponse {
  resultCount: number;
  results: iTunesTrack[];
}

export interface iTunesTrack {
  trackId?: number;
  artistName?: string;
  trackName?: string;
  collectionName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate?: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  discCount?: number;
  discNumber?: number;
  trackCount?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  country?: string;
  currency?: string;
  primaryGenreName?: string;
  kind?: string;
  wrapperType?: string;
}

const BASE_URL = 'https://itunes.apple.com/search';

export async function searchiTunes(
  term: string,
  limit = 50
): Promise<iTunesSearchResponse> {
  try {
    console.log(term);

    const url = new URL(BASE_URL);
    url.searchParams.append('term', term);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('media', 'podcast');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `iTunes API error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as iTunesSearchResponse;
    return data;
  } catch (error) {
    console.error('Error searching iTunes:', error);
    throw new Error('Failed to search iTunes API');
  }
}
