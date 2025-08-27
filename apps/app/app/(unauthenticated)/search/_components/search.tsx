'use client';

import { Input } from '@repo/design-system/components/ui/input';
import { useQueryState } from 'nuqs';

function Search() {
  const [searchQuery, setSearchQuery] = useQueryState('q', {
    defaultValue: '',
    clearOnDefault: true,
  });

  return (
    <div>
      <Input
        className="w-full text-center dark:bg-main-background"
        placeholder="Search iTunes music, movies, podcasts, and more"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default Search;
