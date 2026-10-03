"use client";

import * as React from "react";
import Link from "next/link";
import {
  Gavel,
  PackagePlus,
  MapPin,
  Clock,
  Tag,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import type { TranslationKeys } from "@/config/i18n";

interface ListingItem {
  id: string;
  title: string;
  description: string;
  listing_type: string;
  quantity: number;
  unit: string;
  price_per_unit: number | null;
  starting_bid: number | null;
  current_highest_bid: number | null;
  auction_ends_at: string | null;
  city: string;
  province: string;
  categories: { name: string; urdu_name: string } | { name: string; urdu_name: string }[] | null;
}

interface FeedClientProps {
  listings: ListingItem[];
  type?: string;
}

export function FeedClient({ listings, type }: FeedClientProps) {
  const { t, language } = useLanguage();

  const getUnitLabel = (unit: string) => {
    const key = `unit_${unit}` as TranslationKeys;
    return t(key) || unit;
  };

  return (
    <div className="space-y-8">
      {/* Header & Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            {t("marketplaceTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("marketplaceSubtitle")}
          </p>
        </div>

        <Button asChild className="rounded-xl self-start sm:self-auto">
          <Link href="/dashboard/listings/create">
            <PackagePlus className="size-4 mr-2" />
            {t("sellProduceAction")}
          </Link>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4">
        <Link
          href="/dashboard/listings"
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            !type
              ? "bg-brand-700 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("filterAll")}
        </Link>
        <Link
          href="/dashboard/listings?type=direct_sale"
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            type === "direct_sale"
              ? "bg-brand-700 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("filterDirect")}
        </Link>
        <Link
          href="/dashboard/listings?type=auction"
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            type === "auction"
              ? "bg-harvest-700 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("filterAuction")}
        </Link>
      </div>

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <SlidersHorizontal className="size-6" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">{t("noListingsFound")}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t("noListingsDesc")}
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/dashboard/listings/create">{t("postFirstListing")}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => {
            const isAuction = item.listing_type === "auction";
            const categoryData = Array.isArray(item.categories)
              ? item.categories[0]
              : item.categories;
            const categoryName =
              language === "ur"
                ? categoryData?.urdu_name || categoryData?.name
                : categoryData?.name || categoryData?.urdu_name;

            const unitDisplay = getUnitLabel(item.unit);

            return (
              <div
                key={item.id}
                className="group rounded-3xl border bg-card p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        isAuction
                          ? "bg-harvest-100 text-harvest-800 dark:bg-harvest-950/40 dark:text-harvest-300"
                          : "bg-brand-100 text-brand-800 dark:bg-brand-950/40 dark:text-brand-300"
                      }`}
                    >
                      {isAuction ? (
                        <>
                          <Gavel className="size-3" /> {t("filterAuction")}
                        </>
                      ) : (
                        <>
                          <Tag className="size-3" /> {t("filterDirect")}
                        </>
                      )}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {categoryName || "General"}
                    </span>
                  </div>

                  {/* Title & Quantity */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mt-1">
                      {item.quantity} {unitDisplay} {t("available")}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Location & Time */}
                  <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5 text-brand-600" />
                      {item.city}, {item.province}
                    </span>

                    {isAuction && item.auction_ends_at && (
                      <span className="inline-flex items-center gap-1 text-harvest-700 dark:text-harvest-400 font-medium">
                        <Clock className="size-3.5" />
                        {t("endsOn")}: {new Date(item.auction_ends_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="mt-5 pt-4 border-t flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium block">
                      {isAuction ? t("currentBid") : t("price")}
                    </span>
                    <p className="font-heading text-lg font-bold text-foreground">
                      PKR{" "}
                      {isAuction
                        ? (item.current_highest_bid || item.starting_bid)?.toLocaleString()
                        : item.price_per_unit?.toLocaleString()}
                      {!isAuction && (
                        <span className="text-xs font-normal text-muted-foreground">
                          {" "}
                          / {unitDisplay}
                        </span>
                      )}
                    </p>
                  </div>

                  <Button asChild size="sm" variant={isAuction ? "harvest" : "default"}>
                    <Link href={`/dashboard/listings/${item.id}`}>
                      <span>{isAuction ? t("bidNow") : t("viewDetails")}</span>
                      <ArrowRight className="size-3.5 ml-1 rtl:rotate-180" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
