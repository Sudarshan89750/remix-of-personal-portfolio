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

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Tell us your name')
    .max(80, 'Keep it under 80 characters'),
  email: z.string().trim().email('Looks like that email isn\u2019t valid'),
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
  youtube: z.string().trim().max(120).optional().or(z.literal('')),
  portfolio: z
    .string()
    .trim()
    .max(200)
    .url('Use a full URL like https://\u2026')
    .optional()
    .or(z.literal('')),
  niche: z.string().trim().max(60).optional().or(z.literal('')),
  motivation: z.string().trim().max(500).optional().or(z.literal('')),
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
      youtube: '',
      portfolio: '',
      niche: '',
      motivation: '',
    },
  });

  async function onSubmit(_values: FormValues) {
    // TODO: POST to /api/competitions/:slug/register once Postgres is wired in.
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitted(true);
  }

  const steps = [
    'Fill the form',
    `Pay ${formatINR(competition.entryFeeINR)}`,
    'Post your video',
    'Submit the link',
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
              for {formatINR(competition.prizeINR)}. The whole thing takes less
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
                  className="text-center py-10"
                >
                  <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
                  <h3 className="font-display text-3xl md:text-4xl mt-5">
                    You\u2019re in.
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    Registered for{' '}
                    <span className="text-foreground font-medium">
                      {competition.title}
                    </span>
                    .
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check your email \u2014 we\u2019ve sent your payment link
                    and what to do next.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {brand.hashtag}
                  </div>
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
                      <Field name="phone" type="tel" label="Phone" placeholder="+91 \u2026" form={form} />
                      <Field name="instagram" label="Instagram handle" placeholder="@yourhandle" form={form} />
                      <Field name="city" label="City" placeholder="Optional" form={form} />
                      <Field name="youtube" label="YouTube channel" placeholder="Optional" form={form} />
                      <Field name="portfolio" label="Portfolio / website" placeholder="https:// (optional)" form={form} />
                      <Field name="niche" label="Photography niche" placeholder="Street, weddings, fashion\u2026" form={form} />
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
                        Secure payments \u00b7 No spam, ever.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        className="rounded-full px-6 h-12 text-base font-medium"
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Submitting\u2026
                          </>
                        ) : (
                          <>Register & pay {formatINR(competition.entryFeeINR)}</>
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
