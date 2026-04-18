import { FaInstagram } from 'react-icons/fa6';
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
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Competition Rules', href: '/legal/rules' },
    ],
  },
];

interface Props {
  season?: string;
}

export function Footer({ season }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 font-display text-3xl leading-none">
              <img src="/Favicon.png" alt="PhotoGigs" className="w-8 h-8 object-contain" />
              <span>PhotoGigs</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {brand.shortDescription} Built in India for photographers who
              want their work — not their network — to do the talking.
            </p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="size-4" />
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
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {brand.name}. Made by photographers, for photographers.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {season ? season.replace('Season ', 'S') : 'Archive'} · {brand.hashtag}
          </p>
        </div>
      </div>
    </footer>
  );
}
