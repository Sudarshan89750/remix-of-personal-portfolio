"use client";

import React from "react";
import { Eye, Heart, Share2, MessageCircle, BarChart3, type LucideIcon } from "lucide-react";
import { type Competition } from "@/data/competitions";
import { ScrollReveal } from "../ui/scroll-reveal";

const iconMap: Record<string, LucideIcon> = {
  views: Eye,
  likes: Heart,
  like: Heart,
  shares: Share2,
  share: Share2,
  comments: MessageCircle,
  comment: MessageCircle,
  valuation: BarChart3,
};

export function ScoringSection({ competition }: { competition: Competition }) {
  const scoringCriteria = (competition.scoring as { name: string; weight: number; description: string }[]) || [];

  return (
    <section 
      id="scoring" 
      className="py-20 md:py-24 bg-surface-alt/10 border-b border-border"
      aria-label="Public Scoring System"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Mobile: stacked. md+: side-by-side */}
        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12 lg:gap-16 md:items-center gap-10 md:gap-0">
          
          {/* Left */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            <ScrollReveal>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand/70">
                Scoring system
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold font-display leading-tight tracking-tight max-w-lg">
                The scoreboard is <span className="text-brand italic font-semibold">public.</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed">
                No anonymous jury. No subjective opinions. Every entry is scored by a transparent, weighted blend of real platform metrics, pulled directly from the Instagram API and published live on our leaderboard.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="flex flex-wrap gap-2">
              {["API-based", "Updated live", "Public leaderboard", "Zero bias"].map((pill) => (
                <span 
                  key={pill}
                  className="px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono bg-surface border border-border text-muted-foreground font-medium"
                >
                  {pill}
                </span>
              ))}
            </ScrollReveal>
          </div>

          {/* Right */}
          <div className="md:col-span-7 w-full">
            <ScrollReveal delay={0.15}>
              <div className="bg-surface border border-border rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 md:pb-4 border-b border-border/50">
                  <h3 className="font-display font-bold text-base md:text-lg tracking-tight">
                    Weighting Formula
                  </h3>
                  <span className="text-[9px] md:text-[10px] font-mono text-brand/70 font-semibold uppercase tracking-widest">
                    100% transparent
                  </span>
                </div>
                
                <div className="flex flex-col gap-5 md:gap-6">
                  {scoringCriteria.map((criterion, idx) => {
                    const weight = criterion.weight;
                    const IconComponent = iconMap[criterion.name?.toLowerCase()] || null;
                    return (
                      <div key={criterion.name || idx} className="flex flex-col gap-1.5 md:gap-2">
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex items-center gap-2">
                            {IconComponent && (
                              <IconComponent className="size-3.5 md:size-4 text-brand/60 shrink-0" aria-hidden="true" />
                            )}
                            <span className="text-[13px] md:text-sm font-bold text-foreground">
                              {criterion.name}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm font-mono font-bold text-brand">
                            {weight}%
                          </span>
                        </div>
                        
                        <div 
                          className="w-full h-1 md:h-1.5 bg-surface-alt rounded-full overflow-hidden"
                          role="progressbar"
                          aria-valuenow={weight}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${criterion.name} weightage: ${weight}%`}
                        >
                          <div 
                            className="h-full bg-brand/80 rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${weight}%` }}
                          />
                        </div>
                        
                        <p className="text-[12px] md:text-xs text-muted-foreground leading-relaxed">
                          {criterion.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
