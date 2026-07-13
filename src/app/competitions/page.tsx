import React from "react";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { competitions } from "@/db/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Metric } from "@/components/ui/Metric";
import { FeaturedCompetitionCard } from "@/components/sections/featured-card";
import { CompetitionsArchive } from "@/components/sections/competitions-archive";
import { formatINR, type Competition } from "@/data/competitions";

export const revalidate = 0;

export default async function CompetitionsPage() {
  let allCompetitions: Competition[] = [];

  try {
    allCompetitions = await db.select().from(competitions).orderBy(desc(competitions.id));
  } catch (error) {
    console.error("Database connection error on competitions page:", error);
  }

  const featured = allCompetitions.find((c) => c.featured) || allCompetitions[0] || null;
  const rest = featured ? allCompetitions.filter((c) => c.id !== featured.id) : allCompetitions;

  const totalPrizePool = allCompetitions.reduce((sum, c) => sum + c.prizeINR, 0);
  const openCount = allCompetitions.filter((c) => c.status === "open").length;
  const upcomingCount = allCompetitions.filter((c) => c.status === "upcoming").length;

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header season={featured?.season} />
      
      <main id="main-content" className="flex-1">
        {/* ============ EDITORIAL HEADER ============ */}
        <section 
          className="relative overflow-hidden border-b border-border"
          aria-label="Editorial index header"
        >
          {/* Subtle grid background pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:90px_90px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pb-20">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Vol. 01 &bull; The Index
                  </span>
                  <span className="h-px w-10 bg-border" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {allCompetitions.length} Season{allCompetitions.length === 1 ? "" : "s"}
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                  Every season, <br />
                  <span className="text-brand italic font-semibold">on the record.</span>
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Open briefs, the challenges we are curating next, and the archive of past winners. Public scoring, public verification.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="lg:col-span-4 grid grid-cols-3 gap-4 w-full">
                <Metric label="Total prizes" value={formatINR(totalPrizePool)} accent />
                <Metric label="Live now" value={String(openCount).padStart(2, "0")} />
                <Metric label="Upcoming" value={String(upcomingCount).padStart(2, "0")} />
              </div>
            </div>
          </div>
        </section>

        {/* ============ FEATURED CHALLENGE ============ */}
        {featured && (
          <section className="border-b border-border/60" aria-label="Featured Season Highlight">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <FeaturedCompetitionCard competition={featured} />
            </div>
          </section>
        )}

        {/* ============ ARCHIVE LIST ============ */}
        <CompetitionsArchive initialCompetitions={rest} />
      </main>

      <Footer season={featured?.season} />
    </div>
  );
}
