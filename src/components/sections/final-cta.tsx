"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { Button } from "../ui/button";
import { ScrollReveal } from "../ui/scroll-reveal";
import { brand } from "@/data/brand";
import { formatINR, type Competition } from "@/data/competitions";

export function FinalCTA({ competition }: { competition: Competition }) {
  return (
    <section 
      className="relative py-28 md:py-32 bg-foreground text-background grain overflow-hidden"
      aria-label="Call to action summary"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" aria-hidden="true" />
      
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand/50">
              Vol. 0{competition.season}
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold font-display leading-[1.1] tracking-tight">
              Stop scrolling. <br />
              <span className="text-brand italic font-semibold">Start shooting.</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <p className="text-[15px] md:text-lg text-background/70 max-w-lg mx-auto leading-relaxed">
              The next great mobile photographer in this country is one upload away from being discovered. That could be you.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-2">
            <Button asChild variant="brand" size="lg" className="w-full sm:w-fit justify-center shadow-xl shadow-brand/10">
              <Link href="/#register">
                Register — {formatINR(competition.entryFeeINR)}
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full sm:w-fit justify-center border-background/20 text-background hover:bg-background/10 hover:text-background">
              <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="size-4 mr-2" />
                Follow Instagram
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
