/**
 * @file src/components/business/price-card.tsx
 * @description Bidding widget for auction detail pages.
 *
 * Responsibilities:
 *  - Show current bid, starting price, reserve status, and bid count
 *  - Accept custom bid amount with quick increments
 *  - Optional Buy-It-Now CTA
 */

"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPKR } from "@/utils/format";
import { Gavel, ShieldCheck, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PriceCardProps {
  currentBidPKR: number;
  startingPricePKR: number;
  minIncrementPKR?: number;
  reservePriceMet?: boolean;
  buyNowPricePKR?: number;
  totalBidsCount?: number;
  quickIncrementsPKR?: readonly number[];
  onPlaceBid?: (amountPKR: number) => void;
  onBuyNow?: () => void;
  isBiddingDisabled?: boolean;
  className?: string;
}

export function PriceCard({
  currentBidPKR,
  startingPricePKR,
  minIncrementPKR = 1000,
  reservePriceMet = true,
  buyNowPricePKR,
  totalBidsCount = 0,
  quickIncrementsPKR = [1000, 5000, 10000],
  onPlaceBid,
  onBuyNow,
  isBiddingDisabled = false,
  className,
}: PriceCardProps) {
  const nextMinBid = currentBidPKR + minIncrementPKR;
  const [customBid, setCustomBid] = React.useState(String(nextMinBid));

  React.useEffect(() => {
    setCustomBid(String(nextMinBid));
  }, [nextMinBid]);

  const numericBid = Number(customBid);
  const isValidBid = Number.isFinite(numericBid) && numericBid >= nextMinBid;

  const handleIncrement = (increment: number) => {
    const base = Number.isFinite(numericBid) ? numericBid : nextMinBid;
    setCustomBid(String(base + increment));
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidBid && onPlaceBid) {
      onPlaceBid(numericBid);
    }
  };

  return (
    <Card
      className={cn(
        "border-border shadow-md bg-card overflow-hidden h-full",
        className
      )}
    >
      <CardHeader className="bg-muted/40 p-5 border-b border-border space-y-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Auction Lead Price
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {totalBidsCount} {totalBidsCount === 1 ? "bid" : "bids"} placed
          </span>
        </div>

        <span className="font-mono text-2xl sm:text-3xl font-extrabold text-primary tracking-tight block">
          {formatPKR(currentBidPKR)}
        </span>

        <div className="flex items-center justify-between gap-2 text-xs pt-1 flex-wrap">
          <span className="text-muted-foreground">
            Starting:{" "}
            <span className="font-mono font-medium text-foreground">
              {formatPKR(startingPricePKR)}
            </span>
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 font-semibold",
              reservePriceMet
                ? "text-success"
                : "text-warning-foreground"
            )}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {reservePriceMet ? "Reserve Met" : "Reserve Unmet"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        <form onSubmit={handleBidSubmit} className="space-y-3">
          <Input
            label="Your Bid Amount (PKR)"
            type="number"
            value={customBid}
            onChange={(e) => setCustomBid(e.target.value)}
            min={nextMinBid}
            step={minIncrementPKR}
            disabled={isBiddingDisabled || !onPlaceBid}
            helperText={`Minimum next bid: ${formatPKR(nextMinBid)}`}
            required
          />

          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] text-muted-foreground w-full flex items-center gap-1">
              <Info className="h-3 w-3 shrink-0" /> Quick Add Increments:
            </span>
            {quickIncrementsPKR.map((increment) => (
              <Button
                key={increment}
                type="button"
                variant="outline"
                size="xs"
                onClick={() => handleIncrement(increment)}
                disabled={isBiddingDisabled || !onPlaceBid}
              >
                +{increment.toLocaleString("en-PK")} PKR
              </Button>
            ))}
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            disabled={isBiddingDisabled || !onPlaceBid || !isValidBid}
            leftIcon={<Gavel className="h-5 w-5" />}
          >
            Submit Bid
          </Button>
        </form>

        {buyNowPricePKR !== undefined ? (
          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-harvest-500 fill-harvest-500" />
                Instant Purchase
              </span>
              <span className="font-mono font-bold text-sm text-foreground">
                {formatPKR(buyNowPricePKR)}
              </span>
            </div>
            <Button
              variant="harvest"
              size="default"
              fullWidth
              onClick={onBuyNow}
              disabled={isBiddingDisabled || !onBuyNow}
            >
              Buy It Now
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
