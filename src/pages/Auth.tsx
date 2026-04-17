import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SEOHead } from '@/components/seo/SEOHead';
import { brand } from '@/data/brand';

const signInSchema = z.object({
  email: z.string().trim().email('Invalid email').max(200),
  password: z.string().min(8, 'Minimum 8 characters').max(72),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().trim().min(2, 'Tell us your name').max(80),
});

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

export default function Auth() {
  return (
    <>
      <SEOHead title="Sign in" description={`Sign in to your ${brand.name} account.`} />
      <section className="min-h-[100svh] grid lg:grid-cols-2">
        <aside className="relative hidden lg:block bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0 grain" aria-hidden />
          <div className="relative h-full p-12 flex flex-col">
            <Link to="/" className="font-display text-3xl">
              {brand.name}
            </Link>
            <div className="mt-auto max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-background/60">
                For photographers
              </p>
              <h2 className="font-display text-5xl mt-4 leading-[0.95]">
                Compete. Get hired.
                <br />
                <em className="italic text-background/70">Get paid.</em>
              </h2>
              <p className="mt-5 text-background/75 leading-relaxed">
                One account for competitions, jobs, gear and your network. Built
                in India, no third-party login required.
              </p>
            </div>
          </div>
        </aside>

        <div className="relative px-6 sm:px-10 py-12 flex flex-col">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground self-start"
          >
            <ArrowLeft className="size-4" /> Back home
          </Link>

          <div className="my-auto mx-auto w-full max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Account
            </p>
            <h1 className="font-display text-5xl mt-3 leading-[0.95]">
              Welcome to <em className="italic">{brand.name}</em>.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Sign in to your account, or create one in under a minute.
            </p>

            <Tabs defaultValue="signin" className="mt-8">
              <TabsList className="grid grid-cols-2 w-full rounded-full p-1 h-11">
                <TabsTrigger value="signin" className="rounded-full">
                  Sign in
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-full">
                  Create account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-6">
                <SignInForm />
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <SignUpForm />
              </TabsContent>
            </Tabs>

            <p className="mt-8 text-xs text-muted-foreground">
              Backend coming next round \u2014 hook this form to your Postgres
              (or Lovable Cloud) and you\u2019re live.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function SignInForm() {
  const [done, setDone] = useState(false);
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(_v: SignInValues) {
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-muted-foreground">
        Demo only \u2014 connect Postgres / Cloud to enable real sign-in.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Field name="email" type="email" label="Email" placeholder="you@studio.in" form={form} />
        <Field name="password" type="password" label="Password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" form={form} />
        <Button type="submit" className="w-full rounded-full h-11" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
}

function SignUpForm() {
  const [done, setDone] = useState(false);
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  });

  async function onSubmit(_v: SignUpValues) {
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-muted-foreground">
        Demo only \u2014 connect Postgres / Cloud to enable real sign-up.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Field name="fullName" label="Full name" placeholder="Aarav Sharma" form={form} />
        <Field name="email" type="email" label="Email" placeholder="you@studio.in" form={form} />
        <Field name="password" type="password" label="Password" placeholder="At least 8 characters" form={form} />
        <Button type="submit" className="w-full rounded-full h-11" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Create account'}
        </Button>
      </form>
    </Form>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Field({ form, name, label, placeholder, type = 'text' }: any) {
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
            <Input {...field} type={type} placeholder={placeholder} className="rounded-xl h-11" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
