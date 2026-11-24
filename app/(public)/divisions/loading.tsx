export default function DivisionsLoading() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="h-9 w-56 bg-muted rounded-xl mx-auto" />
        <div className="h-5 w-96 max-w-full bg-muted/70 rounded-lg mx-auto" />
      </div>

      {/* Divisions Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-muted" />
                <div className="w-9 h-9 rounded-full bg-muted" />
              </div>
              <div className="h-7 w-48 bg-muted rounded-lg mb-3" />
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-muted/70 rounded" />
                <div className="h-4 w-3/4 bg-muted/70 rounded" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
              <div className="h-7 w-24 bg-muted rounded-full" />
              <div className="h-7 w-24 bg-muted rounded-full" />
              <div className="h-7 w-28 bg-muted rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
