"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Maximize2,
  Lock
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { ScrollReveal } from "../ui/scroll-reveal";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../ui/dialog";
import { formatINR, formatPrizes, type Competition } from "@/data/competitions";
import { brand } from "@/data/brand";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(80),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Phone number is too short").max(20),
  instagram: z.string()
    .min(2, "Instagram handle is required")
    .max(40)
    .regex(/^@?[a-zA-Z0-9._]+$/, "Please enter a valid Instagram handle (letters, numbers, _, .)"),
  city: z.string().max(60).optional(),
  portfolio: z.string().url("Please enter a valid portfolio URL (like https://...)").or(z.literal("")).optional(),
  niche: z.string().max(60).optional(),
  motivation: z.string().max(500).optional(),
  paymentStatus: z.enum(["pending", "paid"]),
  transactionId: z.string().max(50).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationSection({ competition }: { competition: Competition }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      instagram: "",
      city: "",
      portfolio: "",
      niche: "",
      motivation: "",
      paymentStatus: "pending",
      transactionId: "",
    },
    mode: "onChange",
  });

  const paymentStatus = watch("paymentStatus"); // eslint-disable-line react-hooks/incompatible-library

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          competitionId: competition.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to register. Please try again.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="register" 
      className="py-24 bg-surface-alt/10 border-b border-border scroll-mt-16"
      aria-label="Registration details"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Panel: Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal>
              <span className="text-xs font-mono tracking-wider uppercase text-brand">
                Registration
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight">
                Lock your spot in <br className="hidden sm:inline" />
                <span className="text-brand italic font-semibold">Season S0{competition.season}.</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <p className="text-base text-muted-foreground leading-relaxed">
                Pay the entry fee of {formatINR(competition.entryFeeINR)}, complete the registration form, post your Reel, and compete for the prize pool of {competition.prizeDescription || formatPrizes(competition)}. The process takes less than five minutes.
              </p>
            </ScrollReveal>

            {/* Registration Steps Visual */}
            <ScrollReveal delay={0.2} className="flex flex-col gap-4 mt-2">
              {[
                { title: "Fill the details", desc: "Share your email, phone, and Instagram handle." },
                { title: "Complete Payment", desc: `Pay ${formatINR(competition.entryFeeINR)} securely via UPI QR Code.` },
                { title: "Invite us as Collaborator", desc: "Add @photogigs.in as a collaborator on your post. We'll accept all entries that meet the basic quality guidelines." },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="flex items-center justify-center size-7 rounded-lg bg-brand/10 text-brand text-xs font-mono font-bold select-none shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Right Panel: Form Card */}
          <div className="lg:col-span-7 w-full">
            <ScrollReveal delay={0.15}>
              <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                
                {success ? (
                  /* Success State */
                  <div className="flex flex-col items-center text-center py-6 gap-6">
                    <div className="size-16 rounded-full bg-success/10 text-success flex items-center justify-center" aria-hidden="true">
                      <CheckCircle2 className="size-8" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display font-extrabold text-2xl tracking-tight">
                        You&apos;re Registered!
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                        To complete your entry, you <strong className="text-foreground">must</strong> add @photogigs.in as a collaborator on your post.
                      </p>
                    </div>

                    <div className="w-full max-w-sm bg-surface-alt border border-border rounded-2xl p-6 flex flex-col gap-4 text-left">
                      <h4 className="font-bold text-sm text-foreground border-b border-border/60 pb-2">
                        Next Steps:
                      </h4>
                      <ol className="flex flex-col gap-3 text-xs text-muted-foreground list-decimal pl-4 leading-normal">
                        <li>Add <span className="font-mono font-bold text-brand">@photogigs.in</span> as a collaborator on your post.</li>
                        <li>Wait for us to accept the invitation (usually within 12h).</li>
                        <li>Your entry will go live on the public scoreboard!</li>
                      </ol>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <Button asChild variant="brand" className="flex-1 justify-center gap-2">
                        <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer">
                          <InstagramIcon className="size-4" />
                          Open Instagram
                        </a>
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                        Done for now
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Form State */
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
                    
                    {submitError && (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive flex items-start gap-2" role="alert">
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          Full Name *
                        </label>
                        <Input
                          id="fullName"
                          placeholder="Aarav Sharma"
                          error={!!errors.fullName}
                          disabled={isSubmitting}
                          {...register("fullName")}
                        />
                        {errors.fullName && (
                          <span className="text-xs text-destructive flex items-center gap-1 mt-0.5" role="alert">
                            <AlertCircle className="size-3" />
                            {errors.fullName.message}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@studio.in"
                          error={!!errors.email}
                          disabled={isSubmitting}
                          {...register("email")}
                        />
                        {errors.email && (
                          <span className="text-xs text-destructive flex items-center gap-1 mt-0.5" role="alert">
                            <AlertCircle className="size-3" />
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          Phone Number (WhatsApp) *
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="+91 99999 99999"
                          error={!!errors.phone}
                          disabled={isSubmitting}
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <span className="text-xs text-destructive flex items-center gap-1 mt-0.5" role="alert">
                            <AlertCircle className="size-3" />
                            {errors.phone.message}
                          </span>
                        )}
                      </div>

                      {/* Instagram */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="instagram" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          Instagram Handle *
                        </label>
                        <Input
                          id="instagram"
                          placeholder="@aarav_shoots"
                          error={!!errors.instagram}
                          disabled={isSubmitting}
                          {...register("instagram")}
                        />
                        {errors.instagram && (
                          <span className="text-xs text-destructive flex items-center gap-1 mt-0.5" role="alert">
                            <AlertCircle className="size-3" />
                            {errors.instagram.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="city" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          City (Optional)
                        </label>
                        <Input
                          id="city"
                          placeholder="Mumbai"
                          disabled={isSubmitting}
                          {...register("city")}
                        />
                      </div>

                      {/* Portfolio */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="portfolio" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          Portfolio URL (Optional)
                        </label>
                        <Input
                          id="portfolio"
                          placeholder="https://aaravsharma.myportfolio.com"
                          disabled={isSubmitting}
                          {...register("portfolio")}
                        />
                        {errors.portfolio && (
                          <span className="text-xs text-destructive flex items-center gap-1 mt-0.5" role="alert">
                            <AlertCircle className="size-3" />
                            {errors.portfolio.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* QR Code and Payment */}
                    <div className="border border-border/80 bg-surface-alt/40 rounded-2xl p-5 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Lock className="size-4 text-brand shrink-0" />
                        <span className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                          UPI Payment Gateway
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-5">
                        {/* QR Box */}
                        <div className="relative size-24 border border-border rounded-xl bg-white p-1 overflow-hidden shrink-0">
                          <Image
                            src="/Payment.jpg"
                            alt="UPI QR Code for Payment"
                            width={96}
                            height={96}
                            className="object-contain"
                          />
                          <Dialog>
                            <DialogTrigger asChild>
                              <button 
                                type="button" 
                                className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white cursor-pointer"
                                aria-label="Expand QR code"
                              >
                                <Maximize2 className="size-5" />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xs sm:max-w-sm">
                              <DialogHeader>
                                <DialogTitle>Scan &amp; Pay</DialogTitle>
                                <DialogDescription>
                                  Pay entry fee of {formatINR(competition.entryFeeINR)} via any UPI App.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-center py-2">
                                <Image
                                  src="/Payment.jpg"
                                  alt="Expanded UPI QR Code"
                                  width={280}
                                  height={280}
                                  className="rounded-xl border border-border"
                                />
                              </div>
                              <p className="text-center font-mono text-xs font-semibold select-all bg-surface-alt py-1.5 rounded border border-border">
                                UPI ID: 8313706740@indianbk
                              </p>
                            </DialogContent>
                          </Dialog>
                        </div>
                        
                        <div className="flex flex-col gap-1.5 text-center sm:text-left">
                          <p className="text-sm font-bold text-foreground">
                            Pay {formatINR(competition.entryFeeINR)} using UPI
                          </p>
                          <p className="text-xs text-muted-foreground leading-normal max-w-sm">
                            Scan the QR code, pay {formatINR(competition.entryFeeINR)}, and mark your payment status as &quot;Paid&quot; below. Input your Transaction ID for manual verification.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Payment Status Select */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="paymentStatus" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          Payment Status *
                        </label>
                        <Select
                          value={paymentStatus}
                          onValueChange={(val: "pending" | "paid") => setValue("paymentStatus", val, { shouldValidate: true })}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger id="paymentStatus" error={!!errors.paymentStatus}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending Payment</SelectItem>
                            <SelectItem value="paid">Paid &bull; Verifying</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Transaction ID */}
                      {paymentStatus === "paid" && (
                        <div className="flex flex-col gap-2">
                          <label htmlFor="transactionId" className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                            UPI Transaction ID / Ref No.
                          </label>
                          <Input
                            id="transactionId"
                            placeholder="e.g. 518308432034"
                            disabled={isSubmitting}
                            {...register("transactionId")}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-2.5 mt-2 bg-brand/5 border border-brand/10 p-4 rounded-xl">
                      <Info className="size-4 text-brand shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-normal">
                        <strong>Important:</strong> If the transaction ID is missing or payment cannot be verified, your registration will be discarded.
                      </p>
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      variant="brand" 
                      size="lg" 
                      className="w-full mt-2" 
                      loading={isSubmitting}
                      disabled={paymentStatus === "pending" || isSubmitting}
                    >
                      {paymentStatus === "pending" ? "Please Scan & Pay to Register" : "Submit Registration"}
                    </Button>
                  </form>
                )}
                
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
