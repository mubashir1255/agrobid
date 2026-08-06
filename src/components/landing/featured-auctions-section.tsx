/**
 * @file src/components/landing/featured-auctions-section.tsx
 * @description Featured live auctions grid — reuses AuctionCard + landing mock data.
 */

"use client";

import Link from "next/link";
import { Section, SectionHeader } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { AuctionCard } from "@/components/business/auction-card";
import { LANDING_FEATURED_AUCTIONS } from "@/constants/landing";
import { toast } from "@/components/ui/toast";
import { ArrowRight } from "lucide-react";

export function FeaturedAuctionsSection() {
  return (
    <Section
      id="featured-auctions"
      aria-label="Featured auctions"
      variant="muted"
    >
      <SectionHeader
        eyebrow="Live marketplace"
        title="Featured auctions"
        description="Browse active livestock and machinery lots with verified sellers and live countdowns."
        align="left"
        cta={
          <Button asChild variant="outline" size="sm">
            <Link href="/auctions">
              View all auctions
              <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {LANDING_FEATURED_AUCTIONS.map((auction) => (
          <AuctionCard
            key={auction.id}
            auction={auction}
            onBidClick={(id) =>
              toast.success(`Opening bid sheet for ${id}`)
            }
            onBookmarkToggle={(id, next) =>
              toast.info(
                next ? `Watching ${id}` : `Removed ${id} from watchlist`
              )
            }
            onViewDetails={(id) => toast.info(`Auction detail: ${id}`)}
          />
        ))}
      </div>
    </Section>
  );
}
