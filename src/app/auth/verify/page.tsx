"use client";

import * as React from "react";
import { ArrowRight, Loader2, ShieldCheck, Sprout } from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type LoginMethod = "phone" | "email";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function VerifyPage() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = React.useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = React.useState(false);
  const [resending, setResending] = React.useState(false);
  const [error, setError] = React.useState("");
  const [secondsLeft, setSecondsLeft] = React.useState(RESEND_SECONDS);

  const [method, setMethod] = React.useState<LoginMethod>("email");
  const [value, setValue] = React.useState("");

  const code = otp.join("");

  React.useEffect(() => {
    let savedMethod = sessionStorage.getItem("agrobid_auth_method");
    let savedValue = sessionStorage.getItem("agrobid_auth_value");

    if (!savedValue && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paramVal = params.get("value");
      const paramMethod = params.get("method");
      if (paramVal) {
        savedValue = paramVal;
        savedMethod = paramMethod === "phone" ? "phone" : "email";
      }
    }

    if (savedMethod === "phone" || savedMethod === "email") {
      setMethod(savedMethod);
    }

    if (savedValue) {
      setValue(savedValue);
    } else {
      router.replace("/auth/login");
    }
  }, [router]);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  function updateOtp(index: number, digit: string) {
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
  }

  function handleChange(index: number, input: string) {
    const digits = input.replace(/\D/g, "");

    if (!digits) {
      updateOtp(index, "");
      return;
    }

    setError("");

    if (digits.length > 1) {
      const nextOtp = [...otp];

      digits
        .slice(0, OTP_LENGTH - index)
        .split("")
        .forEach((digit, offset) => {
          nextOtp[index + offset] = digit;
        });

      setOtp(nextOtp);

      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);

      inputRefs.current[nextIndex]?.focus();
      return;
    }

    updateOtp(index, digits);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      event.preventDefault();

      const nextOtp = [...otp];
      nextOtp[index - 1] = "";
      setOtp(nextOtp);

      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  }

  async function handleVerify() {
    if (code.length !== OTP_LENGTH) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (!value) {
      setError("Your login information is missing. Please go back and try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const verifyData =
        method === "email"
          ? {
              email: value,
              token: code,
              type: "email" as const,
            }
          : {
              phone: value,
              token: code,
              type: "sms" as const,
            };

      const { error: verifyError } = await supabase.auth.verifyOtp(verifyData);

      if (verifyError) {
        throw verifyError;
      }

      sessionStorage.removeItem("agrobid_auth_method");
      sessionStorage.removeItem("agrobid_auth_value");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.onboarding_completed) {
          router.replace("/");
        } else {
          router.replace("/onboarding");
        }
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid verification code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!value || secondsLeft > 0 || resending) return;

    setResending(true);
    setError("");

    try {
      const { error: resendError } =
        method === "phone"
          ? await supabase.auth.signInWithOtp({
              phone: value,
            })
          : await supabase.auth.signInWithOtp({
              email: value,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
              },
            });

      if (resendError) {
        throw resendError;
      }

      setOtp(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(RESEND_SECONDS);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to resend the code. Please try again.",
      );
    } finally {
      setResending(false);
    }
  }

  const formattedTime = `00:${secondsLeft.toString().padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-10 flex items-center justify-center gap-3">
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

          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <ShieldCheck className="size-7" />
            </div>

            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Verify your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Enter the 6-digit verification code sent to
            </p>

            <p className="mt-1 text-sm font-medium break-all">{value}</p>
          </div>

          {/* OTP Card */}
          <div className="mt-8 rounded-3xl border bg-card p-6 shadow-lg sm:p-8">
            <div>
              <p className="mb-4 text-center text-sm font-medium">Verification code</p>

              <div
                className="flex justify-center gap-2 sm:gap-3"
                aria-label="6-digit verification code"
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={index === 0 ? 6 : 1}
                    value={digit}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onFocus={(event) => event.target.select()}
                    aria-label={`Digit ${index + 1}`}
                    className="size-11 rounded-xl border bg-background text-center text-lg font-semibold transition outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:size-12"
                  />
                ))}
              </div>

              {error && (
                <p role="alert" className="mt-4 text-center text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleVerify}
              disabled={loading || code.length !== OTP_LENGTH}
              className="mt-7 h-12 w-full rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            <div className="mt-6 text-center">
              {secondsLeft > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in{" "}
                  <span className="font-medium text-foreground tabular-nums">
                    {formattedTime}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-sm font-medium text-primary transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {resending ? "Sending a new code..." : "Resend code"}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              className="mt-5 w-full text-center text-sm text-muted-foreground transition hover:text-foreground"
            >
              ← Back to login
            </button>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            The verification code expires after a short period.
          </p>
        </div>
      </div>
    </main>
  );
}
