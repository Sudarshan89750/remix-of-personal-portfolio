import { type competitions as competitionsTable } from "@/db/schema";

export type CompetitionStatus = 'upcoming' | 'open' | 'judging' | 'closed';

export type ScoringWeight = {
  label: string;
  weight: number; // percentage 0–100
  note?: string;
};

export type CompetitionStep = {
  title: string;
  description: string;
  bullets?: string[];
};

export type Competition = typeof competitionsTable.$inferSelect;

export const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export type PrizeItem = { label: string; type: "cash" | "gift"; amount?: number; imageUrl?: string };

export function formatPrizes(competition: Competition): string {
  const items = (competition.prizes as PrizeItem[] | null) || []
  if (items.length === 0) return formatINR(competition.prizeINR)
  return items.map((p) => p.label).join(" + ")
}

export const formatDeadline = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
