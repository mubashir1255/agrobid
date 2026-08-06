/**
 * @file src/components/business/auction-status-badge.tsx
 * @description Accessible status badge for auction lifecycle states.
 *
 * Responsibilities:
 *  - Communicate auction state (draft → sold) with brand colors and icons
 *  - Pulse live/closing-soon states for urgency
 *  - Allow label override and optional icon suppression
 */

import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import {
  Flame,
  Clock,
  CheckCircle2,
  XCircle,
  PlayCircle,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AuctionStatusType =
  | "draft"
  | "scheduled"
  | "active"
  | "closing_soon"
  | "closed"
  | "cancelled"
  | "sold";

export interface AuctionStatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: AuctionStatusType;
  /** Custom text override */
  label?: string;
  showIcon?: boolean;
}

const statusConfig: Record<
  AuctionStatusType,
  {
    variant: BadgeProps["variant"];
    defaultLabel: string;
    icon: React.ReactNode;
    dot?: boolean;
    pulse?: boolean;
  }
> = {
  draft: {
    variant: "outline",
    defaultLabel: "Draft",
    icon: <Clock className="h-3 w-3" />,
  },
  scheduled: {
    variant: "secondary",
    defaultLabel: "Scheduled",
    icon: <PlayCircle className="h-3 w-3" />,
  },
  active: {
    variant: "success",
    defaultLabel: "Live Bidding",
    icon: <PlayCircle className="h-3 w-3" />,
    dot: true,
    pulse: true,
  },
  closing_soon: {
    variant: "harvest",
    defaultLabel: "Closing Soon",
    icon: <Flame className="h-3 w-3" />,
    dot: true,
    pulse: true,
  },
  closed: {
    variant: "outline",
    defaultLabel: "Ended",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  cancelled: {
    variant: "destructive",
    defaultLabel: "Cancelled",
    icon: <XCircle className="h-3 w-3" />,
  },
  sold: {
    variant: "default",
    defaultLabel: "Sold",
    icon: <CheckCheck className="h-3 w-3" />,
  },
};

export function AuctionStatusBadge({
  status,
  label,
  showIcon = true,
  className,
  size = "default",
  ...props
}: AuctionStatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.draft;
  const displayLabel = label ?? config.defaultLabel;

  return (
    <Badge
      variant={config.variant}
      size={size}
      dot={config.dot}
      pulse={config.pulse}
      className={cn("gap-1 font-semibold tracking-wide", className)}
      {...props}
    >
      {showIcon ? <span className="shrink-0">{config.icon}</span> : null}
      <span>{displayLabel}</span>
    </Badge>
  );
}
