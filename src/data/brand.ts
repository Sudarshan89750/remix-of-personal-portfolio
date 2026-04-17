/**
 * PhotoGigs brand & platform info
 * Single source of truth — swap to API later without touching components.
 */

export const brand = {
  name: 'PhotoGigs',
  tagline: 'Compete. Create. Win.',
  shortDescription:
    'India\u2019s first engagement-based photography competition platform.',
  longDescription:
    'A platform for photographers to compete, find work, hire crew, sell or rent gear, and grow a real career behind the lens.',
  mission:
    'We believe talent shouldn\u2019t wait for permission. PhotoGigs turns the camera roll into a livelihood \u2014 through transparent competitions, real jobs, and a marketplace built by photographers, for photographers.',
  founded: 2025,
  email: 'hello@photogigs.in',
  whatsapp: '+91 00000 00000',
  social: {
    instagram: 'https://instagram.com/photogigs',
  },
  hashtag: '#PhotoGigsChallenge',
} as const;

export const platformPillars = [
  {
    title: 'Competitions',
    blurb:
      'Seasonal challenges scored by real engagement \u2014 not opinion.',
    href: '/competitions',
    available: true,
  },
  {
    title: 'Jobs',
    blurb:
      'Find shoots, post gigs, get paid on time. Built around photographers, not generic freelance noise.',
    href: '/jobs',
    available: false,
  },
  {
    title: 'Marketplace',
    blurb:
      'Buy or rent gear from verified photographers near you. Lenses, lights, drones, studios.',
    href: '/marketplace',
    available: false,
  },
  {
    title: 'Network',
    blurb:
      'Showcase your work, message clients, find collaborators by city on the live map.',
    href: '/network',
    available: false,
  },
] as const;
