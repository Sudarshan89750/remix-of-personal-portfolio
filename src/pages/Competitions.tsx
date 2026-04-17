import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { competitions, formatDeadline, formatINR } from '@/data/competitions';

export default function Competitions() {
  return (
    <>
      <SEOHead title="Competitions" description="Every PhotoGigs season \u2014 live, upcoming and past." />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            All competitions
          </p>
          <h1 className="font-display text-balance mt-3 text-6xl md:text-7xl leading-[0.95]">
            Every season, <em className="italic text-muted-foreground">on the record</em>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Open seasons, upcoming briefs and past winners \u2014 fully public, fully searchable.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border/70 border border-border/70 rounded-2xl overflow-hidden">
          {competitions.map((c) => (
            <article key={c.id} className="bg-background p-8 md:p-10 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.season}
                </span>
                <StatusBadge status={c.status} />
              </div>
              <h2 className="font-display text-4xl md:text-5xl mt-5 leading-tight">
                {c.title}
              </h2>
              <p className="mt-3 text-muted-foreground italic">{c.subtitle}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 text-sm">
                <Cell k="Prize" v={formatINR(c.prizeINR)} />
                <Cell k="Entry" v={formatINR(c.entryFeeINR)} />
                <Cell k="Deadline" v={formatDeadline(c.deadline)} />
              </dl>
              <div className="mt-8">
                <Button asChild className="rounded-full px-5">
                  <Link to={`/competitions/${c.slug}`}>
                    View brief <ArrowUpRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {k}
      </dt>
      <dd className="mt-1 font-medium tabular-nums">{v}</dd>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    open: 'Open',
    upcoming: 'Soon',
    judging: 'Scoring',
    closed: 'Closed',
  };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em]">
      <span
        className={
          status === 'open'
            ? 'size-1.5 rounded-full bg-emerald-500 animate-pulse'
            : 'size-1.5 rounded-full bg-muted-foreground/40'
        }
      />
      {map[status] ?? status}
    </span>
  );
}
