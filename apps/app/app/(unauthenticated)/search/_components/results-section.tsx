'use client';
import { useItunesSearch } from '@/app/(unauthenticated)/search/_hooks/use-itunes-search';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { cn } from '@repo/design-system/lib/utils';
import { EllipsisVertical, Grid, List } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useState } from 'react';
import ResultItem from './results/result-item';
import ResultItemSkeleton from './results/result-item-skeleton';

function ResultsSection() {
  const [searchQuery] = useQueryState('q', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const [mediaType] = useQueryState('media', {
    defaultValue: 'podcast',
    clearOnDefault: true,
  });

  const [podcastView, setPodcastView] = useState<'scroll' | 'grid'>('grid');

  const { data, isLoading, error } = useItunesSearch(
    { term: searchQuery, limit: 20 },
    !!searchQuery.trim()
  );

  return (
    <section>
      <header className="flex items-center justify-between border-b p-4">
        <h2 className="font-medium text-lg">
          {searchQuery
            ? `Top ${mediaType} for ${searchQuery}`
            : 'iTunes Search Results'}
          {data?.savedCount && ` (${data.savedCount} cached)`}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {podcastView === 'scroll' && (
              <DropdownMenuItem onClick={() => setPodcastView('grid')}>
                <Grid className="mr-2 h-4 w-4" />
                Switch Layout to Grid
              </DropdownMenuItem>
            )}
            {podcastView === 'grid' && (
              <DropdownMenuItem onClick={() => setPodcastView('scroll')}>
                <List className="mr-2 h-4 w-4" />
                Switch Layout to Scroll
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {isLoading && (
        <div className="flex flex-wrap items-center gap-4 p-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ResultItemSkeleton key={index} />
          ))}
        </div>
      )}

      <main
        className={cn(' w-full gap-4 overflow-scroll p-4', {
          'grid w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))]':
            podcastView === 'grid',
          'flex flex-row items-start': podcastView === 'scroll',
        })}
      >
        {error && (
          <div className="flex w-full items-center justify-center py-8 text-red-500">
            <span>Error: {error.message}</span>
          </div>
        )}

        {data && data.results.length === 0 && searchQuery && (
          <div className="flex w-full items-center justify-center py-8 text-gray-500">
            <span>No results found for "{searchQuery}"</span>
          </div>
        )}

        {data?.results.map((result) => (
          <ResultItem
            key={result.trackId}
            title={result.trackName}
            author={result.artistName}
            imageUrl={result.artworkUrl100}
          />
        ))}
      </main>
    </section>
  );
}

export default ResultsSection;
