import React from "react";
import Link from "next/link";
import { Camera, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { brand } from "@/data/brand";

export function Footer({ season }: { season?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-alt/40 border-t border-border mt-auto pt-16 pb-8" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-brand rounded-lg w-fit"
              aria-label={`${brand.name} home`}
            >
              <Camera className="h-6 w-6 text-brand" />
              <span className="font-display font-bold text-xl tracking-tight">
                {brand.name}.
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {brand.shortDescription} Built in India for photographers who want their work — not their network — to do the talking.
            </p>
          </div>

          {/* Links Grid */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Made For */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                Made For
              </span>
              <ul className="flex flex-col gap-2.5">
                {["Mobile Photographers", "Hobbyists", "Students", "Creators"].map((item) => (
                  <li key={item} className="text-sm text-foreground/80 font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Platform */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                Platform
              </span>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: "All Competitions", href: "/competitions" },
                  { name: "How it Works", href: "/#how-it-works" },
                  { name: "Scoring Criteria", href: "/#scoring" },
                  { name: "Register Now", href: "/#register" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md py-0.5 inline-block group"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                Company
              </span>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/#why"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md py-0.5 inline-block"
                  >
                    Why PhotoGigs
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md py-0.5 inline-block flex items-center gap-1 group"
                  >
                    Contact
                    <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
                <li>
                  <Link
                    href={brand.legal.privacy}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md py-0.5 inline-block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={brand.legal.terms}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md py-0.5 inline-block"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                Connect
              </span>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md py-0.5 inline-flex items-center gap-1.5 group"
                    aria-label="Follow us on Instagram (opens in a new tab)"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md py-0.5 inline-flex items-center gap-1.5 group"
                    aria-label="Explore our hashtag #PhotoGigsChallenge on Instagram (opens in a new tab)"
                  >
                    <span className="text-brand font-semibold font-mono">#</span>
                    Challenge
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} {brand.name}. Made by photographers, for photographers.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>{season ? `Season S${season}` : "Archive"}</span>
            <span>&bull;</span>
            <a 
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1"
            >
              {brand.social.hashtag}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
