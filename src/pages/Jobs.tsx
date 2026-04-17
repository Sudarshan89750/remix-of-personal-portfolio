import { ComingSoon } from '@/components/sections/ComingSoon';

export default function Jobs() {
  return (
    <ComingSoon
      kicker="Jobs"
      title="A real job board for photographers"
      description="Post a shoot, find a photographer, or get hired. No bidding wars, no race-to-the-bottom pricing \u2014 transparent rates, milestone-based payouts and a profile that finally shows your work."
      bullets={['Verified clients', 'Escrow payouts', 'Map-based search', 'In-app chat']}
    />
  );
}
