export function ProductDetailSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl animate-pulse px-4 py-10 sm:px-6"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading</span>
      <div className="mb-8 h-8 w-48 rounded bg-slate-200" />
      <div className="h-5 w-full max-w-2xl rounded bg-slate-200" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="aspect-[4/3] rounded-xl bg-slate-200" />
        <div className="space-y-3">
          <div className="h-8 w-32 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-[66%] rounded bg-slate-200" />
          <div className="h-10 w-40 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
