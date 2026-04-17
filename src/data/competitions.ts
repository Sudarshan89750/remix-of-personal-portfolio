/**
 * Competitions data layer
 * Typed records so adding a new season is a one-line change.
 * Replace `competitions` with a Postgres/Supabase fetch later \u2014
 * keep the same shape and components keep working.
 */

export type CompetitionStatus = 'upcoming' | 'open' | 'judging' | 'closed';

export type ScoringWeight = {
  label: string;
  weight: number; // percentage 0\u2013100
  note?: string;
};

export type CompetitionStep = {
  title: string;
  description: string;
  bullets?: string[];
};

export type Competition = {
  id: string;
  slug: string;
  season: string;
  title: string;
  subtitle: string;
  description: string;
  status: CompetitionStatus;
  prizeINR: number;
  entryFeeINR: number;
  currency: 'INR';
  deadline: string; // ISO date
  hashtag: string;
  platforms: string[];
  scoring: ScoringWeight[];
  steps: CompetitionStep[];
  featured?: boolean;
};

export const competitions: Competition[] = [
  {
    id: 'frame-the-unseen',
    slug: 'frame-the-unseen',
    season: 'Season 01',
    title: 'Frame the Unseen',
    subtitle: 'Capture the everyday India most people walk past.',
    description:
      'A single short-form video. One honest frame of the country you live in. The internet decides who walks away with the prize.',
    status: 'open',
    prizeINR: 50000,
    entryFeeINR: 199,
    currency: 'INR',
    deadline: '2025-07-15',
    hashtag: '#PhotoGigsChallenge',
    platforms: ['Instagram Reels', 'YouTube Shorts'],
    scoring: [
      { label: 'Views & Reach', weight: 30, note: 'How far it travelled' },
      { label: 'Likes', weight: 25, note: 'Quiet approval counts' },
      { label: 'Comments', weight: 25, note: 'Did it start a conversation?' },
      { label: 'Shares', weight: 20, note: 'The truest signal' },
    ],
    steps: [
      {
        title: 'Register & pay',
        description:
          'Fill the form, pay the entry fee, get your participant ID by email.',
        bullets: ['Quick form', 'Secure UPI / card', 'Instant participant ID'],
      },
      {
        title: 'Create your video',
        description:
          'Make a short, photography-led video \u2014 behind the scenes, a timelapse, or a single photo story.',
        bullets: [
          'Behind the scenes',
          'Timelapse',
          'Photo story',
          'Use #PhotoGigsChallenge',
        ],
      },
      {
        title: 'Submit your link',
        description:
          'Paste your Reel or Short link in your dashboard. Our API tracks engagement from the moment it goes live.',
      },
      {
        title: 'Win',
        description:
          'Highest engagement score wins. No judges, no politics. Prize is wired within 7 days.',
      },
    ],
    featured: true,
  },
  {
    id: 'monsoon-monochrome',
    slug: 'monsoon-monochrome',
    season: 'Season 02',
    title: 'Monsoon, in Monochrome',
    subtitle: 'The rains, stripped of colour. Just light, water and patience.',
    description:
      'A black-and-white short on the Indian monsoon. Streets, skin, glass, fabric — anything the rain touches.',
    status: 'upcoming',
    prizeINR: 75000,
    entryFeeINR: 249,
    currency: 'INR',
    deadline: '2025-09-10',
    hashtag: '#MonsoonMonochrome',
    platforms: ['Instagram Reels', 'YouTube Shorts'],
    scoring: [
      { label: 'Views & Reach', weight: 30 },
      { label: 'Likes', weight: 25 },
      { label: 'Comments', weight: 25 },
      { label: 'Shares', weight: 20 },
    ],
    steps: [],
  },
  {
    id: 'golden-hour-streets',
    slug: 'golden-hour-streets',
    season: 'Season 03',
    title: 'Golden Hour, Loud Streets',
    subtitle: 'Forty-five minutes of light. A whole city to chase it through.',
    description:
      'Street photography in the last hour before sunset. Show us a place the way only you saw it that evening.',
    status: 'upcoming',
    prizeINR: 100000,
    entryFeeINR: 299,
    currency: 'INR',
    deadline: '2025-11-20',
    hashtag: '#GoldenHourGigs',
    platforms: ['Instagram Reels', 'YouTube Shorts'],
    scoring: [
      { label: 'Views & Reach', weight: 30 },
      { label: 'Likes', weight: 25 },
      { label: 'Comments', weight: 25 },
      { label: 'Shares', weight: 20 },
    ],
    steps: [],
  },
  {
    id: 'first-light-pilot',
    slug: 'first-light-pilot',
    season: 'Pilot',
    title: 'First Light',
    subtitle: 'The quiet pilot that started it all.',
    description:
      'Our pilot season — small prize, big lessons. The shortlist still gets quoted in the community.',
    status: 'closed',
    prizeINR: 25000,
    entryFeeINR: 99,
    currency: 'INR',
    deadline: '2025-03-01',
    hashtag: '#FirstLightGigs',
    platforms: ['Instagram Reels'],
    scoring: [
      { label: 'Views & Reach', weight: 30 },
      { label: 'Likes', weight: 25 },
      { label: 'Comments', weight: 25 },
      { label: 'Shares', weight: 20 },
    ],
    steps: [],
  },
];

export const getActiveCompetition = (): Competition | undefined =>
  competitions.find((c) => c.status === 'open' && c.featured) ??
  competitions.find((c) => c.status === 'open');

export const getCompetitionBySlug = (slug: string): Competition | undefined =>
  competitions.find((c) => c.slug === slug);

export const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDeadline = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
