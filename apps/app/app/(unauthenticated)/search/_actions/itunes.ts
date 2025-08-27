export interface ItunesSearchResult {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  artworkUrl100: string;
  artworkUrl60: string;
  trackPrice?: number;
  collectionPrice?: number;
  currency?: string;
  primaryGenreName: string;
  releaseDate: string;
  trackTimeMillis?: number;
  country: string;
  previewUrl?: string;
}

export interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesSearchResult[];
  savedCount?: number;
}

export interface SearchParams {
  term: string;
  limit?: number;
  media?: string;
  entity?: string;
}

import { searchItunesProxy } from './itunes-proxy';

class ItunesApi {
  async search(params: SearchParams): Promise<ItunesSearchResponse> {
    return await searchItunesProxy(
      params.term,
      params.limit || 25,
      params.media,
      params.entity
    );
  }
}

export const itunesApi = new ItunesApi();
