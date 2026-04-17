import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ScoringSection } from '@/components/sections/ScoringSection';
import { RegistrationSection } from '@/components/sections/RegistrationSection';
import {
  formatDeadline,
  formatINR,
  getCompetitionBySlug,
} from '@/data/competitions';

export default function CompetitionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const competition = slug ? getCompetitionBySlug(slug) : undefined;

  if (!competition) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-5xl">Competition not found.</h1>
          <p className="mt-3 text-muted-foreground">
            That brief doesn\u2019t exist (yet).
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/competitions">
              <ArrowLeft className="mr-1 size-4" /> All competitions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={competition.title} description={competition.subtitle} />
      <section className="pt-32 pb-16 px-6 lg:px-8 border-b border-border/60">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/competitions"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All competitions
          </Link>
          <div className="mt-8 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {competition.season}
              </p>
              <h1 className="font-display text-balance mt-3 text-6xl md:text-7xl leading-[0.95]">
                {competition.title}.{' '}
                <em className="italic text-muted-foreground">
                  {competition.subtitle}
                </em>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                {competition.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-6 h-12">
                  <Link to="/#register">
                    Register for {formatINR(competition.entryFeeINR)}
                    <ArrowUpRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <aside className="lg:col-span-4 rounded-3xl border border-border bg-card p-8">
              <dl className="space-y-6">
                <Row k="Prize" v={formatINR(competition.prizeINR)} big />
                <Row k="Entry" v={formatINR(competition.entryFeeINR)} />
                <Row k="Deadline" v={formatDeadline(competition.deadline)} />
                <Row k="Hashtag" v={competition.hashtag} mono />
                <Row k="Platforms" v={competition.platforms.join(' \u00b7 ')} />
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <HowItWorks competition={competition} />
      <ScoringSection competition={competition} />
      <RegistrationSection competition={competition} />
    </>
  );
}

function Row({
  k,
  v,
  big = false,
  mono = false,
}: {
  k: string;
  v: string;
  big?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border/70 pb-4 last:border-0 last:pb-0">
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {k}
      </dt>
      <dd
        className={[
          big ? 'font-display text-3xl' : 'text-base',
          mono ? 'font-mono text-sm' : '',
          'text-foreground tracking-tight',
        ].join(' ')}
      >
        {v}
      </dd>
    </div>
  );
}
