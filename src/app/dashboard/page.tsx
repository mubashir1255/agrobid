"use client";

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

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-6 sm:p-10 text-white shadow-md">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur text-harvest-300">
            <ShieldCheck className="size-4" />
            {t("verifiedMember")}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            {t("welcome")} 👋
          </h1>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {t("dashboardSubtitle")}
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
                {t("sellProductCardTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("sellProductCardDesc")}
              </p>
            </div>
          </div>

          <Button className="mt-6 w-full rounded-xl justify-between" asChild>
            <Link href="/dashboard/listings/create">
              <span>{t("createListingBtn")}</span>
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
                {t("liveAuctionsCardTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("liveAuctionsCardDesc")}
              </p>
            </div>
          </div>

          <Button variant="outline" className="mt-6 w-full rounded-xl justify-between" asChild>
            <Link href="/dashboard/listings?type=auction">
              <span>{t("viewAuctionsBtn")}</span>
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
                {t("marketplaceCardTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("marketplaceCardDesc")}
              </p>
            </div>
          </div>

          <Button variant="outline" className="mt-6 w-full rounded-xl justify-between" asChild>
            <Link href="/dashboard/listings">
              <span>{t("browseAllBtn")}</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Activity Overview */}
      <section className="rounded-3xl border bg-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-brand-700" />
            <h2 className="font-heading text-lg font-bold">{t("platformActivity")}</h2>
          </div>
          <span className="text-xs text-muted-foreground">{t("realTimeNotice")}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">{t("activeListingsCount")}</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">{t("activeAuctionsCount")}</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">{t("bidsPlacedCount")}</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-1">{t("completedDealsCount")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
