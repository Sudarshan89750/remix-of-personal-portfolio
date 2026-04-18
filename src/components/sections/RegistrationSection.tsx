import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatINR, type Competition } from '@/data/competitions';
import { brand } from '@/data/brand';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertCircle, Maximize2 } from 'lucide-react';

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Tell us your name')
    .max(80, 'Keep it under 80 characters'),
  email: z.string().trim().email('Looks like that email isn’t valid'),
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  instagram: z
    .string()
    .trim()
    .min(2, 'We need your Instagram handle to score your entry')
    .max(40)
    .regex(/^@?[a-zA-Z0-9._]+$/, 'Just letters, numbers, _ and .'),
  city: z.string().trim().max(60).optional().or(z.literal('')),
  portfolio: z
    .string()
    .trim()
    .max(200)
    .url('Use a full URL like https://…')
    .optional()
    .or(z.literal('')),
  niche: z.string().trim().max(60).optional().or(z.literal('')),
  motivation: z.string().trim().max(500).optional().or(z.literal('')),
  paymentStatus: z.enum(['pending', 'paid']),
  transactionId: z.string().trim().max(50).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  competition: Competition;
}

export function RegistrationSection({ competition }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      instagram: '',
      city: '',
      portfolio: '',
      niche: '',
      motivation: '',
      paymentStatus: 'pending',
      transactionId: '',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          competitionId: competition.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
    }
  }

  const steps = [
    'Fill the form',
    'Register',
    'Collaborate on Instagram',
  ];

  return (
    <section
      id="register"
      className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border/60 bg-secondary/40"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Registration
            </p>
            <h2 className="font-display mt-3 text-5xl md:text-6xl leading-[0.95] text-balance">
              Lock your spot in <em className="italic">{competition.season}</em>.
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              Pay {formatINR(competition.entryFeeINR)}, post a video, compete
              for {competition.prizeDescription || formatINR(competition.prizeINR)}. The whole thing takes less
              than five minutes to enter.
            </p>

            <ol className="mt-10 space-y-3">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background px-4 py-3"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <ScrollReveal delay={0.15}>
            <div className="rounded-3xl border border-border bg-background p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative size-48 p-2 bg-white rounded-2xl border-4 border-black flex items-center justify-center overflow-hidden">
                      <img src="/Payment.jpeg" alt="UPI QR" className="size-full object-cover" />
                    </div>
                  </div>

                    <CheckCircle2 className="mx-auto size-8 text-emerald-500" />
                    <h3 className="font-display text-3xl md:text-4xl mt-4">
                      Wait, one last thing.
                    </h3>
                    <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                      To complete your entry, you <span className="text-foreground font-semibold italic underline underline-offset-4 decoration-amber-500">must</span> invite us as a collaborator on your Reel.
                    </p>
                    
                    <div className="mt-8 p-6 rounded-2xl border border-border bg-secondary/20 text-left">
                      <h4 className="font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
                        <span className="size-2 rounded-full bg-amber-500" />
                        Final Steps:
                      </h4>
                      <ul className="mt-4 space-y-4 text-sm">
                        <li className="flex gap-3">
                          <span className="font-mono text-[10px] text-muted-foreground opacity-50 shrink-0">01</span>
                          <span>Post your Reel and tag <span className="font-bold">@photogigs</span> as a collaborator.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-mono text-[10px] text-muted-foreground opacity-50 shrink-0">02</span>
                          <span>Wait for us to accept the invitation (usually within 24h).</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-mono text-[10px] text-muted-foreground opacity-50 shrink-0">03</span>
                          <span>Your video will then go live on our public scoreboard!</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a 
                        href={brand.social.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                      >
                        <Button className="rounded-full w-full h-12 px-8 bg-[#E1306C] hover:bg-[#C13584] text-white">
                          Open Instagram
                        </Button>
                      </a>
                      <Button 
                        variant="outline" 
                        className="rounded-full w-full sm:w-auto h-12 px-8" 
                        onClick={() => window.location.reload()}
                      >
                        Done for now
                      </Button>
                    </div>
                    
                    <p className="mt-6 text-[10px] text-muted-foreground uppercase tracking-widest">
                      Invite tag: <span className="text-foreground font-bold">@photogigs</span>
                    </p>
                  </motion.div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field name="fullName" label="Full name" placeholder="Aarav Sharma" form={form} />
                      <Field name="email" type="email" label="Email" placeholder="you@studio.in" form={form} />
                      <Field name="phone" type="tel" label="Phone" placeholder="+91 …" form={form} />
                      <Field name="instagram" label="Instagram handle" placeholder="@yourhandle" form={form} />
                      <Field name="city" label="City" placeholder="Optional" form={form} />
                      <Field name="portfolio" label="Portfolio / website" placeholder="https:// (optional)" form={form} />
                      <Field name="niche" label="Photography niche" placeholder="Street, weddings, fashion…" form={form} />
                    </div>

                    <div className="pt-6 border-t border-border/60">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-border/60"></div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">Payment Verification</span>
                        <div className="h-px flex-1 bg-border/60"></div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="paymentStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                                  Your Status
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="rounded-xl h-11">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="pending">Didn't pay (DP)</SelectItem>
                                    <SelectItem value="paid">Paid (P)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Field 
                            name="transactionId" 
                            label="Transaction ID (Mention in Message)" 
                            placeholder="Optional but recommended" 
                            form={form} 
                          />
                        </div>

                        <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                          <div className="flex justify-center mb-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="group relative bg-white p-3 rounded-xl border border-border shadow-sm transition-all hover:scale-105 active:scale-95">
                                  <div className="size-32 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                    <img src="/Payment.jpeg" alt="UPI QR" className="size-32 object-cover" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                      <Maximize2 className="size-6 text-white drop-shadow-md" />
                                    </div>
                                  </div>
                                  <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to expand
                                  </div>
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md border-none bg-transparent shadow-none p-0 flex flex-col items-center gap-4">
                                <DialogHeader className="sr-only">
                                  <DialogTitle>Scan to Pay</DialogTitle>
                                </DialogHeader>
                                <div className="bg-white p-6 rounded-3xl shadow-2xl relative">
                                  <img 
                                    src="/Payment.jpeg" 
                                    alt="Payment QR Code" 
                                    className="size-[320px] md:size-[400px] object-contain rounded-lg"
                                  />
                                  <div className="mt-6 text-center">
                                    <p className="font-display text-2xl">Scan to Pay</p>
                                    <p className="text-muted-foreground text-sm mt-1">Amount: {formatINR(competition.entryFeeINR)}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="flex gap-3">
                            <AlertCircle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] leading-relaxed text-muted-foreground">
                              If transaction ID is not provided and payment is not verified, your entry will be <span className="text-foreground font-semibold">discarded</span> from the competition.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                            Why do you want to compete?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Optional. One or two lines is plenty."
                              rows={3}
                              className="rounded-xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Secure payments · No spam, ever.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting || form.watch('paymentStatus') === 'pending'}
                        className="rounded-full px-6 h-12 text-base font-medium"
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                             Submitting…
                          </>
                        ) : (
                          <>Register {formatINR(competition.entryFeeINR)}</>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  form,
  name,
  label,
  placeholder,
  type = 'text',
}: {
  form: ReturnType<typeof useForm<FormValues>>;
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className="rounded-xl h-11"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
