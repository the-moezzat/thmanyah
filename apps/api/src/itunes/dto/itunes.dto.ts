export class SearchQueryDto {
  term: string;
  limit?: number = 50;
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

export interface iTunesSearchResponse {
  resultCount: number;
  results: iTunesTrack[];
}

export interface SearchResponseDto {
  searchTerm: string;
  resultCount: number;
  savedCount?: number;
  results: iTunesTrack[];
}
