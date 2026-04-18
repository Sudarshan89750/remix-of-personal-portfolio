import { motion } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { formatDeadline, formatINR } from '../../data/competitions';
import type { Competition } from '../../data/competitions';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface Props {
  competition: Competition;
}

export function FeaturedCompetitionCard({ competition: c }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="group relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-background via-background to-muted/40 p-8 md:p-14"
    >
      <div className="absolute inset-0 -z-10 opacity-[0.04] [background:radial-gradient(circle_at_30%_20%,hsl(var(--foreground))_0%,transparent_50%)]" />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em]">
              <Trophy className="size-3" />
              Featured · Now live
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {c.season}
            </span>
          </div>

          <h3 className="font-display text-balance mt-6 text-5xl md:text-7xl leading-[0.95]">
            {c.title}
          </h3>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground italic max-w-xl text-pretty">
            {c.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6 h-12 text-base">
              <a href={`/competitions/${c.slug}`}>
                Read the brief <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 h-12 text-base"
            >
              <a href="/#register">Register · {formatINR(c.entryFeeINR)}</a>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
            <BigCell k="Prize pool" v={formatINR(c.prizeINR)} accent />
            <BigCell k="Entry" v={formatINR(c.entryFeeINR)} />
            <BigCell k="Deadline" v={formatDeadline(c.deadline)} />
            <BigCell k="Hashtag" v={c.hashtag} mono />
          </dl>
        </div>
      </div>
    </motion.article>
  );
}

function BigCell({
  k,
  v,
  accent,
  mono,
}: {
  k: string;
  v: string;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <div
      className={cn(
        'p-6 md:p-7 bg-background',
        accent && 'bg-foreground text-background'
      )}
    >
      <div
        className={cn(
          'font-mono text-[10px] uppercase tracking-[0.22em]',
          accent ? 'text-background/60' : 'text-muted-foreground'
        )}
      >
        {k}
      </div>
      <div
        className={cn(
          'mt-2 leading-none',
          mono ? 'font-mono text-base' : 'font-display text-3xl md:text-4xl'
        )}
      >
        {v}
      </div>
    </div>
  );
}
