/**
 * Placeholder grid (card count = expected product slots, no visible labels).
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      data-placeholder-count={count}
      role="status"
    >
      <span className="sr-only">Loading</span>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="aspect-[4/3] animate-pulse bg-slate-200" />
          <div className="space-y-2 p-3">
            <div className="h-4 w-[85%] max-w-full animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
