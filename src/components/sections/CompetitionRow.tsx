import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { formatDeadline, formatINR } from '../../data/competitions';
import type { Competition, CompetitionStatus } from '../../data/competitions';
import { cn } from '../../lib/utils';

interface Props {
  competition: Competition;
  index: number;
}

export function CompetitionRow({ competition: c, index }: Props) {
  const isClosed = c.status === 'closed';
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group border-b border-border"
    >
      <a
        href={`/competitions/${c.slug}`}
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
            <StatusDot status={c.status as CompetitionStatus} />
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
      </a>
    </motion.div>
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
