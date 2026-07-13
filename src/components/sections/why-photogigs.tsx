"use client";

import React from "react";
import { ShieldCheck, CircleDollarSign, Share2, Smartphone, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "../ui/scroll-reveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "No judges. No politics.",
    description: "Audience engagement is the sole metric. The scoreboard is public and API-verified.",
    desktop: "col-span-2" as const,
  },
  {
    icon: CircleDollarSign,
    title: "Cash. Wired in 7 days.",
    description: "No coupons or prizes that never arrive. Hard cash via bank transfer within a week.",
    desktop: "col-span-1 row-span-2" as const,
  },
  {
    icon: Share2,
    title: "You keep the growth.",
    description: "Entries live on your personal Instagram Reels. Win or lose, you build your own audience.",
    desktop: "col-span-1" as const,
  },
  {
    icon: Smartphone,
    title: "Mobile-first. Gear-free.",
    description: "Designed for phone cameras. No expensive equipment needed — just your phone and an eye.",
    desktop: "col-span-1" as const,
  },
  {
    icon: Users,
    title: "Beyond the contest.",
    description: "Job briefs, crew hiring, gear rental, and a photographer network are rolling out next.",
    desktop: "col-span-2" as const,
  },
];

export function WhyPhotoGigs() {
  return (
    <section 
      id="why" 
      className="py-20 md:py-24 bg-surface-alt/10 border-b border-border"
      aria-label="Features and values"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col gap-3 mb-12 md:mb-16 max-w-2xl">
          <ScrollReveal>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand/70">
              Why PhotoGigs
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold font-display leading-tight tracking-tight max-w-xl">
              The competition <span className="text-brand italic font-semibold">photographers</span> wish existed.
            </h2>
          </ScrollReveal>
        </div>

        {/* Mobile: single column stack. md+: bento grid */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:auto-rows-[1fr] md:gap-5">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;

            return (
              <ScrollReveal
                key={reason.title}
                delay={0.05 * idx}
                className={cn(
                  "bg-surface border border-border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 md:gap-4",
                  reason.desktop
                )}
              >
                <div className="size-9 md:size-10 rounded-xl bg-brand/8 text-brand flex items-center justify-center" aria-hidden="true">
                  <Icon className="size-[18px] md:size-5" />
                </div>
                
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <h3 className="font-display font-bold text-[15px] md:text-lg text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
