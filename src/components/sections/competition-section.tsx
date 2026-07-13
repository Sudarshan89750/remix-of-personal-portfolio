"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatINR, formatDeadline, type Competition } from "@/data/competitions";
import { Button } from "../ui/button";
import { ScrollReveal } from "../ui/scroll-reveal";

export function CompetitionSection({ competition }: { competition: Competition }) {
  const stats = [
    { label: "Theme", value: competition.subtitle, accent: false },
    { label: "Deadline", value: formatDeadline(competition.deadline), accent: false },
    { label: "Prize pool", value: formatINR(competition.prizeINR), accent: true },
    { label: "Entry fee", value: formatINR(competition.entryFeeINR), accent: false },
  ];

  return (
    <section 
      id="competition" 
      className="py-20 md:py-24 bg-surface-alt/10 border-b border-border"
      aria-label="Competition Brief"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Mobile: stacked. md+: side-by-side */}
        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12 lg:gap-16 md:items-start gap-10 md:gap-0">
          
          {/* Left */}
          <div className="md:col-span-7 flex flex-col gap-4 md:gap-6">
            <ScrollReveal>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand/70">
                Vol. 0{competition.season} — Brief
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold font-display leading-tight tracking-tight">
                {competition.title}. <br />
                <span className="text-brand italic font-semibold">{competition.subtitle}</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed">
                {competition.description} Post your visual story on Instagram Reels using{" "}
                <span className="font-mono text-foreground font-semibold px-1.5 py-0.5 rounded bg-surface-alt border border-border text-[13px]">
                  {competition.hashtag}
                </span>
                . The entry with the highest authentic engagement — verified by our public API — takes home the grand prize.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="flex flex-wrap gap-3 mt-1">
              <Button asChild variant="brand" size="lg" className="w-full sm:w-fit">
                <Link href="/#register">
                  Register for {formatINR(competition.entryFeeINR)}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-fit">
                <Link href="/#how-it-works">
                  How it works
                </Link>
              </Button>
            </ScrollReveal>
          </div>

          {/* Right */}
          <div className="md:col-span-5 w-full">
            <ScrollReveal delay={0.15} className="w-full">
              <div className="w-full bg-surface border border-border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <h3 className="font-display font-bold text-base md:text-lg tracking-tight">
                    Live Brief
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-mono tracking-widest uppercase bg-brand/10 text-brand font-semibold border border-brand/20">
                    <span className="size-1.5 bg-brand rounded-full animate-breathe" />
                    Active
                  </span>
                </div>
                
                <dl className="flex flex-col gap-4 md:gap-5" aria-label="Competition core metrics">
                  {stats.map((stat) => (
                    <div 
                      key={stat.label} 
                      className="flex flex-col gap-1 pb-4 md:pb-5 border-b border-border/50 last:border-0 last:pb-0"
                    >
                      <dt className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-muted-foreground">
                        {stat.label}
                      </dt>
                      <dd 
                        className={cn(
                          "text-base md:text-lg font-bold font-display tracking-tight",
                          stat.accent ? "text-brand" : "text-foreground"
                        )}
                      >
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
