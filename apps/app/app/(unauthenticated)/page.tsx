// 'use client';
import { SearchForm } from './_components/search-form';
import AnimatedSphere from './_components/animated-sphere';

function Page() {
  return (
    <div className="flex flex-col items-center space-y-16 bg-[hsl(238,27%,12%)]">
      <AnimatedSphere size="150px" animationDuration={30} />

      <div className="w-3xl space-y-8">
        <SearchForm />
      </div>
    </div>
  );
}

export default Page;
