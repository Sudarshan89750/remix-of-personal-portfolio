export const brand = {
  name: "PhotoGigs",
  tagline: "Compete. Create. Win.",
  shortDescription: "India's first engagement-based photography competition platform.",
  longDescription: "A platform for photographers to compete, find work, hire crew, sell or rent gear, and grow a real career behind the lens.",
  mission: "We believe talent shouldn't wait for permission. PhotoGigs turns the camera roll into a livelihood — through transparent competitions, real jobs, and a marketplace built by photographers, for photographers.",
  founded: 2025,
  email: "hello@photogigs.in",
  whatsapp: "+91 00000 00000",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/photogigs.in",
    hashtag: "#PhotoGigsChallenge",
  },
  legal: {
    terms: "/legal/terms",
    privacy: "/legal/privacy",
  },
  platformPillars: [
    { name: "Competitions", description: "Seasonal challenges scored by real engagement — not opinion.", href: "/competitions", available: true },
    { name: "Jobs", description: "Find shoots, post gigs, get paid on time.", href: "/jobs", available: false },
    { name: "Marketplace", description: "Buy or rent gear from verified photographers near you.", href: "/marketplace", available: false },
    { name: "Network", description: "Showcase your work, message clients, find collaborators by city.", href: "/network", available: false },
  ]
};
