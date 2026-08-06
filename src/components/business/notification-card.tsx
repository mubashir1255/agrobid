/**
 * @file src/components/business/notification-card.tsx
 * @description Notification feed item for alerts, bids, and system messages.
 *
 * Responsibilities:
 *  - Render typed notification with unread indicator
 *  - Support action CTA and dismiss callbacks
 *  - Distinguish read vs unread visual states
 */

"use client";

import * as React from "react";
import { formatRelativeTime } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Gavel, Bell, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType =
  | "bid_won"
  | "outbid"
  | "payment"
  | "system"
  | "warning";

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string | Date;
  isRead?: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationCardProps {
  notification: NotificationData;
  onRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onActionClick?: (notification: NotificationData) => void;
  className?: string;
}

const typeIcons: Record<
  NotificationType,
  { icon: React.ReactNode; colorClass: string }
> = {
  bid_won: {
    icon: <Gavel className="h-4 w-4" />,
    colorClass: "bg-success/15 text-success dark:bg-success/20",
  },
  outbid: {
    icon: <AlertTriangle className="h-4 w-4" />,
    colorClass:
      "bg-harvest-500/15 text-harvest-950 dark:bg-harvest-500/20 dark:text-harvest-100",
  },
  payment: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    colorClass: "bg-primary/15 text-primary dark:bg-primary/20",
  },
  system: {
    icon: <Bell className="h-4 w-4" />,
    colorClass: "bg-muted text-muted-foreground",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    colorClass: "bg-destructive/15 text-destructive dark:bg-destructive/20",
  },
};

export function NotificationCard({
  notification,
  onRead,
  onDismiss,
  onActionClick,
  className,
}: NotificationCardProps) {
  const config = typeIcons[notification.type] ?? typeIcons.system;

  return (
    <div
      onClick={() => onRead?.(notification.id)}
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200",
        onRead && "cursor-pointer",
        notification.isRead
          ? "bg-card border-border/60 opacity-85"
          : "bg-primary/5 border-primary/30 dark:bg-primary/10 shadow-2xs",
        className
      )}
      role={onRead ? "button" : undefined}
      tabIndex={onRead ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onRead) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRead(notification.id);
        }
      }}
    >
      <div className="relative shrink-0">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl border border-border/40",
            config.colorClass
          )}
        >
          {config.icon}
        </div>
        {!notification.isRead ? (
          <span
            className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background animate-pulse"
            aria-label="Unread"
          />
        ) : null}
      </div>

      <div className={cn("space-y-1 flex-1 min-w-0", onDismiss && "pr-6")}>
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-heading text-sm font-semibold text-foreground line-clamp-1">
            {notification.title}
          </h4>
          <span className="text-[11px] text-muted-foreground shrink-0 font-mono pt-0.5">
            {formatRelativeTime(notification.timestamp)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {notification.message}
        </p>

        {notification.actionLabel && onActionClick ? (
          <div className="pt-1.5">
            <Button
              size="xs"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onActionClick(notification);
              }}
            >
              {notification.actionLabel}
            </Button>
          </div>
        ) : null}
      </div>

      {onDismiss ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(notification.id);
          }}
          aria-label="Dismiss notification"
          className="absolute top-3.5 right-3 text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}
