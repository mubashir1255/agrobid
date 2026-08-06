/**
 * @file src/components/business/buyer-card.tsx
 * @description Profile summary card for verified buyers and commercial traders.
 *
 * Responsibilities:
 *  - Display buyer identity, company, verification, and trust score
 *  - Present bidding activity stats
 *  - Trigger contact / view-profile callbacks
 */

"use client";

import * as React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, type UserStatus } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  VerificationBadge,
  type VerificationType,
} from "@/components/business/verification-badge";
import { getInitials, clamp } from "@/utils/format";
import { Building2, MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BuyerCardData {
  id: string;
  name: string;
  companyName: string;
  avatarUrl?: string;
  location: string;
  status?: UserStatus;
  verificationType?: VerificationType;
  totalBidsPlaced: number;
  purchasesCompleted: number;
  trustScorePercentage: number;
  preferredCategories?: string[];
}

export interface BuyerCardProps {
  buyer: BuyerCardData;
  onContactClick?: (buyerId: string) => void;
  onViewProfile?: (buyerId: string) => void;
  className?: string;
}

export function BuyerCard({
  buyer,
  onContactClick,
  onViewProfile,
  className,
}: BuyerCardProps) {
  const trustScore = clamp(buyer.trustScorePercentage, 0, 100);

  return (
    <Card
      interactive={Boolean(onViewProfile)}
      className={cn(
        "flex flex-col h-full border-border/80 hover:shadow-md",
        className
      )}
      onClick={() => onViewProfile?.(buyer.id)}
      role={onViewProfile ? "button" : undefined}
      tabIndex={onViewProfile ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onViewProfile) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewProfile(buyer.id);
        }
      }}
    >
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start gap-3.5">
          <Avatar
            src={buyer.avatarUrl}
            alt={buyer.name}
            fallback={getInitials(buyer.name)}
            size="lg"
            status={buyer.status}
          />

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-heading font-bold text-base text-foreground truncate">
                {buyer.name}
              </h3>
              {buyer.verificationType ? (
                <VerificationBadge type={buyer.verificationType} compact />
              ) : null}
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
              <Building2 className="h-3 w-3 shrink-0 text-harvest-600 dark:text-harvest-400" />
              <span>{buyer.companyName}</span>
            </p>

            <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>{buyer.location}</span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-2 space-y-3 flex-1">
        <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 space-y-1.5 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground font-medium flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0" />
              <span>Buyer Trust Rating</span>
            </span>
            <span className="font-mono font-bold text-success">{trustScore}%</span>
          </div>
          <div
            className="h-1.5 w-full bg-muted rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={trustScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Buyer trust score"
          >
            <div
              className="h-full bg-success rounded-full transition-all duration-500"
              style={{ width: `${trustScore}%` }}
            />
          </div>
        </div>

        {buyer.preferredCategories && buyer.preferredCategories.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {buyer.preferredCategories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide bg-muted text-muted-foreground border border-border/60"
              >
                {category}
              </span>
            ))}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-card border border-border">
            <span className="font-mono text-base font-bold text-foreground block">
              {buyer.totalBidsPlaced}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
              Bids Placed
            </span>
          </div>
          <div className="p-2 rounded-lg bg-card border border-border">
            <span className="font-mono text-base font-bold text-primary block">
              {buyer.purchasesCompleted}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
              Purchases
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          disabled={!onContactClick}
          onClick={(e) => {
            e.stopPropagation();
            onContactClick?.(buyer.id);
          }}
          leftIcon={<MessageSquare className="h-4 w-4" />}
        >
          Contact Buyer
        </Button>
      </CardFooter>
    </Card>
  );
}
