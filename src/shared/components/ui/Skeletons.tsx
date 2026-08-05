export const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="bg-white p-4">
    <SkeletonBlock className="w-full h-96 mb-4 rounded-lg" />
    <SkeletonBlock className="h-4 w-3/4 mb-2" />
    <SkeletonBlock className="h-4 w-1/4" />
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ListSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg">
        <SkeletonBlock className="w-16 h-16 rounded-md shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-4 w-1/3" />
          <SkeletonBlock className="h-4 w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

export const DetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
    <SkeletonBlock className="w-full h-[500px] rounded-lg" />
    <div className="space-y-4">
      <SkeletonBlock className="h-8 w-2/3" />
      <SkeletonBlock className="h-4 w-1/3" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-2/3" />
      <SkeletonBlock className="h-12 w-40 rounded" />
    </div>
  </div>
);
