import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Sprout,
  LayoutDashboard,
  ShoppingBag,
  Gavel,
  LogOut,
  MapPin,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, province, city, onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.onboarding_completed) {
    redirect("/onboarding");
  }

  const displayName = profile.full_name || "AgroBid User";
  const displayLocation = [profile.city, profile.province].filter(Boolean).join(", ") || "Pakistan";

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      {/* Top App Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm">
                <Sprout className="size-5" />
              </div>
              <div className="leading-tight">
                <span className="font-heading font-bold text-lg tracking-tight text-brand-900 dark:text-brand-100">
                  AGROBID
                </span>
                <span className="block text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Marketplace
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-foreground hover:bg-muted transition"
              >
                <LayoutDashboard className="size-4 text-brand-700" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/listings"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <ShoppingBag className="size-4" />
                Listings
              </Link>
              <Link
                href="/dashboard/listings?type=auction"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <Gavel className="size-4" />
                Live Auctions
              </Link>
            </nav>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold leading-none">{displayName}</span>
              <span className="inline-flex items-center justify-end gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="size-3 text-brand-700" />
                {displayLocation}
              </span>
            </div>

            <div className="size-9 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-sm border border-brand-200">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <form action={signOutAction}>
              <Button
                variant="ghost"
                size="icon-sm"
                type="submit"
                title="Sign out"
                aria-label="Sign out"
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}