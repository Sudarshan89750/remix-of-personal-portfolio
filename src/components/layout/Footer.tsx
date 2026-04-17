import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { brand } from '@/data/brand';

const groups = [
  {
    title: 'Platform',
    links: [
      { name: 'Competitions', href: '/competitions' },
      { name: 'How it works', href: '/#how-it-works' },
      { name: 'Scoring', href: '/#scoring' },
      { name: 'Register', href: '/#register' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Competition Rules', href: '/legal/rules' },
      { name: 'Refund Policy', href: '/legal/refund' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          <div className="col-span-2">
            <Link to="/" className="font-display text-3xl leading-none">
              {brand.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {brand.shortDescription} Built in India for photographers who
              want their work \u2014 not their network \u2014 to do the talking.
            </p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
              <span>@photogigs</span>
            </a>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            \u00a9 {year} {brand.name}. Made by photographers, for photographers.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            S01 \u00b7 {brand.hashtag}
          </p>
        </div>
      </div>
    </footer>
  );
}
