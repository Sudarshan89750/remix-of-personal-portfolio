import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { brand } from '@/data/brand';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function SEOHead({
  title,
  description,
  image = 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1600&q=80',
  type = 'website',
}: SEOHeadProps) {
  const location = useLocation();

  const fullTitle = title
    ? `${title} \u00b7 ${brand.name}`
    : `${brand.name} \u2014 ${brand.tagline}`;
  const fullDescription = description || brand.shortDescription;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', fullDescription);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', fullDescription, true);
    setMeta('og:type', type, true);
    setMeta('og:url', fullUrl, true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', brand.name, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', fullDescription);
    setMeta('twitter:image', image);
    setMeta('author', brand.name);
    setMeta(
      'keywords',
      'photography competition, India, engagement-based, photographer jobs, photography marketplace, photo gigs'
    );

    // Canonical
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [fullTitle, fullDescription, fullUrl, image, type]);

  return null;
}
