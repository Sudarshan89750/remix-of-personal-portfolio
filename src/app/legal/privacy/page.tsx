import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main id="main-content" className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/">
                <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Heading */}
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center" aria-hidden="true">
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                Legal
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl mt-0.5 leading-none">
                Privacy Policy
              </h1>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed flex flex-col gap-6 text-sm sm:text-base border-t border-border pt-8">
            <p>
              At <strong>{brand.name}</strong>, we respect your privacy and are committed to protecting the personal data you share with us. This Privacy Policy describes how we collect, use, and store your information.
            </p>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                1. Information We Collect
              </h2>
              <p>
                When you register for a photography challenge, we collect personal information including your full name, email address, phone number (WhatsApp), Instagram handle, city, and optional portfolio link. We also collect transaction details (such as Transaction ID) to verify payments.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                2. How We Use Your Information
              </h2>
              <p>
                We use your personal data to manage challenge registrations, verify UPI payments, process prize winnings, publish scores on the leaderboard, and communicate updates via WhatsApp or email. We do not sell or lease your personal information to third parties.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                3. Leaderboard &amp; Public Profiles
              </h2>
              <p>
                By participating, your Instagram handle, submission links, and engagement scores will be publicly displayed on the challenge leaderboard. Personal contact details (email, phone number, transaction ID) will remain strictly confidential and will only be accessible by the administration team.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                4. Data Security
              </h2>
              <p>
                We implement robust security measures to protect your personal data from unauthorized access, alteration, or disclosure. All registration records are securely stored on our database services using encrypted credentials.
              </p>
            </div>

            <p className="text-xs text-muted-foreground/80 mt-6 pt-6 border-t border-border/60">
              Last updated: June 2026. For questions regarding data privacy, please contact hello@photogigs.in.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
