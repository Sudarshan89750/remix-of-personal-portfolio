import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

export function HeroSkeleton() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 bg-background overflow-hidden" aria-busy="true" aria-label="Loading content">
      <div className="container mx-auto px-4 max-w-7xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Skeleton className="w-32 h-5 rounded-full" />
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-3/4 h-4" />
            <div className="flex gap-4 mt-2">
              <Skeleton className="w-40 h-12 rounded-lg" />
              <Skeleton className="w-32 h-12 rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-6 border-t border-border/60 mt-6 pt-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-12 h-3" />
                <Skeleton className="w-20 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-12 h-3" />
                <Skeleton className="w-20 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-12 h-3" />
                <Skeleton className="w-20 h-6" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <Skeleton className="w-full max-w-[420px] aspect-[4/5] rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-24 border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col gap-8">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-96 h-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
