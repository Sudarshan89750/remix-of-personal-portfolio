"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Hourglass } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollReveal } from "../ui/scroll-reveal";

export function ComingSoon({
  title,
  kicker,
  description,
  bullets,
}: {
  title: string;
  kicker: string;
  description: string;
  bullets?: string[];
}) {
  return (
    <section 
      className="min-h-[85dvh] flex items-center justify-center py-20 bg-background grain"
      aria-label="Features coming soon information"
    >
      <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
        <div className="flex flex-col items-center gap-6">
          <ScrollReveal>
            <div className="size-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center animate-breathe" aria-hidden="true">
              <Hourglass className="size-8" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="text-xs font-mono tracking-wider uppercase text-brand">
              {kicker}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
              {title}. <br />
              <span className="text-brand italic font-semibold">Almost ready.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </ScrollReveal>

          {bullets && bullets.length > 0 && (
            <ScrollReveal delay={0.25} className="flex flex-wrap items-center justify-center gap-2 max-w-md mt-2">
              {bullets.map((bullet) => (
                <span 
                  key={bullet}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-surface border border-border text-foreground/80 font-medium"
                >
                  {bullet}
                </span>
              ))}
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.3} className="mt-4">
            <Button asChild variant="outline" size="lg" className="gap-2 group">
              <Link href="/">
                <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Season 01
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
