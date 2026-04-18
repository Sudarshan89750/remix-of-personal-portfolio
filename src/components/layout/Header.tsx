import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { brand } from '@/data/brand';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Competitions', path: '/competitions' },
  { name: 'How it works', path: '/#how-it-works', hash: true },
];

interface Props {
  season?: string;
}

export function Header({ season }: Props) {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const isHome = currentPath === '/';
  const isTransparent = isHome && !isScrolled;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/80 backdrop-blur-xl border-b border-border/60'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className={cn(
              'group inline-flex items-baseline gap-2 transition-colors',
              isTransparent ? 'text-white' : 'text-foreground'
            )}
          >
            <img src="/Favicon.png" alt="PhotoGigs" className="w-8 h-8 object-contain" />
            <span className="font-display text-2xl leading-none">
              PhotoGigs
            </span>
            <span
              className={cn(
                'hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em]',
                isTransparent ? 'text-white/60' : 'text-muted-foreground'
              )}
            >
              {season ? `${season.replace('Season ', 'S')} / live` : 'Archive'}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={cn(
                  'text-sm font-medium tracking-tight transition-colors',
                  isTransparent
                    ? 'text-white/85 hover:text-white'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'size-9',
                    isTransparent && 'text-white hover:bg-white/10'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <div className="flex items-center gap-2 mt-2 mb-8">
                  <img src="/Favicon.png" alt="PhotoGigs" className="w-8 h-8 object-contain" />
                  <div className="font-display text-3xl">
                    PhotoGigs
                  </div>
                </div>
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg tracking-tight text-foreground/85 hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
