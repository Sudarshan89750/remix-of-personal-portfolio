import { brand } from '@/data/brand';

const items = [
  'Register',
  'Post your video',
  'Get engagement',
  'Top score wins',
  'Prize \u20b950,000',
  'Season 01',
];

export function MarqueeStrip() {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <section
      aria-label="Highlights"
      className="border-y border-border/60 bg-foreground text-background overflow-hidden"
    >
      <div className="relative flex whitespace-nowrap py-4">
        <div className="marquee flex shrink-0 items-center gap-10 pr-10">
          {loop.map((text, i) => (
            <span
              key={i}
              className="font-mono text-[11px] uppercase tracking-[0.28em] inline-flex items-center gap-10"
            >
              {text}
              <span aria-hidden className="opacity-40">
                \u2715
              </span>
            </span>
          ))}
        </div>
        <div className="marquee flex shrink-0 items-center gap-10 pr-10" aria-hidden>
          {loop.map((text, i) => (
            <span
              key={`b-${i}`}
              className="font-mono text-[11px] uppercase tracking-[0.28em] inline-flex items-center gap-10"
            >
              {text}
              <span className="opacity-40">\u2715</span>
            </span>
          ))}
        </div>
      </div>
      <div className="sr-only">{brand.hashtag}</div>
    </section>
  );
}
