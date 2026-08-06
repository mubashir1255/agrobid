/**
 * @file src/components/business/crop-card.tsx
 * @description Marketplace card for crop harvest lots and wholesale sales.
 *
 * Responsibilities:
 *  - Show crop variety, quantity (munds), unit price, and total estimate
 *  - Surface quality grade and seller verification
 *  - Trigger buy/offer and view-details actions via props
 */

"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  QualityBadge,
  type QualityGradeType,
} from "@/components/business/quality-badge";
import {
  VerificationBadge,
  type VerificationType,
} from "@/components/business/verification-badge";
import { formatPKR, formatDate, formatNumber } from "@/utils/format";
import { MapPin, Calendar, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CropCardData {
  id: string;
  title: string;
  cropType: string;
  imageUrl: string;
  quantityMunds: number;
  pricePerMund: number;
  qualityGrade: QualityGradeType;
  location: string;
  harvestDate: string | Date;
  sellerName: string;
  verificationType?: VerificationType;
  isDirectSale?: boolean;
}

export interface CropCardProps {
  crop: CropCardData;
  onBuyOrBidClick?: (cropId: string) => void;
  onViewDetails?: (cropId: string) => void;
  className?: string;
}

export function CropCard({
  crop,
  onBuyOrBidClick,
  onViewDetails,
  className,
}: CropCardProps) {
  const totalPrice = crop.quantityMunds * crop.pricePerMund;

  return (
    <Card
      interactive={Boolean(onViewDetails)}
      className={cn(
        "group overflow-hidden flex flex-col h-full border-border/80 hover:shadow-lg",
        className
      )}
      onClick={() => onViewDetails?.(crop.id)}
      role={onViewDetails ? "button" : undefined}
      tabIndex={onViewDetails ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onViewDetails) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails(crop.id);
        }
      }}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={crop.imageUrl}
          alt={crop.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <QualityBadge grade={crop.qualityGrade} />
          {crop.verificationType ? (
            <VerificationBadge type={crop.verificationType} compact />
          ) : null}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 text-white text-xs">
          <div className="flex items-center gap-1 font-medium drop-shadow-xs min-w-0">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary-foreground" />
            <span className="truncate">{crop.location}</span>
          </div>
          <span className="bg-black/50 px-2 py-0.5 rounded-full text-[11px] backdrop-blur-xs font-mono shrink-0">
            {formatNumber(crop.quantityMunds)} Munds
          </span>
        </div>
      </div>

      <CardHeader className="p-4 pb-2 space-y-1.5 flex-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-harvest-600 dark:text-harvest-400">
            {crop.cropType}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3 shrink-0" />
            <span>Harvest: {formatDate(crop.harvestDate)}</span>
          </div>
        </div>
        <h3 className="font-heading font-bold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {crop.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          Seller: {crop.sellerName}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
              Price per Mund
            </span>
            <span className="font-mono font-bold text-foreground">
              {formatPKR(crop.pricePerMund)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
              Total Est. Value
            </span>
            <span className="font-mono font-bold text-primary">
              {formatPKR(totalPrice)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          variant="harvest"
          size="sm"
          fullWidth
          disabled={!onBuyOrBidClick}
          onClick={(e) => {
            e.stopPropagation();
            onBuyOrBidClick?.(crop.id);
          }}
          leftIcon={<ShoppingCart className="h-4 w-4" />}
        >
          {crop.isDirectSale ? "Buy Whole Lot" : "Submit Crop Offer"}
        </Button>
        {onViewDetails ? (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(crop.id);
            }}
            aria-label="View crop details"
          >
            <Eye className="h-4 w-4" />
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
