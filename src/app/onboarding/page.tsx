"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Camera,
  Check,
  Loader2,
  MapPin,
  Phone,
  Sprout,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Azad Kashmir",
  "Gilgit-Baltistan",
];

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    async function checkAuthAndProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (isMounted) router.replace("/auth/login");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, phone, province, city, address, onboarding_completed")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.onboarding_completed) {
          if (isMounted) router.replace("/dashboard");
          return;
        }

        if (isMounted) {
          if (profile) {
            if (profile.full_name) setFullName(profile.full_name);
            if (profile.phone) setPhone(profile.phone);
            if (profile.province) setProvince(profile.province);
            if (profile.city) setCity(profile.city);
            if (profile.address) setAddress(profile.address);
          } else {
            if (user.phone) {
              setPhone(user.phone.replace(/^\+92/, "0"));
            }
            const metadataName = user.user_metadata?.full_name ?? user.user_metadata?.name;
            if (metadataName) {
              setFullName(metadataName);
            }
          }
        }
      } catch (err) {
        console.error("Auth verification failed:", err);
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    }

    checkAuthAndProfile();

    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  const completedFields = [fullName, phone, province, city, address].filter(Boolean).length;
  const progress = Math.round((completedFields / 5) * 100);

  async function handleContinue() {
    if (progress < 100) return;

    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullName.trim(),
        phone: phone.trim(),
        province,
        city: city.trim(),
        address: address.trim(),
        onboarding_completed: true,
      });

      if (profileError) {
        throw profileError;
      }

      router.replace("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving your profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (initialLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-brand-600" />
          <p className="text-sm">Loading your profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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

          <span className="text-sm text-muted-foreground">Step 1 of 2</span>
        </header>

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <section className="lg:pt-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700">
                <Check className="size-4" />
                Account created successfully
              </div>

              <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome to
                <span className="block text-brand-700">AgroBid 👋</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                Let&apos;s complete your profile so you can start buying, selling, and
                bidding on agricultural products across Pakistan.
              </p>

              <div className="mt-8 max-w-md">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium">Profile completion</span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-brand-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  A complete profile helps build trust between farmers and buyers.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-bold">Complete your profile</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  You can update this information later.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                    <User className="size-7" />
                  </div>

                  <div>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="size-4 mr-2" />
                      Add photo
                    </Button>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Optional — JPG, PNG or WebP
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full name
                  </label>

                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Mobile number
                  </label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="phone"
                      type="tel"
                      placeholder="03XX XXXXXXX"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="h-12 pl-11"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="province" className="text-sm font-medium">
                      Province
                    </label>

                    <select
                      id="province"
                      value={province}
                      onChange={(event) => setProvince(event.target.value)}
                      className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select province</option>

                      {provinces.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City
                    </label>

                    <Input
                      id="city"
                      placeholder="e.g. Lahore"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-4 left-4 size-4 text-muted-foreground" />

                    <textarea
                      id="address"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      className="min-h-28 w-full resize-none rounded-md border border-input bg-background py-3 pr-4 pl-11 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleContinue}
                  disabled={progress < 100 || saving}
                  className="h-12 w-full rounded-xl"
                >
                  {saving ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Saving your profile...
                    </>
                  ) : (
                    <>
                      Continue to AgroBid
                      <ArrowRight className="size-4 ml-2" />
                    </>
                  )}
                </Button>

                {error && <p className="text-center text-sm text-destructive">{error}</p>}

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Your information helps us create a safer and more trusted marketplace.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}