import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Competition } from '@/data/competitions';

interface Props {
  competition: Competition;
}

export function HowItWorks({ competition }: Props) {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              How it works
            </p>
            <h2 className="font-display text-balance mt-3 text-5xl md:text-6xl leading-[0.95]">
              Four steps. <em className="italic text-muted-foreground">No gatekeepers.</em>
            </h2>
            <p className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              We stripped competitions down to what photographers actually want:
              clear rules, a public scoreboard, and money in the bank within a week.
            </p>
          </div>
        </ScrollReveal>

        <ol className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/70 border border-border/70 rounded-2xl overflow-hidden">
          {competition.steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={0.05 * i}>
              <li className="bg-background p-8 h-full flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl text-muted-foreground/40">
                    /{competition.steps.length}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl mt-6 leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.bullets && (
                  <ul className="mt-5 space-y-1.5 text-sm text-foreground/85">
                    {step.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 before:content-['\u2014'] before:text-muted-foreground"
                      >
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
