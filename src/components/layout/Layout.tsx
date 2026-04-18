import React, { type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Pages that handle their own top spacing / chrome.
 * Hero-driven home, full-bleed auth, and hero-style competition detail
 * shouldn't get the default top padding from the main wrapper.
 */
const FULL_BLEED_ROUTES = ['/'];
const FULL_BLEED_PREFIXES = ['/competitions/'];

const isFullBleed = (path: string) =>
  FULL_BLEED_ROUTES.includes(path) ||
  FULL_BLEED_PREFIXES.some((p) => path.startsWith(p));

export function Layout({ children }: LayoutProps) {
  const [pathname, setPathname] = React.useState('/');

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const fullBleed = isFullBleed(pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main
        id="main-content"
        className={`flex-1 ${fullBleed ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
