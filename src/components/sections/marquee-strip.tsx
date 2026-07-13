import React from "react";
import { brand } from "@/data/brand";

export function MarqueeStrip() {
  const items = [
    "Compete",
    "Create",
    "Win",
    "Prize \u20B950,000",
    "API-scored",
    "No judges",
    "Season 01",
  ];

  return (
    <section 
      className="bg-foreground text-background py-4 overflow-hidden border-y border-border select-none relative z-20"
      aria-label="Challenge highlights banner"
    >
      <span className="sr-only">
        Active challenge tag: {brand.social.hashtag}. {items.join(", ")}
      </span>

      <div className="flex w-max relative" aria-hidden="true">
        <div className="animate-marquee flex gap-12 items-center whitespace-nowrap pr-12">
          {items.map((item, idx) => (
            <React.Fragment key={`track1-${idx}`}>
              <span className="font-display font-bold text-lg tracking-wider uppercase">
                {item}
              </span>
              <span className="text-brand/60 text-sm font-mono">&mdash;</span>
            </React.Fragment>
          ))}
        </div>
        
        <div className="animate-marquee flex gap-12 items-center whitespace-nowrap pr-12">
          {items.map((item, idx) => (
            <React.Fragment key={`track2-${idx}`}>
              <span className="font-display font-bold text-lg tracking-wider uppercase">
                {item}
              </span>
              <span className="text-brand/60 text-sm font-mono">&mdash;</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
