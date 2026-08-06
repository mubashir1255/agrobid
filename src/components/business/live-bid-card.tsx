/**
 * @file src/components/business/live-bid-card.tsx
 * @description Real-time bid entry row for live auction feeds.
 *
 * Responsibilities:
 *  - Render bidder identity, amount (PKR), and relative time
 *  - Highlight highest / winning / won vs outbid states
 *  - Optional new-bid pulse and click handler
 */

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatPKR, formatRelativeTime, getInitials } from "@/utils/format";
import { Trophy, ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type LiveBidStatus = "highest" | "outbid" | "winning" | "won";

export interface LiveBidData {
  id: string;
  bidderName: string;
  bidderLocation: string;
  bidderAvatarUrl?: string;
  amountPKR: number;
  timestamp: string | Date;
  status: LiveBidStatus;
  isNew?: boolean;
}

export interface LiveBidCardProps {
  bid: LiveBidData;
  onClick?: (bidId: string) => void;
  className?: string;
}

const statusLabel: Record<LiveBidStatus, string> = {
  highest: "Current Lead",
  winning: "Winning",
  won: "Won",
  outbid: "Outbid",
};

export function LiveBidCard({ bid, onClick, className }: LiveBidCardProps) {
  const isLead =
    bid.status === "highest" ||
    bid.status === "winning" ||
    bid.status === "won";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-300",
        isLead
          ? "bg-primary/10 border-primary/40 dark:bg-primary/15 shadow-xs"
          : "bg-card border-border/60 text-muted-foreground",
        bid.isNew && "animate-pulse ring-2 ring-primary/50",
        onClick && "cursor-pointer hover:border-primary/50",
        className
      )}
      onClick={() => onClick?.(bid.id)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(bid.id);
        }
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar
          src={bid.bidderAvatarUrl}
          alt={bid.bidderName}
          fallback={getInitials(bid.bidderName)}
          size="md"
        />

        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-heading font-semibold text-sm text-foreground truncate">
              {bid.bidderName}
            </span>
            {isLead ? (
              <Badge variant="success" size="sm" className="px-1.5 text-[10px]">
                <Trophy className="h-2.5 w-2.5 mr-0.5" />
                {bid.status === "won" ? "Won" : "Highest"}
              </Badge>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
            <span className="truncate">{bid.bidderLocation}</span>
            <span aria-hidden>•</span>
            <Clock className="h-3 w-3 shrink-0" />
            <span className="shrink-0">{formatRelativeTime(bid.timestamp)}</span>
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="flex items-center justify-end gap-1 font-mono font-bold text-sm sm:text-base text-foreground">
          <span>{formatPKR(bid.amountPKR)}</span>
          <ArrowUpRight
            className={cn(
              "h-4 w-4",
              isLead ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        <span className="text-[10px] text-muted-foreground uppercase font-semibold">
          {statusLabel[bid.status]}
        </span>
      </div>
    </div>
  );
}
