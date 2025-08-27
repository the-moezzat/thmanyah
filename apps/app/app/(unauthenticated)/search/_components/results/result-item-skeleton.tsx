import { Skeleton } from '@repo/design-system/components/ui/skeleton';

export default function ResultItemSkeleton() {
  return (
    <div className="max-w-60 shrink-0 grow space-y-2">
      <Skeleton className="aspect-square w-60 rounded-sm" />
      <div>
        <Skeleton className="mb-1 h-7 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  );
}
