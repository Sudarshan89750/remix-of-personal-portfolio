import { SEOHead } from '@/components/seo/SEOHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeStrip } from '@/components/sections/MarqueeStrip';
import { CompetitionSection } from '@/components/sections/CompetitionSection';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ScoringSection } from '@/components/sections/ScoringSection';
import { WhyPhotoGigs } from '@/components/sections/WhyPhotoGigs';
import { RegistrationSection } from '@/components/sections/RegistrationSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { getActiveCompetition } from '@/data/competitions';

export default function Home() {
  const competition = getActiveCompetition();

  if (!competition) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-5xl">Between seasons.</h1>
          <p className="mt-3 text-muted-foreground">
            The next PhotoGigs season drops soon. Check back shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Compete. Create. Win."
        description={`India's first engagement-based photography competition. ${competition.season} is live with a prize pool worth lakhs.`}
      />
      <HeroSection competition={competition} />
      <MarqueeStrip />
      <CompetitionSection competition={competition} />
      <HowItWorks competition={competition} />
      <ScoringSection competition={competition} />
      <WhyPhotoGigs />
      <RegistrationSection competition={competition} />
      <FinalCTA competition={competition} />
    </>
  );
}
