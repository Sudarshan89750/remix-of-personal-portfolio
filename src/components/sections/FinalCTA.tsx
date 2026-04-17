import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatINR, type Competition } from '@/data/competitions';

interface Props {
  competition: Competition;
}

export function FinalCTA({ competition }: Props) {
  return (
    <section className="relative py-28 md:py-36 px-6 lg:px-8 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="relative max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-background/55">
            Ready to compete?
          </p>
          <h2 className="font-display text-balance mt-5 text-6xl md:text-7xl lg:text-8xl leading-[0.92]">
            Stop scrolling.
            <br />
            <em className="italic text-background/70">Start shooting.</em>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-background/75 leading-relaxed">
            {competition.season} is live. Spots are filling. The next great
            photographer in this country is one upload away from being noticed.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-7 h-12 text-base font-medium"
            >
              <Link to="/#register">
                Register for {formatINR(competition.entryFeeINR)}
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 text-base font-medium border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <Link to={`/competitions/${competition.slug}`}>
                View details
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
