import { ScrollReveal } from '@/components/ui/ScrollReveal';

const reasons = [
  {
    k: '01',
    title: 'No judges. No politics.',
    body: 'Engagement is the only judge. Your audience picks the winner, not someone\u2019s friend on a panel.',
  },
  {
    k: '02',
    title: 'Real cash. Wired in 7 days.',
    body: 'No \u201cgift hampers\u201d, no \u201cbrand exposure\u201d \u2014 actual money in your account inside a week of the deadline.',
  },
  {
    k: '03',
    title: 'You keep your reach.',
    body: 'Every entry lives on your own Reels or Shorts \u2014 you grow your audience whether you win or not.',
  },
  {
    k: '04',
    title: 'Built for India.',
    body: 'Pricing in rupees. UPI checkout. Briefs that understand the country you actually shoot in.',
  },
  {
    k: '05',
    title: 'Affordable on purpose.',
    body: '\u20b9199 entry. Less than a memory card. Designed so the next great photographer isn\u2019t locked out by cost.',
  },
  {
    k: '06',
    title: 'A community, not a contest.',
    body: 'Competitions are step one. Jobs, hiring, gear marketplace and a photographer network are rolling out next.',
  },
];

export function WhyPhotoGigs() {
  return (
    <section
      id="why"
      className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Why PhotoGigs
            </p>
            <h2 className="font-display mt-3 text-5xl md:text-6xl leading-[0.95] text-balance">
              The competition <em className="italic">photographers</em> wish existed.
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/70 border border-border/70 rounded-2xl overflow-hidden">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.k} delay={0.04 * i}>
              <div className="bg-background p-8 h-full">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {r.k}
                </div>
                <h3 className="font-display text-2xl md:text-3xl mt-4 leading-tight">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {r.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
