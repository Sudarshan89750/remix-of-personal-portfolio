import React, { type ReactNode } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Competition } from '@/data/competitions';

interface Props {
  competition: Competition;
}

export function ScoringSection({ competition }: Props) {
  return (
    <section
      id="scoring"
      className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border/60 bg-secondary/40"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Scoring system
            </p>
            <h2 className="font-display mt-3 text-5xl md:text-6xl leading-[0.95] text-balance">
              The scoreboard is <em className="italic">public</em>.
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
              No anonymous jury. No “winner’s choice” emails.
              Every entry is scored by a weighted blend of real platform
              metrics, pulled directly from Instagram API and
              published live.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <Pill>API-based, not opinion-based</Pill>
              <Pill>Updated every few minutes</Pill>
              <Pill>Public leaderboard for every season</Pill>
              <Pill>Zero bias. Zero backroom shortlists.</Pill>
            </ul>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <ScrollReveal delay={0.15}>
            <div className="rounded-3xl border border-border bg-background p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl md:text-3xl">
                  Weighting formula
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  100% transparent
                </span>
              </div>
              <div className="mt-8 space-y-7">
                {competition.scoring.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-base font-medium">{s.label}</div>
                        {s.note && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {s.note}
                          </div>
                        )}
                      </div>
                      <div className="font-display text-3xl tabular-nums">
                        {s.weight}
                        <span className="text-muted-foreground/60 text-xl">
                          %
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: `${s.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-foreground/85 mr-2">
      <span className="size-1.5 rounded-full bg-foreground" />
      {children}
    </li>
  );
}
