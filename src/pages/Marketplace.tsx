import { ComingSoon } from '@/components/sections/ComingSoon';

export default function Marketplace() {
  return (
    <ComingSoon
      kicker="Marketplace"
      title="Buy or rent gear from photographers near you"
      description="A peer-to-peer marketplace for lenses, lights, drones, studios and everything in between \u2014 priced by people who actually use them."
      bullets={['Buy / rent / sell', 'Verified sellers', 'Insurance options', 'City-wise listings']}
    />
  );
}
