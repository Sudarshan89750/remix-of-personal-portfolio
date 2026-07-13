"use client";

import React, { useState, useMemo } from "react";
import { Search, FolderOpen, RotateCcw } from "lucide-react";
import { type Competition, type CompetitionStatus } from "@/data/competitions";
import { CompetitionRow } from "./competition-row";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function CompetitionsArchive({ initialCompetitions }: { initialCompetitions: Competition[] }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | CompetitionStatus>("all");

  const filteredCompetitions = useMemo(() => {
    return initialCompetitions.filter((comp) => {
      const matchesSearch = 
        comp.title.toLowerCase().includes(search.toLowerCase()) ||
        comp.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        comp.hashtag.toLowerCase().includes(search.toLowerCase());

      const matchesTab = activeTab === "all" ? true : comp.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [initialCompetitions, search, activeTab]);

  const tabs: { label: string; value: "all" | CompetitionStatus }[] = [
    { label: "All Seasons", value: "all" },
    { label: "Open Briefs", value: "open" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Judging", value: "judging" },
    { label: "Closed", value: "closed" },
  ];

  return (
    <section className="py-16" aria-label="Competitions index archive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8 pb-4 border-b border-border/60">
          <div>
            <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
              The Archive
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-1 leading-none">
              Past, present, <span className="text-brand italic font-semibold">pending.</span>
            </h2>
          </div>
          
          <div className="text-xs font-mono tracking-wider uppercase text-muted-foreground select-none">
            {String(filteredCompetitions.length).padStart(2, "0")} Entries Listed
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto" role="tablist" aria-label="Filter competitions by status">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer select-none",
                    isActive 
                      ? "bg-brand border-brand text-brand-foreground shadow-md shadow-brand/10" 
                      : "bg-surface-alt/40 border-border text-muted-foreground hover:bg-surface-alt/60 hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:max-w-xs flex flex-col">
            <label htmlFor="search" className="sr-only">Search competitions</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" aria-hidden="true" />
              <Input
                id="search"
                type="text"
                placeholder="Search index..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 text-xs"
              />
            </div>
          </div>
        </div>

        {/* List Grid */}
        {filteredCompetitions.length > 0 ? (
          <ul className="border-t border-border flex flex-col">
            {filteredCompetitions.map((c, i) => (
              <li key={c.id}>
                <CompetitionRow competition={c} index={i + 1} />
              </li>
            ))}
          </ul>
        ) : (
          /* Empty State */
          <div className="py-20 border border-dashed border-border rounded-3xl text-center flex flex-col items-center gap-4">
            <div className="size-12 rounded-2xl bg-surface-alt border border-border flex items-center justify-center text-muted-foreground" aria-hidden="true">
              <FolderOpen className="size-6" />
            </div>
            <div className="flex flex-col gap-1 max-w-sm">
              <h3 className="font-display font-bold text-lg text-foreground">
                No entries match filters
              </h3>
              <p className="text-xs text-muted-foreground leading-normal">
                We couldn&apos;t find any competitions matching your search or tab filter. Try resetting them to view the catalog.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { setSearch(""); setActiveTab("all"); }}
              className="gap-1.5"
            >
              <RotateCcw className="size-3.5" />
              Reset Filters
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
