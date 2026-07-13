import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background grain overflow-x-hidden">
      <Header />
      
      <main id="main-content" className="flex-grow flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
          <div className="size-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center animate-bounce" aria-hidden="true">
            <Compass className="size-8" />
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-wider uppercase text-brand">
              404 Error
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The page you are looking for does not exist or has been moved. Use the button below to return to safety.
            </p>
          </div>
          
          <Button asChild variant="brand" size="lg" className="w-full mt-2">
            <Link href="/" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Homepage
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
