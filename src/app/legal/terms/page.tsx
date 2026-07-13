import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";

export default function TermsPage() {
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
              <BookOpen className="size-5" />
            </div>
            <div>
              <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                Legal
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl mt-0.5 leading-none">
                Terms of Service
              </h1>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed flex flex-col gap-6 text-sm sm:text-base border-t border-border pt-8">
            <p>
              Welcome to <strong>{brand.name}</strong>. By accessing or using our website and competition services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
            </p>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                1. Eligibility &amp; Participation
              </h2>
              <p>
                Participation in {brand.name} challenges is open to residents of India who are at least 18 years of age. All submissions must be captured using mobile phone cameras only. Professional DSLR/mirrorless captures are strictly prohibited and will be disqualified.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                2. Registration &amp; Entry Fees
              </h2>
              <p>
                To register for a challenge, you must complete the official registration form and pay the specified entry fee (e.g. ₹149) via the provided UPI QR Code. The entry fee is non-refundable unless a challenge is cancelled in its entirety.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                3. Submissions &amp; Collaboration
              </h2>
              <p>
                To enter your photograph/video, you must upload it to Instagram as a Reel, tag the official account, and invite us as a collaborator. Submissions must be original works, and you represent that you hold all rights to the uploaded media. We do not claim ownership of your submissions; however, you grant {brand.name} a non-exclusive license to display the media on our platform and marketing channels.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                4. Scoring &amp; Leaderboards
              </h2>
              <p>
                Scoring is fully automated and based on authentic engagement metrics (views, shares, saves, comments) fetched from the public Instagram API. Manipulation of engagement metrics using bots, click farms, or incentivized coordination is strictly prohibited and will result in immediate disqualification without refund.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg text-foreground mt-4">
                5. Cash Prizes
              </h2>
              <p>
                Cash prizes will be distributed to verified winners within 7 days of the challenge deadline. Winners will be notified via email or WhatsApp and must provide valid Indian bank details (UPI/IMPS) for prize transfer. Applicable taxes (TDS) under Indian tax laws will be deducted before distribution if applicable.
              </p>
            </div>

            <p className="text-xs text-muted-foreground/80 mt-6 pt-6 border-t border-border/60">
              Last updated: June 2026. For questions regarding these terms, please contact hello@photogigs.in.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
