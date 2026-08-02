export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card">
      <div className="aspect-[2/3] animate-pulse bg-secondary" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse bg-secondary" />
        <div className="h-3 w-1/2 animate-pulse bg-secondary" />
      </div>
    </div>
  );
}
