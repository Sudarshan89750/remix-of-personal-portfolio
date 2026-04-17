import { ComingSoon } from '@/components/sections/ComingSoon';

export default function Network() {
  return (
    <ComingSoon
      kicker="Network"
      title="Showcase, message, collaborate"
      description="A photographer-first network. Pin your best frames, message clients directly, and find collaborators by city on the live map."
      bullets={['Public profiles', 'Direct messages', 'Map of photographers', 'Collab requests']}
    />
  );
}
