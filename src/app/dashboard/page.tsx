import * as React from "react";
import Link from "next/link";
import {
  Gavel,
  PackagePlus,
  Search,
  TrendingUp,
  Sprout,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, city, province")
    .eq("id", user?.id || "")
    .maybeSingle();

  const firstName = profile?.full_name ? profile.full_name.split(" ")[0] : "Farmer";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-6 sm:p-10 text-white shadow-md">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur text-harvest-300">
            <ShieldCheck className="size-4" />
            Verified AgroBid Member
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Khush Amdeed, {firstName} 👋
          </h1>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Buy, sell, or auction crops and livestock directly across Pakistan. Transparent prices with zero hidden middlemen.
          </p>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <Sprout className="size-96 text-white" />
        </div>
      </section>

      {/* Main Action Hub */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sell / List Product */}
        <div className="group rounded-3xl border bg-card p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-4">
            <div className="size-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <PackagePlus className="size-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Sell Product (فروخت کریں)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Post your agricultural produce, crops, or livestock with fixed rates or open inquiries.
              </p>
            </div>
          </div>

          <Button className="mt-6 w-full rounded-xl justify-between" asChild>
            <Link href="/dashboard/listings/create">
              <span>Create Listing</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Start / Participate in Auction */}
        <div className="group rounded-3xl border bg-card p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-4">
            <div className="size-12 rounded-2xl bg-harvest-100 text-harvest-700 flex items-center justify-center">
              <Gavel className="size-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Live Auctions (بولی لگائیں)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Start an open auction with a starting price or place live bids on available crop lots.
              </p>
            </div>
          </div>

          <Button variant="outline" className="mt-6 w-full rounded-xl justify-between" asChild>
            <Link href="/dashboard/auctions">
              <span>View Auctions</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Browse Marketplace */}
        <div className="group rounded-3xl border bg-card p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="space-y-4">
            <div className="size-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Search className="size-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Marketplace (منڈی دریافت کریں)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Explore Wheat, Rice, Cotton, Corn, Fertilizer, and Mandi rates nearby.
              </p>
            </div>
          </div>

          <Button variant="outline" className="mt-6 w-full rounded-xl justify-between" asChild>
            <Link href="/dashboard">
              <span>Browse All</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Activity Overview Placeholders */}
      <section className="rounded-3xl border bg-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-brand-700" />
            <h2 className="font-heading text-lg font-bold">Your Platform Activity</h2>
          </div>
          <span className="text-xs text-muted-foreground">Updated in real-time</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">Active Listings</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">Active Auctions</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">Bids Placed</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">Completed Deals</p>
          </div>
        </div>
      </section>
    </div>
  );
}
