"use client";

import React from "react";
import { type Competition } from "@/data/competitions";
import { ScrollReveal } from "../ui/scroll-reveal";

export function HowItWorks({ steps }: { steps: Competition["steps"] }) {
  const stepItems = (steps as { title: string; description: string; bullets?: string[] }[]) || [];

  return (
    <section 
      id="how-it-works" 
      className="py-20 md:py-24 bg-background border-b border-border relative"
      aria-label="Process steps overview"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-3 mb-12 md:mb-16 max-w-2xl">
          <ScrollReveal>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand/70">
              Process
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold font-display leading-tight tracking-tight max-w-xl">
              Four steps. <span className="text-brand italic font-semibold">No gatekeepers.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="relative">
          {/* Desktop timeline line */}
          <div className="hidden md:block absolute left-[23px] top-8 bottom-8 w-px bg-border" aria-hidden="true" />

          <ol className="flex flex-col gap-6 md:gap-0">
            {stepItems.map((step, idx) => {
              return (
                <li key={step.title || idx} className="relative md:grid md:grid-cols-12 md:gap-8 md:py-8">
                  {/* Timeline dot — desktop only */}
                  <div className="hidden md:flex md:col-span-5 md:items-start md:pt-2 md:justify-end">
                    <ScrollReveal delay={0.05 * idx} className="flex items-center gap-4">
                      <span 
                        className="relative z-10 size-[46px] rounded-full bg-surface border-2 border-brand flex items-center justify-center font-display font-bold text-base text-brand shrink-0"
                        aria-hidden="true"
                      >
                        {idx + 1}
                      </span>
                      <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                        Step {idx + 1}
                      </span>
                    </ScrollReveal>
                  </div>

                  {/* Content card */}
                  <div className="md:col-span-7">
                    <ScrollReveal 
                      delay={0.05 * idx}
                      className="relative bg-surface border border-border rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Mobile step header */}
                      <div className="flex md:hidden items-center gap-3 mb-3">
                        <span className="size-7 rounded-full bg-brand/10 flex items-center justify-center font-display font-bold text-xs text-brand">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                          Step {idx + 1} of {stepItems.length}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base md:text-xl text-foreground mb-1.5 md:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>

                      {step.bullets && step.bullets.length > 0 && (
                        <ul className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/50 flex flex-col gap-1.5 md:gap-2 text-[13px] md:text-sm text-muted-foreground">
                          {step.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <span className="mt-1.5 size-1.5 rounded-full bg-brand/50 shrink-0" aria-hidden="true" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </ScrollReveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
