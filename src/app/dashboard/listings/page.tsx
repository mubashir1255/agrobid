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

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

interface ListingsPageProps {
  searchParams: Promise<{ type?: string; category?: string }>;
}

const unitLabels: Record<string, string> = {
  man: "Man (من)",
  maund: "Man (من)",
  peti: "Peti (پیٹی)",
  carton: "Carton / Dabba (ڈبہ)",
  crate: "Crate (کریٹ)",
  bori: "Bori (بوری)",
  ton: "Ton (ٹن)",
  kg: "KG (کلو)",
  head: "Head (راس)",
};

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const { type, category } = await searchParams;
  const supabase = await createClient();

  // Fetch categories for filters
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, urdu_name, slug")
    .order("name");

  // Query active listings
  let query = supabase
    .from("listings")
    .select(`
      id,
      title,
      description,
      listing_type,
      quantity,
      unit,
      price_per_unit,
      starting_bid,
      current_highest_bid,
      auction_ends_at,
      city,
      province,
      created_at,
      categories (
        name,
        urdu_name
      ),
      profiles:seller_id (
        full_name,
        phone
      )
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (type === "direct_sale" || type === "auction") {
    query = query.eq("listing_type", type);
  }

  if (category) {
    const selectedCategory = categories?.find((c) => c.slug === category);
    if (selectedCategory) {
      query = query.eq("category_id", selectedCategory.id);
    }
  }

  const { data: listings, error } = await query;

  if (error) {
    console.error("Error fetching listings:", error);
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Marketplace (زرعی منڈی)
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse available crops, harvest lots, fruits, vegetables, and live auctions across Pakistan.
          </p>
        </div>

        <Button asChild className="rounded-xl self-start sm:self-auto">
          <Link href="/dashboard/listings/create">
            <PackagePlus className="size-4 mr-2" />
            Sell Produce (فصل / مال درج کریں)
          </Link>
        </Button>
      </div>

      {/* Filter Tabs: All vs Fixed Price vs Auctions */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4">
        <Link
          href="/dashboard/listings"
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            !type
              ? "bg-brand-700 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          All Items (تمام اجناس و پھل)
        </Link>
        <Link
          href="/dashboard/listings?type=direct_sale"
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            type === "direct_sale"
              ? "bg-brand-700 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Fixed Price (براہ راست فروخت)
        </Link>
        <Link
          href="/dashboard/listings?type=auction"
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            type === "auction"
              ? "bg-harvest-700 text-white shadow-sm"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Live Auctions (نیلامی / بولی)
        </Link>
      </div>

      {/* Grid of Listings */}
      {!listings || listings.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <SlidersHorizontal className="size-6" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold">No listings found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Be the first farmer or trader to list produce in this category.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/dashboard/listings/create">Post First Listing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => {
            const isAuction = item.listing_type === "auction";
            const categoryData = Array.isArray(item.categories)
              ? item.categories[0]
              : item.categories;
            const unitDisplay = unitLabels[item.unit] || item.unit;

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
                          <Gavel className="size-3" /> Auction
                        </>
                      ) : (
                        <>
                          <Tag className="size-3" /> Direct Sale
                        </>
                      )}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {categoryData?.urdu_name || categoryData?.name || "General"}
                    </span>
                  </div>

                  {/* Title & Quantity */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mt-1">
                      {item.quantity} {unitDisplay} available
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
                        Ends {new Date(item.auction_ends_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="mt-5 pt-4 border-t flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium block">
                      {isAuction ? "Current Bid" : "Price"}
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
                      <span>{isAuction ? "Bid Now" : "Details"}</span>
                      <ArrowRight className="size-3.5 ml-1" />
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
