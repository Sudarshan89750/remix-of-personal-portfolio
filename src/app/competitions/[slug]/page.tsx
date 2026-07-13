import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft, Clock, Award, Wallet, Hash, Layers, Gift, Banknote } from "lucide-react";
import { db } from "@/db";
import { competitions } from "@/db/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScoringSection } from "@/components/sections/scoring-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { RegistrationSection } from "@/components/sections/registration-section";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatINR, formatDeadline, formatPrizes, type PrizeItem } from "@/data/competitions";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const results = await db.select().from(competitions).where(eq(competitions.slug, slug)).limit(1);
    const comp = results[0];
    if (!comp) return {};
    return {
      title: comp.title,
      description: comp.subtitle,
    };
  } catch {
    return {};
  }
}

export default async function CompetitionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let competition = null;

  try {
    const results = await db.select().from(competitions).where(eq(competitions.slug, slug)).limit(1);
    competition = results[0] || null;
  } catch (error) {
    console.error("Database connection error on competition detail page:", error);
  }

  if (!competition) {
    notFound();
  }

  const imageSrc = competition.heroPosterUrl || "/hero-default.jpg";

  const prizeItems = (competition.prizes as PrizeItem[] | null) || []

  // Sidebar parameters
  const briefDetails = [
    { label: "Prize pool", value: formatPrizes(competition), icon: Award, accent: true },
    { label: "Entry fee", value: formatINR(competition.entryFeeINR), icon: Wallet },
    { label: "Deadline", value: formatDeadline(competition.deadline), icon: Clock },
    { label: "Hashtag", value: competition.hashtag, icon: Hash, mono: true },
    { label: "Platforms", value: (competition.platforms as string[] || []).join(", "), icon: Layers },
  ];

  // Schema JSON-LD for SEO rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": competition.title,
    "description": competition.subtitle,
    "startDate": competition.createdAt?.toISOString() || new Date().toISOString(),
    "endDate": new Date(competition.deadline).toISOString(),
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": competition.status === "open" ? "https://schema.org/EventScheduled" : "https://schema.org/EventMovedOnline",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://photogigs.in"
    },
    "offers": {
      "@type": "Offer",
      "price": competition.entryFeeINR,
      "priceCurrency": "INR",
      "url": `https://photogigs.in/competitions/${competition.slug}`
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header season={competition.season} />
      
      <main id="main-content" className="flex-1">
        {/* ============ BREADCRUMB / HERO ============ */}
        <section className="pt-24 border-b border-border" aria-label="Brief header details">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Back Button */}
            <div className="mb-6">
              <Button asChild variant="ghost" size="sm" className="group">
                <Link href="/competitions">
                  <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                  All Competitions
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 items-start">
              {/* Left Panel: Brief Title */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <span className="text-xs font-mono tracking-wider uppercase text-brand">
                  Season S0{competition.season} &bull; Competition Brief
                </span>
                
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                  {competition.title}. <br />
                  <span className="text-brand italic font-semibold">{competition.subtitle}</span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {competition.description}
                </p>

                {/* Subtitle Hashtag Badge */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-surface-alt text-foreground border border-border">
                    {competition.hashtag}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Mobile Photography Only
                  </span>
                </div>

                <div className="mt-4">
                  <Button asChild variant="brand" size="lg" className="shadow-lg shadow-brand/10">
                    <Link href="#register">
                      Register &bull; {formatINR(competition.entryFeeINR)}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Panel: Live Brief Summary */}
              <div className="lg:col-span-4 w-full">
                <div className="bg-surface border border-border rounded-3xl p-6 shadow-xl flex flex-col gap-5">
                  <h2 className="font-display font-bold text-lg tracking-tight border-b border-border/60 pb-3">
                    Live Brief Info
                  </h2>
                  <dl className="flex flex-col gap-4" aria-label="Competition detail parameters">
                    {briefDetails.map((detail) => {
                      const Icon = detail.icon;
                      return (
                        <div key={detail.label} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0">
                          <dt className="text-xs text-muted-foreground flex items-center gap-2">
                            <Icon className="size-4 text-muted-foreground/60" aria-hidden="true" />
                            {detail.label}
                          </dt>
                          <dd className={cn(
                            "text-sm font-bold text-right",
                            detail.accent ? "text-brand" : "text-foreground",
                            detail.mono && "font-mono text-xs"
                          )}>
                            {detail.value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full Width Hero Image */}
          <div className="relative w-full h-64 sm:h-96 md:h-[480px]">
            <Image
              src={imageSrc}
              alt={`Full-width hero showcase for ${competition.title}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Subtle Gradient Cover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </section>

        {/* ============ PRIZE SHOWCASE ============ */}
        {prizeItems.length > 0 && (
          <section className="border-b border-border py-16 md:py-20" aria-label="Prize breakdown">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex flex-col gap-3 mb-10 max-w-2xl">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand/70">Prizes</span>
                <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold font-display leading-tight tracking-tight">
                  What&apos;s <span className="text-brand italic font-semibold">on the line.</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {prizeItems.map((prize, idx) => (
                  <div key={idx} className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4 hover:border-brand/20 transition-colors group">
                    {prize.type === "gift" && prize.imageUrl ? (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800">
                        <Image src={prize.imageUrl} alt={prize.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-102 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] rounded-xl bg-brand/5 border border-border/60 flex items-center justify-center">
                        <Banknote className="size-10 text-brand/40" />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-display font-bold text-sm text-foreground truncate">{prize.label}</span>
                        {prize.type === "cash" && prize.amount && (
                          <span className="text-xs text-muted-foreground">{formatINR(prize.amount)}</span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider shrink-0 bg-zinc-800 text-zinc-400 border border-border/60">
                        {prize.type === "cash" ? <Banknote className="size-3" /> : <Gift className="size-3" />}
                        {prize.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ BRIEF SECTIONS ============ */}
        <HowItWorks steps={competition.steps} />
        <ScoringSection competition={competition} />
        <RegistrationSection competition={competition} />
      </main>

      <Footer season={competition.season} />
    </div>
  );
}


