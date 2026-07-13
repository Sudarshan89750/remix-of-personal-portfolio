"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Landmark, CreditCard, Tag } from "lucide-react";
import { formatINR, formatDeadline, formatPrizes, type Competition, type CompetitionStatus } from "@/data/competitions";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

function StatusDot({ status }: { status: CompetitionStatus }) {
  const configs: Record<CompetitionStatus, { label: string; dotClass: string; bgClass: string }> = {
    open: { label: "Open Brief", dotClass: "bg-success", bgClass: "bg-success/10 text-success border-success/20" },
    upcoming: { label: "Upcoming", dotClass: "bg-amber-500", bgClass: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    judging: { label: "Judging", dotClass: "bg-blue-500", bgClass: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    closed: { label: "Closed", dotClass: "bg-muted-foreground/40", bgClass: "bg-surface-alt text-muted-foreground border-border" },
  };

  const config = configs[status] || configs.closed;

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border uppercase tracking-wider", config.bgClass)}>
      {status === "open" && (
        <span className="size-1.5 rounded-full bg-success animate-breathe" aria-hidden="true" />
      )}
      {status !== "open" && (
        <span className={cn("size-1.5 rounded-full", config.dotClass)} aria-hidden="true" />
      )}
      {config.label}
    </span>
  );
}

export function FeaturedCompetitionCard({ competition }: { competition: Competition }) {
  const imageSrc = competition.heroPosterUrl || "/hero-default.jpg";

  const details = [
    { label: "Prize Pool", value: formatPrizes(competition), icon: Landmark, accent: true },
    { label: "Entry Fee", value: formatINR(competition.entryFeeINR), icon: CreditCard, accent: false },
    { label: "Deadline", value: formatDeadline(competition.deadline), icon: Calendar, accent: false },
    { label: "Hashtag", value: competition.hashtag, icon: Tag, accent: false, mono: true },
  ];

  return (
    <article className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-lg hover:border-brand/20 transition-colors duration-300 relative overflow-hidden group">
      {/* Background Radial Glow */}
      <div 
        className="absolute top-0 right-0 size-80 bg-brand/5 rounded-full blur-3xl -z-1 pointer-events-none group-hover:bg-brand/8 transition-colors duration-500" 
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Image */}
        <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-inner">
          <Image
            src={imageSrc}
            alt={`Banner for featured challenge: ${competition.title}`}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 360px"
            className="object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 z-10">
            <StatusDot status={competition.status as CompetitionStatus} />
          </div>
          <div className="absolute top-4 right-4 z-10 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-white border border-white/10 text-xs font-mono">
            S0{competition.season}
          </div>
        </div>

        {/* Right Side: Copy & Data grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-wider uppercase text-brand">
              Featured Competition
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground group-hover:text-brand transition-colors">
              {competition.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {competition.subtitle}. {competition.description}
            </p>
          </div>

          {/* 2x2 Data Grid with proper semantic <dl> */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-border/60 py-6" aria-label="Competition parameters">
            {details.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="bg-surface-alt/40 border border-border/50 rounded-2xl p-4 flex gap-3.5 items-start">
                  <div className="size-9 rounded-lg bg-background border border-border/80 flex items-center justify-center text-muted-foreground shrink-0" aria-hidden="true">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <dt className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
                      {detail.label}
                    </dt>
                    <dd className={cn(
                      "text-sm font-bold mt-0.5 leading-normal",
                      detail.accent ? "text-brand" : "text-foreground",
                      detail.mono && "font-mono text-xs"
                    )}>
                      {detail.value}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="brand" className="w-full sm:w-fit justify-between gap-2 shadow-lg shadow-brand/10">
              <Link href={`/competitions/${competition.slug}`}>
                Read Brief details
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-fit justify-center">
              <Link href="/#register">
                Register for {formatINR(competition.entryFeeINR)}
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </article>
  );
}
