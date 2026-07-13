"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatINR, formatDeadline, formatPrizes, type Competition, type CompetitionStatus } from "@/data/competitions";
import { cn } from "@/lib/utils";

function StatusDot({ status }: { status: CompetitionStatus }) {
  const configs: Record<CompetitionStatus, { label: string; dotClass: string; bgClass: string }> = {
    open: { label: "Open", dotClass: "bg-success", bgClass: "bg-success/10 text-success border-success/20" },
    upcoming: { label: "Soon", dotClass: "bg-amber-500", bgClass: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    judging: { label: "Scoring", dotClass: "bg-blue-500", bgClass: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    closed: { label: "Closed", dotClass: "bg-muted-foreground/40", bgClass: "bg-surface-alt text-muted-foreground border-border" },
  };

  const config = configs[status] || configs.closed;

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border uppercase tracking-wider", config.bgClass)}>
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

export function CompetitionRow({ competition, index }: { competition: Competition; index: number }) {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <Link
      href={`/competitions/${competition.slug}`}
      className="group block border-b border-border/80 hover:bg-surface-alt/25 transition-all duration-300 focus-visible:outline-none focus-visible:bg-surface-alt/40"
    >
      <div className="container mx-auto px-4 max-w-7xl py-6 sm:py-8 grid grid-cols-12 gap-4 items-center">
        {/* Index */}
        <div className="col-span-1 text-xs font-mono text-muted-foreground select-none">
          {formattedIndex}
        </div>
        
        {/* Title */}
        <div className="col-span-10 md:col-span-5 flex flex-col gap-1 pr-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Season S0{competition.season}
          </span>
          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all">
            {competition.title}
          </h3>
        </div>

        {/* Status */}
        <div className="col-span-11 md:col-span-2 pl-4 md:pl-0">
          <StatusDot status={competition.status as CompetitionStatus} />
        </div>

        {/* Prize (Hidden on small screens) */}
        <div className="hidden md:flex col-span-2 flex-col gap-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Prize Pool
          </span>
          <span className="font-display font-bold text-foreground">
            {formatPrizes(competition)}
          </span>
        </div>

        {/* Deadline (Hidden on small screens) */}
        <div className="hidden md:flex col-span-2 flex-col gap-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Deadline
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {formatDeadline(competition.deadline)}
          </span>
        </div>

        {/* Hover Arrow */}
        <div className="col-span-1 flex justify-end text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all duration-300">
          <ArrowUpRight className="size-5" />
        </div>
      </div>
    </Link>
  );
}
