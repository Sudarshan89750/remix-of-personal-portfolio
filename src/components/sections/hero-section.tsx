"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/button";
import { formatINR, formatDeadline, type Competition } from "@/data/competitions";

export function HeroSection({ competition }: { competition: Competition }) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const imageSrc = competition.heroPosterUrl || "/hero-default.jpg";

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, transform: shouldReduceMotion ? "none" : "translateY(20px)" },
    visible: {
      opacity: 1, transform: "translateY(0)",
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 md:pt-28 md:pb-20 grain bg-background overflow-hidden"
      aria-label="Welcome section and current competition highlight"
    >
      <div className="container mx-auto px-4 max-w-7xl relative z-10 w-full">
        {/* Mobile-first: stacks single column, becomes grid on md+ */}
        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-16 lg:gap-20 gap-10 md:items-center">
          
          {/* Left: Copy — appears first on mobile */}
          <motion.div
            variants={containerVariants}
            initial={mounted ? "hidden" : "visible"}
            animate={mounted ? "visible" : "visible"}
            className="md:col-span-6 flex flex-col gap-4 md:gap-5 order-1"
          >
            <motion.div variants={itemVariants} className="w-fit">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-brand/8 text-brand border border-brand/15">
                <span className="size-1.5 rounded-full bg-brand animate-breathe" aria-hidden="true" />
                S{competition.season} — Open
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="text-[clamp(2.2rem,6vw,5rem)] font-extrabold font-display leading-[1.05] tracking-tight max-w-3xl"
            >
              Your lens. <span className="text-brand">Your stage.</span> Your win.
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-[15px] sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              India&apos;s first engagement-based photography competition. No judging panels. No backroom decisions. Post a video, let the internet vote with its attention, and take home <span className="font-semibold text-foreground">{formatINR(competition.prizeINR)}</span>.
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2"
            >
              <Button asChild variant="brand" size="lg" className="w-full sm:w-fit justify-between gap-2 shadow-lg shadow-brand/8">
                <Link href="/#register">
                  Register — {formatINR(competition.entryFeeINR)}
                  <ArrowRight className="size-4 hover-only:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-fit">
                <Link href={`/competitions/${competition.slug}`}>
                  View brief
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Image — full-width on mobile, framed on desktop */}
            <motion.div
            initial={mounted ? { opacity: 0, transform: shouldReduceMotion ? "none" : "translateY(24px)" } : { opacity: 1, transform: "none" }}
            animate={mounted ? { opacity: 1, transform: "none" } : { opacity: 1, transform: "none" }}
            transition={{ duration: 0.25, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:col-span-6 relative order-2"
          >
            <div className="relative w-full max-w-[480px] mx-auto md:mx-0 md:ml-auto">
              {/* Mobile: no frame, just clean image. Desktop: gallery matte */}
              <div className="relative md:bg-surface md:p-3 md:p-4 md:rounded-2xl md:shadow-2xl md:border md:border-border/80">
                <div className="relative aspect-[4/5] md:rounded-xl overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={`Gallery visual for ${competition.title}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-white/50 mb-0.5">
                      Mobile photography competition
                    </p>
                    <p className="text-sm md:text-base font-bold font-display tracking-tight">
                      {competition.title}
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      Deadline {formatDeadline(competition.deadline)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prize callout */}
              <div
                className="absolute -bottom-3 right-0 md:-right-3 bg-surface border border-border rounded-xl px-4 py-2.5 md:px-5 md:py-3 shadow-lg flex items-center gap-2 md:gap-3"
              >
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                  Prize
                </span>
                <span className="text-lg md:text-xl font-bold font-display tracking-tight text-brand">
                  {formatINR(competition.prizeINR)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
