export default function DivisionDetailLoading() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-8 animate-pulse">
      {/* Back Link Skeleton */}
      <div className="h-5 w-36 bg-muted rounded" />

      {/* Main Card Skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-muted shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-8 w-64 max-w-full bg-muted rounded-lg" />
            <div className="h-4 w-96 max-w-full bg-muted/70 rounded" />
          </div>
        </div>

        {/* Projects Grid Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted/70 rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Members Grid Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 bg-muted/70 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
