import { ArrowUpRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  formatDeadline,
  formatINR,
  type Competition,
} from '@/data/competitions';

interface Props {
  competition: Competition;
}

export function CompetitionSection({ competition }: Props) {
  return (
    <section
      id="competition"
      className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Registrations open \u00b7 {competition.season}
            </div>
            <h2 className="font-display text-balance mt-5 text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
              {competition.title}.
              <br />
              <span className="italic text-muted-foreground">
                {competition.subtitle}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              {competition.description} Post on Instagram Reels or YouTube
              Shorts with{' '}
              <span className="text-foreground font-medium">
                {competition.hashtag}
              </span>
              . The post with the highest engagement \u2014 measured by our
              public API \u2014 takes the prize.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6 h-12">
                <Link to="/#register">
                  Register now
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 h-12"
              >
                <Link to="/#how-it-works">How it works</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-5">
          <ScrollReveal delay={0.15}>
            <div className="relative rounded-3xl border border-border bg-card p-8 md:p-10 shadow-[0_1px_0_0_hsl(var(--border)),0_30px_60px_-30px_rgb(0_0_0_/_0.18)]">
              <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-background text-[10px] font-mono uppercase tracking-[0.2em]">
                <Trophy className="size-3" />
                Live brief
              </div>
              <dl className="space-y-7">
                <Row
                  k="Prize pool"
                  v={formatINR(competition.prizeINR)}
                  big
                />
                <Row k="Entry fee" v={formatINR(competition.entryFeeINR)} />
                <Row k="Deadline" v={formatDeadline(competition.deadline)} />
                <Row k="Hashtag" v={competition.hashtag} mono />
                <Row k="Platforms" v={competition.platforms.join(' \u00b7 ')} />
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Row({
  k,
  v,
  big = false,
  mono = false,
}: {
  k: string;
  v: string;
  big?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border/70 pb-4 last:border-0 last:pb-0">
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {k}
      </dt>
      <dd
        className={[
          big ? 'font-display text-4xl md:text-5xl' : 'text-base',
          mono ? 'font-mono text-sm' : '',
          'text-foreground tracking-tight',
        ].join(' ')}
      >
        {v}
      </dd>
    </div>
  );
}
