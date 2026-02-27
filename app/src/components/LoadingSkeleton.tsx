export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Banner Skeleton */}
      <div className="aspect-[16/9] md:aspect-[21/9] bg-muted rounded-xl mb-6" />
      
      {/* Section Skeleton */}
      <div className="py-4">
        <div className="h-6 bg-muted rounded w-32 mb-4 mx-4" />
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar md:hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-32">
              <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
          {[...Array(12)].map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar md:hidden">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-32 animate-pulse">
          <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
          <div className="h-4 bg-muted rounded w-full" />
        </div>
      ))}
    </div>
  );
};

export const DetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Cover Skeleton */}
      <div className="aspect-[16/9] md:aspect-[21/9] bg-muted rounded-xl mb-6" />
      
      <div className="px-4">
        {/* Title Skeleton */}
        <div className="h-8 bg-muted rounded w-3/4 mb-4" />
        
        {/* Meta Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-6 bg-muted rounded w-20" />
        </div>
        
        {/* Synopsis Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
        
        {/* Episodes Skeleton */}
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};
