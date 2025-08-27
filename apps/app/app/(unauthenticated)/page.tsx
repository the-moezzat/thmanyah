// 'use client';
import { SearchForm } from './_components/search-form';
import AnimatedSphere from '@repo/design-system/components/animated-sphere';

function Page() {
  return (
    <div className="relative grid h-dvh flex-col items-center justify-center bg-main-background lg:max-w-none lg:px-0">
      <div className="flex flex-col items-center space-y-16 bg-[hsl(238,27%,12%)]">
        <AnimatedSphere animationDuration={30} />

        <div className="space-y-8 md:w-xl lg:w-3xl">
          <SearchForm />
        </div>
      </div>{' '}
    </div>
  );
}

export default Page;
