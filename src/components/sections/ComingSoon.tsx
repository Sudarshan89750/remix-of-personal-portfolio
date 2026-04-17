import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';

interface Props {
  title: string;
  kicker: string;
  description: string;
  bullets?: string[];
}

export function ComingSoon({ title, kicker, description, bullets }: Props) {
  return (
    <>
      <SEOHead title={`${title} \u00b7 Coming soon`} description={description} />
      <section className="min-h-[80vh] grid place-items-center px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {kicker}
          </p>
          <h1 className="font-display text-balance mt-4 text-6xl md:text-7xl leading-[0.95]">
            {title}.{' '}
            <em className="italic text-muted-foreground">Almost ready.</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
          {bullets && (
            <ul className="mt-8 inline-flex flex-wrap justify-center gap-2 text-sm">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground/85"
                >
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10">
            <Button asChild size="lg" className="rounded-full px-6 h-12">
              <Link to="/">
                <ArrowLeft className="mr-1 size-4" /> Back to season 01
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
