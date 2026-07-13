import { HeroSkeleton, SectionSkeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center border-b border-border bg-background/80">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="skeleton size-5 rounded" />
            <div className="skeleton w-24 h-5" />
          </div>
          <div className="flex items-center gap-3">
            <div className="skeleton size-9 rounded-lg" />
            <div className="skeleton w-28 h-9 rounded-lg" />
          </div>
        </div>
      </header>
      <HeroSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
    </div>
  );
}
