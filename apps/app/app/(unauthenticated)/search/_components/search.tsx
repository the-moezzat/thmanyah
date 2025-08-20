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
        placeholder="Search through over 70 million podcasts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default Search;
