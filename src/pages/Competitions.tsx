import { Link } from 'react-router-dom';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  competitions,
  formatDeadline,
  formatINR,
  type Competition,
  type CompetitionStatus,
} from '@/data/competitions';
import { cn } from '@/lib/utils';

const ORDER: CompetitionStatus[] = ['open', 'upcoming', 'judging', 'closed'];

export default function Competitions() {
  const featured =
    competitions.find((c) => c.status === 'open' && c.featured) ??
    competitions.find((c) => c.status === 'open');
  const rest = competitions
    .filter((c) => c.id !== featured?.id)
    .sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status));

  const totalPrizePool = competitions.reduce((s, c) => s + c.prizeINR, 0);
  const openCount = competitions.filter((c) => c.status === 'open').length;
  const upcomingCount = competitions.filter((c) => c.status === 'upcoming').length;

  return (
    <>
      <SEOHead
        title="Competitions"
        description="Every PhotoGigs season — live, upcoming and past."
      />

      {/* ============ EDITORIAL HEADER ============ */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--foreground)/0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Vol. 01 · The Index
                </span>
                <span className="h-px w-10 bg-border" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {competitions.length} seasons
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-display text-balance mt-6 text-[clamp(3rem,8vw,7rem)] leading-[0.92]"
              >
                Every season,
                <br />
                <em className="italic text-muted-foreground">on the record.</em>
              </motion.h1>

              <p className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty">
                Open briefs, the ones we're cooking next, and the archive of
                what already happened. Public scores. Public winners. No edits
                after the fact.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-3 gap-4">
              <Metric label="Total prizes" value={formatINR(totalPrizePool)} />
              <Metric label="Live now" value={String(openCount).padStart(2, '0')} />
              <Metric label="Upcoming" value={String(upcomingCount).padStart(2, '0')} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      {featured && (
        <section className="border-b border-border/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <FeaturedCard competition={featured} />
          </div>
        </section>
      )}

      {/* ============ THE INDEX ============ */}
      <section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                The archive
              </p>
              <h2 className="font-display text-5xl md:text-6xl mt-2 leading-none">
                Past, present, <em className="italic text-muted-foreground">pending.</em>
              </h2>
            </div>
            <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {String(rest.length).padStart(2, '0')} entries
            </span>
          </div>

          <div className="border-t border-border">
            {rest.map((c, i) => (
              <CompetitionRow key={c.id} competition={c} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ Featured ============ */
function FeaturedCard({ competition: c }: { competition: Competition }) {
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
              <Link to={`/competitions/${c.slug}`}>
                Read the brief <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 h-12 text-base"
            >
              <Link to="/#register">Register · {formatINR(c.entryFeeINR)}</Link>
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

/* ============ Row ============ */
function CompetitionRow({
  competition: c,
  index,
}: {
  competition: Competition;
  index: number;
}) {
  const isClosed = c.status === 'closed';
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group border-b border-border"
    >
      <Link
        to={`/competitions/${c.slug}`}
        className="grid grid-cols-12 gap-4 md:gap-8 items-center py-8 md:py-10 transition-colors hover:bg-muted/40 px-2 md:px-4 -mx-2 md:-mx-4 rounded-xl"
      >
        <div className="col-span-1 font-mono text-xs text-muted-foreground tabular-nums">
          {String(index).padStart(2, '0')}
        </div>

        <div className="col-span-11 md:col-span-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {c.season}
            </span>
            <StatusDot status={c.status} />
          </div>
          <h3
            className={cn(
              'font-display text-3xl md:text-4xl leading-tight transition-transform origin-left group-hover:translate-x-1',
              isClosed && 'text-muted-foreground'
            )}
          >
            {c.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground italic line-clamp-1">
            {c.subtitle}
          </p>
        </div>

        <div className="hidden md:block md:col-span-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <div className="text-[10px] text-muted-foreground/70">Prize</div>
          <div className="mt-1 text-foreground tabular-nums text-sm normal-case font-sans font-medium">
            {formatINR(c.prizeINR)}
          </div>
        </div>

        <div className="hidden md:block md:col-span-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <div className="text-[10px] text-muted-foreground/70">Deadline</div>
          <div className="mt-1 text-foreground text-sm normal-case font-sans font-medium">
            {formatDeadline(c.deadline)}
          </div>
        </div>

        <div className="col-span-12 md:col-span-1 flex md:justify-end">
          <span className="inline-flex items-center justify-center size-10 rounded-full border border-border text-foreground transition-all group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ============ Atoms ============ */
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="font-display text-2xl md:text-3xl mt-1 tabular-nums leading-none">
        {value}
      </div>
    </div>
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

function StatusDot({ status }: { status: CompetitionStatus }) {
  const map: Record<CompetitionStatus, { label: string; cls: string }> = {
    open: { label: 'Open', cls: 'bg-emerald-500 animate-pulse' },
    upcoming: { label: 'Soon', cls: 'bg-amber-500' },
    judging: { label: 'Scoring', cls: 'bg-blue-500' },
    closed: { label: 'Closed', cls: 'bg-muted-foreground/40' },
  };
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      <span className={cn('size-1.5 rounded-full', s.cls)} />
      {s.label}
    </span>
  );
}
