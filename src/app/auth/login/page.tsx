"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  Mail,
  Phone,
  ShieldCheck,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type LoginMethod = "phone" | "email";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [method, setMethod] = React.useState<LoginMethod>("phone");
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);

  const supabase = React.useMemo(() => createClient(), []);
  const isPhone = method === "phone";

  const callbackError =
    searchParams.get("error") === "auth_callback_failed"
      ? "Authentication link expired or opened in a different browser. Please try again."
      : "";

  const displayError = formError || callbackError;

  async function handleSubmit() {
    const input = value.trim();
    if (!input) return;

    setLoading(true);
    setFormError("");

    try {
      let targetValue = input;

      if (isPhone) {
        const cleanPhone = input.replace(/\D/g, "").replace(/^92/, "").replace(/^0/, "");
        if (cleanPhone.length < 10) {
          throw new Error("Please enter a valid Pakistani mobile number.");
        }
        targetValue = `+92${cleanPhone}`;

        const { error: signInError } = await supabase.auth.signInWithOtp({
          phone: targetValue,
        });

        if (signInError) throw signInError;

        if (typeof window !== "undefined") {
          sessionStorage.setItem("agrobid_auth_method", "phone");
          sessionStorage.setItem("agrobid_auth_value", targetValue);
        }

        router.push("/auth/verify");
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          throw new Error("Please enter a valid email address.");
        }

        const { error: signInError } = await supabase.auth.signInWithOtp({
          email: input,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signInError) throw signInError;

        setEmailSent(true);
      }
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <section className="relative hidden overflow-hidden bg-brand-950 lg:flex">
        <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                <Sprout className="size-6" />
              </div>

              <div>
                <p className="font-heading text-xl font-bold tracking-tight text-white">
                  AGROBID
                </p>
                <p className="text-xs text-white/60">Pakistan</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <ShieldCheck className="size-4 text-harvest-400" />
              Simple & secure access
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-white xl:text-5xl">
              Your farm.
              <br />
              Your market.
              <br />
              <span className="text-harvest-400">Your opportunity.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
              Connect with buyers, discover agricultural products, and participate in
              auctions — all from one place.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Buy and sell agricultural products",
                "Participate in live auctions",
                "Connect with trusted users",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="flex size-5 items-center justify-center rounded-full bg-white/10">
                    <Check className="size-3 text-harvest-400" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} AgroBid Pakistan
          </p>
        </div>
      </section>

      {/* Login panel */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <Sprout className="size-6" />
            </div>

            <div>
              <p className="font-heading text-xl font-bold tracking-tight text-brand-900">
                AGROBID
              </p>
              <p className="text-xs text-muted-foreground">Pakistan</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Welcome to AgroBid 👋
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Sign in or create your account to continue.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border bg-card p-6 shadow-lg sm:p-8">
            {emailSent ? (
              <div className="text-center py-4 space-y-4">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Check your email</h3>
                <p className="text-sm text-muted-foreground">
                  We sent a magic sign-in link to <strong className="text-foreground">{value}</strong>.
                </p>
                <p className="text-xs text-muted-foreground">
                  Click the link inside the email to sign in directly.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    setEmailSent(false);
                    setValue("");
                  }}
                >
                  Use a different email
                </Button>
              </div>
            ) : (
              <>
                {/* Method selector */}
                <div
                  className="grid grid-cols-2 rounded-xl bg-muted p-1"
                  role="tablist"
                  aria-label="Login method"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isPhone}
                    onClick={() => {
                      setMethod("phone");
                      setValue("");
                      setFormError("");
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isPhone
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Phone className="size-4" />
                    Phone
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={!isPhone}
                    onClick={() => {
                      setMethod("email");
                      setValue("");
                      setFormError("");
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      !isPhone
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Mail className="size-4" />
                    Email
                  </button>
                </div>

                <div className="mt-7">
                  <label htmlFor="login-value" className="mb-2 block text-sm font-medium">
                    {isPhone ? "Phone number" : "Email address"}
                  </label>

                  <div className="relative">
                    {isPhone && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted-foreground">
                        +92
                      </div>
                    )}

                    <Input
                      id="login-value"
                      type={isPhone ? "tel" : "email"}
                      inputMode={isPhone ? "tel" : "email"}
                      autoComplete={isPhone ? "tel" : "email"}
                      placeholder={isPhone ? "3XX XXXXXXX" : "you@example.com"}
                      value={value}
                      onChange={(event) => {
                        setValue(event.target.value);
                        setFormError("");
                      }}
                      className={isPhone ? "pl-12" : ""}
                      aria-invalid={Boolean(displayError)}
                    />
                  </div>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {isPhone
                      ? "We'll send a 6-digit OTP to your phone."
                      : "We'll email you a secure link to log in instantly."}
                  </p>

                  {displayError && (
                    <p className="mt-3 text-sm text-destructive" role="alert">
                      {displayError}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  className="mt-6 h-12 w-full rounded-xl"
                  disabled={!value.trim() || loading}
                  onClick={handleSubmit}
                >
                  {loading
                    ? "Sending..."
                    : isPhone
                      ? "Send OTP"
                      : "Send Magic Link"}
                  {!loading && <ArrowRight className="size-4 ml-2" />}
                </Button>

                <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  <span>Secure authentication</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
                  By continuing, you agree to AgroBid&apos;s terms and privacy policy.
                </p>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Your phone number or email is only used to secure your AgroBid account.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </React.Suspense>
  );
}