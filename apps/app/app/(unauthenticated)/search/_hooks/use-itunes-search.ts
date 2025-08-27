import { useQuery } from '@tanstack/react-query';
import {
  type ItunesSearchResponse,
  type SearchParams,
  itunesApi,
} from '../_actions/itunes';

export function useItunesSearch(params: SearchParams, enabled = true) {
  return useQuery<ItunesSearchResponse, Error>({
    queryKey: ['itunes-search', params.term, params.limit],
    queryFn: () => itunesApi.search(params),
    enabled: enabled && !!params.term.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
