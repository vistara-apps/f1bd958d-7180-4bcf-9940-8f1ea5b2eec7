'use client';

export function CardSkeleton() {
  return (
    <div className="bg-surface rounded-lg p-4 shadow-card animate-pulse" role="status" aria-label="Loading">
      <div className="flex items-center justify-between mb-3">
        <div className="h-6 w-20 bg-primary/20 rounded-full" />
        <div className="h-4 w-16 bg-primary/20 rounded" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20" />
          <div className="space-y-2">
            <div className="h-4 w-20 bg-primary/20 rounded" />
            <div className="h-3 w-16 bg-primary/20 rounded" />
          </div>
        </div>
        <div className="h-6 w-8 bg-danger/20 rounded" />
        <div className="flex items-center gap-3">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-primary/20 rounded" />
            <div className="h-3 w-16 bg-primary/20 rounded" />
          </div>
          <div className="w-12 h-12 rounded-full bg-accent/20" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-primary/10">
        <div className="h-4 w-24 bg-primary/20 rounded" />
        <div className="h-4 w-16 bg-primary/20 rounded" />
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="bg-surface rounded-lg p-4 text-center animate-pulse" role="status" aria-label="Loading">
      <div className="h-8 w-16 bg-primary/20 rounded mx-auto mb-2" />
      <div className="h-3 w-20 bg-primary/20 rounded mx-auto" />
    </div>
  );
}

export function LeaderboardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-surface animate-pulse" role="status" aria-label="Loading">
      <div className="w-10 h-10 rounded-full bg-primary/20" />
      <div className="w-12 h-12 rounded-full bg-primary/20" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-24 bg-primary/20 rounded" />
        <div className="h-3 w-32 bg-primary/20 rounded" />
      </div>
      <div className="text-right space-y-2">
        <div className="h-4 w-20 bg-primary/20 rounded ml-auto" />
        <div className="h-3 w-16 bg-primary/20 rounded ml-auto" />
      </div>
    </div>
  );
}
