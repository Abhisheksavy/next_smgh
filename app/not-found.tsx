export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      {/* Animated spinner */}
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute h-12 w-12 rounded-full border-4 border-muted-foreground border-t-primary animate-spin-smooth" />
      </div>

      {/* Loading text */}
      <p className="mt-6 text-sm font-medium text-muted-foreground tracking-wide animate-pulse">
        Preparing your experience...
      </p>

      {/* Shimmer progress bar */}
      <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/3 animate-shimmer rounded-full bg-primary" />
      </div>
    </div>
  );
}
