// 'use client';
import { SearchForm } from './_components/search-form';
import AnimatedSphere from '@repo/design-system/components/animated-sphere';

function Page() {
  return (
    <div className="container relative grid h-dvh flex-col items-center justify-center bg-main-background lg:max-w-none lg:px-0">
      <div className="flex flex-col items-center space-y-16 bg-[hsl(238,27%,12%)]">
        <AnimatedSphere size="150px" animationDuration={30} />

        <div className="w-3xl space-y-8">
          <SearchForm />
        </div>
      </div>{' '}
    </div>
  );
}

export default Page;
