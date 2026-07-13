"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export function Header({ season }: { season?: string }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Competitions", href: "/competitions" },
    { name: "How it works", href: "/#how-it-works" },
    { name: "Scoring", href: "/#scoring" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-[background,backdrop-filter,border-color] duration-300 h-16 flex items-center border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between w-full">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-lg py-1 px-2"
          aria-label={`${brand.name} home`}
        >
          <Camera className="h-5 w-5 text-brand hover-only:scale-110 transition-transform duration-200" />
          <span className="font-display font-bold text-lg tracking-tight">
            {brand.name}
          </span>
          {season ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-brand/10 text-brand">
              <span className="size-1.5 rounded-full bg-brand animate-breathe" aria-hidden="true" />
              S{season}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-surface-alt text-muted-foreground border border-border">
              Archive
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 relative py-1.5 focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1",
                      active ? "text-brand" : "text-muted-foreground hover:red-lift"
                    )}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-brand rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild variant="brand" size="sm">
            <Link href="/#register">Register Now</Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <DialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="cursor-pointer select-none"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:duration-100 motion-reduce:transition-none motion-reduce:animate-none" />
              <DialogPrimitive.Content className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-80 bg-surface border-l border-border p-6 shadow-2xl data-[state=open]:duration-250 data-[state=closed]:duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right [transform-origin:right] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-bold text-lg tracking-tight flex items-center gap-2">
                      <Camera className="h-5 w-5 text-brand" />
                      {brand.name}
                    </span>
                    <DialogPrimitive.Close asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close navigation menu"
                        className="cursor-pointer select-none h-11 w-11"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </DialogPrimitive.Close>
                  </div>
                  <nav aria-label="Mobile navigation">
                    <ul className="flex flex-col gap-5">
                      {navLinks.map((link, idx) => {
                        const active = isLinkActive(link.href);
                        return (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex items-center gap-3 text-lg font-medium py-2 focus-visible:ring-2 focus-visible:ring-brand rounded-md px-2",
                                active ? "text-brand" : "text-muted-foreground"
                              )}
                            >
                              <span className="text-xs font-mono text-brand/60">
                                0{idx + 1}.
                              </span>
                              {link.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
                <div className="flex flex-col gap-4 mt-auto">
                  <Button asChild variant="brand" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/#register">Register Now</Link>
                  </Button>
                  <p className="text-xs font-mono text-muted-foreground text-center">
                    {brand.email}
                  </p>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
