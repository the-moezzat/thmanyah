import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@repo/database/generated/client';
import type { iTunesSearchResponse, iTunesTrack } from './dto/itunes.dto';

@Injectable()
export class iTunesService {
  private readonly logger = new Logger(iTunesService.name);
  private readonly prisma = new PrismaClient();
  private readonly BASE_URL = 'https://itunes.apple.com/search';

  async searchiTunes(term: string, limit = 50): Promise<iTunesSearchResponse> {
    try {
      this.logger.log(`Searching iTunes for: ${term}`);

      const url = new URL(this.BASE_URL);
      url.searchParams.append('term', term);
      url.searchParams.append('limit', limit.toString());
      url.searchParams.append('media', 'podcast');

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(
          `iTunes API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = (await response.json()) as iTunesSearchResponse;
      return data;
    } catch (error) {
      this.logger.error('Error searching iTunes:', error);
      throw new Error('Failed to search iTunes API');
    }
  }

  async getCachedSearchResults(searchTerm: string): Promise<iTunesTrack[]> {
    try {
      this.logger.log(`Checking cache for search term: ${searchTerm}`);

      const cachedResults = await this.prisma.iTunesSearchResult.findMany({
        where: {
          searchTerm: {
            equals: searchTerm,
            mode: 'insensitive',
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (cachedResults.length > 0) {
        this.logger.log(
          `Found ${cachedResults.length} cached results for: ${searchTerm}`,
        );

        // Convert database results back to iTunesTrack format
        return cachedResults.map((result) => ({
          trackId: result.trackId ?? undefined,
          artistName: result.artistName ?? undefined,
          trackName: result.trackName ?? undefined,
          collectionName: result.collectionName ?? undefined,
          artistViewUrl: result.artistViewUrl ?? undefined,
          collectionViewUrl: result.collectionViewUrl ?? undefined,
          trackViewUrl: result.trackViewUrl ?? undefined,
          previewUrl: result.previewUrl ?? undefined,
          artworkUrl30: result.artworkUrl30 ?? undefined,
          artworkUrl60: result.artworkUrl60 ?? undefined,
          artworkUrl100: result.artworkUrl100 ?? undefined,
          collectionPrice: result.collectionPrice ?? undefined,
          trackPrice: result.trackPrice ?? undefined,
          releaseDate: result.releaseDate?.toISOString(),
          collectionExplicitness: result.collectionExplicitness ?? undefined,
          trackExplicitness: result.trackExplicitness ?? undefined,
          discCount: result.discCount ?? undefined,
          discNumber: result.discNumber ?? undefined,
          trackCount: result.trackCount ?? undefined,
          trackNumber: result.trackNumber ?? undefined,
          trackTimeMillis: result.trackTimeMillis ?? undefined,
          country: result.country ?? undefined,
          currency: result.currency ?? undefined,
          primaryGenreName: result.primaryGenreName ?? undefined,
          kind: result.kind ?? undefined,
          wrapperType: result.wrapperType ?? undefined,
        }));
      }

      this.logger.log(`No cached results found for: ${searchTerm}`);
      return [];
    } catch (error) {
      this.logger.error('Error retrieving cached search results:', error);
      return [];
    }
  }

  async searchWithCache(
    term: string,
    limit = 50,
  ): Promise<iTunesSearchResponse> {
    try {
      // First, check if we have cached results
      const cachedResults = await this.getCachedSearchResults(term);

      if (cachedResults.length > 0) {
        this.logger.log(
          `Returning ${cachedResults.length} cached results for: ${term}`,
        );
        return {
          resultCount: cachedResults.length,
          results: cachedResults,
        };
      }

      // If no cached results, search iTunes API
      this.logger.log(`No cache found, searching iTunes API for: ${term}`);
      const itunesResponse = await this.searchiTunes(term, limit);

      // Save the new results to database
      if (itunesResponse.results && itunesResponse.results.length > 0) {
        await this.saveSearchResults(term, itunesResponse.results);
        this.logger.log(
          `Saved ${itunesResponse.results.length} new results to cache for: ${term}`,
        );
      }

      return itunesResponse;
    } catch (error) {
      this.logger.error('Error in cache-first search:', error);
      throw new Error('Failed to perform search with cache');
    }
  }

  async saveSearchResults(
    searchTerm: string,
    results: iTunesTrack[],
  ): Promise<number> {
    try {
      const savedResults = await Promise.all(
        results.map(async (track) => {
          return this.prisma.iTunesSearchResult.create({
            data: {
              searchTerm,
              trackId: track.trackId,
              artistName: track.artistName,
              trackName: track.trackName,
              collectionName: track.collectionName,
              artistViewUrl: track.artistViewUrl,
              collectionViewUrl: track.collectionViewUrl,
              trackViewUrl: track.trackViewUrl,
              previewUrl: track.previewUrl,
              artworkUrl30: track.artworkUrl30,
              artworkUrl60: track.artworkUrl60,
              artworkUrl100: track.artworkUrl100,
              collectionPrice: track.collectionPrice,
              trackPrice: track.trackPrice,
              releaseDate: track.releaseDate
                ? new Date(track.releaseDate)
                : null,
              collectionExplicitness: track.collectionExplicitness,
              trackExplicitness: track.trackExplicitness,
              discCount: track.discCount,
              discNumber: track.discNumber,
              trackCount: track.trackCount,
              trackNumber: track.trackNumber,
              trackTimeMillis: track.trackTimeMillis,
              country: track.country,
              currency: track.currency,
              primaryGenreName: track.primaryGenreName,
              kind: track.kind,
              wrapperType: track.wrapperType,
            },
          });
        }),
      );

      this.logger.log(
        `Saved ${savedResults.length} search results for term: ${searchTerm}`,
      );
      return savedResults.length;
    } catch (error) {
      this.logger.error('Error saving search results to database:', error);
      throw error;
    }
  }
}
