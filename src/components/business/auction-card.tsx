/**
 * @file src/components/business/auction-card.tsx
 * @description Primary marketplace card for livestock and machinery auctions.
 *
 * Responsibilities:
 *  - Show listing media, title, location, current bid, and bid count
 *  - Embed countdown + status/verification badges
 *  - Expose bid, bookmark, and view-details callbacks (no hardcoded data)
 */

"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AuctionStatusBadge,
  type AuctionStatusType,
} from "@/components/business/auction-status-badge";
import {
  VerificationBadge,
  type VerificationType,
} from "@/components/business/verification-badge";
import { CountdownTimer } from "@/components/business/countdown-timer";
import { formatPKR } from "@/utils/format";
import { MapPin, Heart, Gavel, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuctionCardData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  location: string;
  currentBid: number;
  startingPrice: number;
  bidCount: number;
  endsAt: string | Date;
  status: AuctionStatusType;
  verificationType?: VerificationType;
  isBookmarked?: boolean;
}

export interface AuctionCardProps {
  auction: AuctionCardData;
  onBidClick?: (auctionId: string) => void;
  onBookmarkToggle?: (auctionId: string, nextValue: boolean) => void;
  onViewDetails?: (auctionId: string) => void;
  onExpire?: (auctionId: string) => void;
  className?: string;
}

const BIDDABLE_STATUSES: AuctionStatusType[] = ["active", "closing_soon"];

export function AuctionCard({
  auction,
  onBidClick,
  onBookmarkToggle,
  onViewDetails,
  onExpire,
  className,
}: AuctionCardProps) {
  const [bookmarked, setBookmarked] = React.useState(
    Boolean(auction.isBookmarked)
  );

  React.useEffect(() => {
    setBookmarked(Boolean(auction.isBookmarked));
  }, [auction.isBookmarked]);

  const canBid = BIDDABLE_STATUSES.includes(auction.status);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarked;
    setBookmarked(next);
    onBookmarkToggle?.(auction.id, next);
  };

  return (
    <Card
      interactive={Boolean(onViewDetails)}
      className={cn(
        "group overflow-hidden flex flex-col h-full border-border/80 hover:shadow-lg",
        className
      )}
      onClick={() => onViewDetails?.(auction.id)}
      role={onViewDetails ? "button" : undefined}
      tabIndex={onViewDetails ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onViewDetails) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails(auction.id);
        }
      }}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        <Image
          src={auction.imageUrl}
          alt={auction.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <AuctionStatusBadge status={auction.status} size="sm" />
          {onBookmarkToggle ? (
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={handleBookmark}
              className={cn(
                "rounded-full glass hover:bg-white/80 dark:hover:bg-black/80 transition-colors",
                bookmarked && "text-destructive"
              )}
              aria-label={
                bookmarked ? "Remove from watchlist" : "Add to watchlist"
              }
              aria-pressed={bookmarked}
            >
              <Heart className={cn("h-4 w-4", bookmarked && "fill-current")} />
            </Button>
          ) : null}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 text-white">
          <div className="flex items-center gap-1 text-xs font-medium drop-shadow-xs min-w-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary-foreground" />
            <span className="truncate">{auction.location}</span>
          </div>
          {auction.verificationType ? (
            <VerificationBadge type={auction.verificationType} compact />
          ) : null}
        </div>
      </div>

      <CardHeader className="p-4 pb-2 space-y-1.5 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          {auction.category}
        </span>
        <h3 className="font-heading font-bold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {auction.title}
        </h3>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-end justify-between gap-2 pt-2 border-t border-border/60">
          <div className="min-w-0">
            <span className="text-[11px] font-medium text-muted-foreground block">
              Current Highest Bid
            </span>
            <span className="font-mono text-lg font-bold text-foreground truncate block">
              {formatPKR(auction.currentBid)}
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-medium text-muted-foreground block">
              {auction.bidCount} {auction.bidCount === 1 ? "bid" : "bids"}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              Start: {formatPKR(auction.startingPrice)}
            </span>
          </div>
        </div>

        {canBid ? (
          <CountdownTimer
            targetDate={auction.endsAt}
            variant="compact"
            className="w-full justify-center"
            onExpire={() => onExpire?.(auction.id)}
          />
        ) : null}
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          variant="default"
          size="sm"
          fullWidth
          disabled={!canBid || !onBidClick}
          onClick={(e) => {
            e.stopPropagation();
            onBidClick?.(auction.id);
          }}
          leftIcon={<Gavel className="h-4 w-4" />}
        >
          {canBid ? "Place Bid" : "Bidding Closed"}
        </Button>
        {onViewDetails ? (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(auction.id);
            }}
            aria-label="View auction details"
          >
            <Eye className="h-4 w-4" />
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
