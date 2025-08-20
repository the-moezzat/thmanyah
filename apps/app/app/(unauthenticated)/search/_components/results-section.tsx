'use client';
import { useQueryState } from 'nuqs';
import ResultItem from './results/result-item';
import { useState } from 'react';
import { Grid, List, EllipsisVertical } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { cn } from '@repo/design-system/lib/utils';

function ResultsSection() {
  const [searchQuery] = useQueryState('q', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const [mediaType] = useQueryState('media', {
    defaultValue: 'podcast',
    clearOnDefault: true,
  });

  const [podcastView, setPodcastView] = useState<'scroll' | 'grid'>('scroll');

  return (
    <section>
      <header className="flex items-center justify-between border-b p-4">
        <h2 className="font-medium text-lg">Top {mediaType === 'podcast' ? 'Podcasts' : mediaType === 'all' ? 'Results' : mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} for {searchQuery} </h2>
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

      <main
        className={cn(' w-full gap-4 overflow-scroll p-4', {
          'grid w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))]':
            podcastView === 'grid',
          'flex flex-row items-center': podcastView === 'scroll',
        })}
      >
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="ب بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
        <ResultItem title="بودكاست فنجان" author="ثمانية" />
      </main>
    </section>
  );
}

export default ResultsSection;
