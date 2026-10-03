import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Tag,
  Gavel,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { BidForm } from "./bid-form";

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

const unitLabels: Record<string, string> = {
  man: "Man (من - 40 KG)",
  maund: "Man (من - 40 KG)",
  peti: "Peti (پیٹی)",
  carton: "Carton / Dabba (ڈبہ)",
  crate: "Crate (کریٹ)",
  bori: "Bori (بوری)",
  ton: "Metric Ton (ٹن)",
  kg: "Kilogram (کلو)",
  head: "Head / Livestock (راس)",
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: listing, error } = await supabase
    .from("listings")
    .select(`
      id,
      title,
      description,
      listing_type,
      quantity,
      unit,
      price_per_unit,
      total_price,
      starting_bid,
      current_highest_bid,
      min_increment,
      auction_ends_at,
      city,
      province,
      address,
      status,
      created_at,
      seller_id,
      categories (
        name,
        urdu_name
      ),
      profiles:seller_id (
        full_name,
        phone,
        city,
        province
      ),
      bids (
        id,
        amount,
        created_at,
        bidder:bidder_id (
          full_name
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !listing) {
    notFound();
  }

  const isAuction = listing.listing_type === "auction";
  const categoryData = Array.isArray(listing.categories) ? listing.categories[0] : listing.categories;
  const sellerData = Array.isArray(listing.profiles) ? listing.profiles[0] : listing.profiles;
  const isOwner = user?.id === listing.seller_id;
  const unitDisplay = unitLabels[listing.unit] || listing.unit;

  const currentPrice = isAuction
    ? listing.current_highest_bid || listing.starting_bid || 0
    : listing.price_per_unit || 0;

  const minNextBid = isAuction ? currentPrice + (listing.min_increment || 100) : 0;

  interface BidRecord {
    id: string;
    amount: number;
    created_at: string;
    bidder?: { full_name?: string } | { full_name?: string }[];
  }

  const sortedBids = ((listing.bids || []) as unknown as BidRecord[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Link */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild className="rounded-xl border">
          <Link href="/dashboard/listings">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <span className="text-sm font-medium text-muted-foreground">Back to Marketplace</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isAuction
                    ? "bg-harvest-100 text-harvest-800 dark:bg-harvest-950/40 dark:text-harvest-300"
                    : "bg-brand-100 text-brand-800 dark:bg-brand-950/40 dark:text-brand-300"
                }`}
              >
                {isAuction ? <Gavel className="size-3" /> : <Tag className="size-3" />}
                {isAuction ? "Live Auction (نیلامی)" : "Fixed Price Sale (مقررہ قیمت)"}
              </span>

              <span className="text-xs font-medium text-muted-foreground">
                {categoryData?.urdu_name} • {categoryData?.name}
              </span>
            </div>

            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {listing.title}
              </h1>
              <p className="mt-2 text-base font-semibold text-brand-700 dark:text-brand-300">
                {listing.quantity} {unitDisplay} available
              </p>
            </div>

            <div className="pt-4 border-t space-y-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Produce Specifications & Terms
              </h2>
              <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Location */}
            <div className="pt-4 border-t space-y-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Origin / Mandi Location
              </h2>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="size-4 text-brand-600 shrink-0" />
                <span>
                  {listing.address ? `${listing.address}, ` : ""}
                  {listing.city}, {listing.province}
                </span>
              </div>
            </div>
          </div>

          {/* Bidding History for Auctions */}
          {isAuction && (
            <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="font-heading text-base font-semibold">Bidding History (بولی کا ریکارڈ)</h2>
                <span className="text-xs text-muted-foreground">{sortedBids.length} bid(s)</span>
              </div>

              {sortedBids.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">
                  No bids placed yet. Be the first to place a bid!
                </p>
              ) : (
                <div className="space-y-2.5">
                  {sortedBids.map((b, index: number) => {
                    const bidderInfo = Array.isArray(b.bidder) ? b.bidder[0] : b.bidder;
                    return (
                      <div
                        key={b.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {bidderInfo?.full_name || "AgroBid Bidder"}
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-200">
                              Highest Bid
                            </span>
                          )}
                        </div>
                        <span className="font-heading font-bold text-sm text-foreground">
                          PKR {b.amount.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Price & Actions */}
        <div className="space-y-6">
          <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-6 sticky top-20">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                {isAuction ? "Current Highest Bid" : "Price per Unit"}
              </span>
              <div className="font-heading text-3xl font-extrabold text-foreground mt-1">
                PKR {currentPrice.toLocaleString()}
                {!isAuction && <span className="text-xs font-normal text-muted-foreground"> / {unitDisplay}</span>}
              </div>

              {!isAuction && listing.total_price && (
                <p className="text-xs font-medium text-brand-700 dark:text-brand-300 mt-1">
                  Total Lot Value: PKR {listing.total_price.toLocaleString()}
                </p>
              )}
            </div>

            {isAuction && listing.auction_ends_at && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-harvest-500/10 border border-harvest-500/20 text-harvest-800 dark:text-harvest-300 text-xs font-medium">
                <Clock className="size-4 shrink-0" />
                <span>Ends: {new Date(listing.auction_ends_at).toLocaleString()}</span>
              </div>
            )}

            {/* Action Box */}
            {isAuction ? (
              isOwner ? (
                <div className="p-4 rounded-2xl bg-muted text-center text-xs text-muted-foreground">
                  You are the owner of this listing. Bidding is disabled for your own lot.
                </div>
              ) : (
                <BidForm listingId={listing.id} minNextBid={minNextBid} />
              )
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/50 space-y-2">
                  <span className="text-xs font-semibold text-brand-900 dark:text-brand-200 block">
                    Contact Seller Directly
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Call the farmer directly to discuss transport, inspection, and payment terms.
                  </p>
                </div>

                {sellerData?.phone && (
                  <Button asChild className="w-full h-11 rounded-xl font-semibold">
                    <a href={`tel:${sellerData.phone}`}>
                      <Phone className="size-4 mr-2" />
                      Call Farmer ({sellerData.phone})
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Seller Information */}
            <div className="pt-4 border-t space-y-3">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Farmer / Trader
              </span>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-sm">
                  {sellerData?.full_name?.charAt(0).toUpperCase() || "F"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {sellerData?.full_name || "AgroBid Seller"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sellerData?.city}, {sellerData?.province}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
