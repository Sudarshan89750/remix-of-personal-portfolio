import { ComingSoon } from '@/components/sections/ComingSoon';

export default function Dashboard() {
  return (
    <ComingSoon
      kicker="Dashboard"
      title="Your competitions, gigs and gear in one place"
      description="Sign in to see your live entries, leaderboard rank, job applications, gear listings and earnings \u2014 all in one calm, no-noise dashboard."
      bullets={['Live leaderboard', 'Job pipeline', 'Earnings & payouts', 'Profile manager']}
    />
  );
}
