export default function Loading() {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-pulse w-full">
      {/* Hero skeleton */}
      <div className="h-[460px] sm:h-[520px] md:h-[560px] w-full rounded-3xl bg-secondary/70 border border-border/40" />

      {/* Row 1 skeleton */}
      <div className="flex flex-col gap-3">
        <div className="h-6 w-52 rounded-lg bg-secondary/60" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] w-40 sm:w-48 rounded-xl bg-secondary/80 shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Row 2 skeleton */}
      <div className="flex flex-col gap-3">
        <div className="h-6 w-44 rounded-lg bg-secondary/60" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] w-40 sm:w-48 rounded-xl bg-secondary/80 shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

