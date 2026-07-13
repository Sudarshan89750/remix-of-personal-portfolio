import React from "react";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { competitions } from "@/db/schema";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { CompetitionSection } from "@/components/sections/competition-section";
import { ScoringSection } from "@/components/sections/scoring-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyPhotoGigs } from "@/components/sections/why-photogigs";
import { RegistrationSection } from "@/components/sections/registration-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { brand } from "@/data/brand";

// Disable Next.js caching to fetch fresh DB data
export const revalidate = 0;

export default async function HomePage() {
  let competition = null;
  let dbError = false;

  try {
    const results = await db.select().from(competitions).orderBy(desc(competitions.id)).limit(1);
    competition = results[0] || null;
  } catch (error) {
    console.error("Database connection error on homepage:", error);
    dbError = true;
  }

  // Case 1: Database error
  if (dbError) {
    return (
      <div className="flex flex-col min-h-screen bg-background grain overflow-x-hidden">
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full bg-surface border border-border rounded-3xl p-8 shadow-xl text-center flex flex-col items-center gap-5">
            <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center" aria-hidden="true">
              <AlertCircle className="size-7" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-display font-extrabold text-xl tracking-tight text-foreground">
                Database Connection Error
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are currently experiencing issues connecting to our services. Please check back shortly or retry.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Try Again</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Case 2: No active competition (Between Seasons empty state)
  if (!competition) {
    return (
      <div className="flex flex-col min-h-screen bg-background grain overflow-x-hidden">
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="max-w-xl w-full text-center flex flex-col items-center gap-6">
            <div className="size-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center animate-breathe" aria-hidden="true">
              <Camera className="size-8" />
            </div>
            <span className="text-xs font-mono tracking-wider uppercase text-brand">
              Between Seasons
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
              The next frame <br />
              <span className="text-brand italic font-semibold">drops soon.</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              We are currently designing and curating the next wave of PhotoGigs challenges. Follow our official Instagram channel to get notified instantly when Season 02 drops.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-sm mt-2">
              <Button asChild variant="brand" className="w-full sm:w-fit px-8 gap-2">
                <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="size-4" />
                  Follow Instagram
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-fit px-8">
                <Link href="/competitions">Explore Archive</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Case 3: Live competition layout
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header season={competition.season} />
      <main id="main-content" className="flex-1">
        <HeroSection competition={competition} />
        <MarqueeStrip />
        <CompetitionSection competition={competition} />
        <HowItWorks steps={competition.steps} />
        <ScoringSection competition={competition} />
        <WhyPhotoGigs />
        <RegistrationSection competition={competition} />
        <FinalCTA competition={competition} />
      </main>
      <Footer season={competition.season} />
    </div>
  );
}
