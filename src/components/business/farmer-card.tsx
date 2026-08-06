/**
 * @file src/components/business/farmer-card.tsx
 * @description Profile summary card for registered farmers and agricultural sellers.
 *
 * Responsibilities:
 *  - Display identity, farm, location, verification, and star rating
 *  - Surface listing/sales stats
 *  - Trigger contact / view-profile / call actions via props
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
import { getInitials } from "@/utils/format";
import { MapPin, Star, MessageSquare, PhoneCall, Tractor } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FarmerCardData {
  id: string;
  name: string;
  farmName: string;
  avatarUrl?: string;
  location: string;
  status?: UserStatus;
  verificationType?: VerificationType;
  rating: number;
  reviewCount: number;
  activeListingsCount: number;
  totalSalesCount: number;
  phone?: string;
  memberSinceYear?: number;
}

export interface FarmerCardProps {
  farmer: FarmerCardData;
  onContactClick?: (farmerId: string) => void;
  onCallClick?: (farmerId: string, phone: string) => void;
  onViewProfile?: (farmerId: string) => void;
  className?: string;
}

export function FarmerCard({
  farmer,
  onContactClick,
  onCallClick,
  onViewProfile,
  className,
}: FarmerCardProps) {
  const rating = Math.min(5, Math.max(0, farmer.rating));

  return (
    <Card
      interactive={Boolean(onViewProfile)}
      className={cn(
        "flex flex-col h-full border-border/80 hover:shadow-md",
        className
      )}
      onClick={() => onViewProfile?.(farmer.id)}
      role={onViewProfile ? "button" : undefined}
      tabIndex={onViewProfile ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onViewProfile) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewProfile(farmer.id);
        }
      }}
    >
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start gap-3.5">
          <Avatar
            src={farmer.avatarUrl}
            alt={farmer.name}
            fallback={getInitials(farmer.name)}
            size="lg"
            status={farmer.status}
          />

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-heading font-bold text-base text-foreground truncate">
                {farmer.name}
              </h3>
              {farmer.verificationType ? (
                <VerificationBadge type={farmer.verificationType} compact />
              ) : null}
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
              <Tractor className="h-3 w-3 shrink-0 text-primary" />
              <span>{farmer.farmName}</span>
            </p>

            <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>{farmer.location}</span>
            </p>

            {farmer.memberSinceYear ? (
              <p className="text-[11px] text-muted-foreground">
                Member since {farmer.memberSinceYear}
              </p>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-2 space-y-3 flex-1">
        <div className="flex items-center justify-between gap-2 text-xs p-2 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-center gap-1 min-w-0">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-bold font-mono text-foreground">
              {rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground truncate">
              ({farmer.reviewCount} reviews)
            </span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] shrink-0">
            {farmer.totalSalesCount}+ Deals
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-card border border-border">
            <span className="font-mono text-base font-bold text-primary block">
              {farmer.activeListingsCount}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
              Active Listings
            </span>
          </div>
          <div className="p-2 rounded-lg bg-card border border-border">
            <span className="font-mono text-base font-bold text-foreground block">
              {farmer.totalSalesCount}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
              Total Sales
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3 gap-2">
        <Button
          variant="default"
          size="sm"
          fullWidth
          disabled={!onContactClick}
          onClick={(e) => {
            e.stopPropagation();
            onContactClick?.(farmer.id);
          }}
          leftIcon={<MessageSquare className="h-4 w-4" />}
        >
          Message Farmer
        </Button>
        {farmer.phone ? (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onCallClick) {
                onCallClick(farmer.id, farmer.phone!);
              } else {
                window.location.href = `tel:${farmer.phone}`;
              }
            }}
            aria-label="Call farmer"
          >
            <PhoneCall className="h-4 w-4" />
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
