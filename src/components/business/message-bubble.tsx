/**
 * @file src/components/business/message-bubble.tsx
 * @description Chat / negotiation message bubble for buyer–seller messaging.
 *
 * Responsibilities:
 *  - Align sent vs received messages with distinct surfaces
 *  - Show sender, timestamp, delivery/read status
 *  - Optional embedded price-offer card with accept/reject actions
 */

"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  formatPKR,
  formatDateTime,
  getInitials,
} from "@/utils/format";
import { Check, CheckCheck, Gavel } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PriceOfferAttachment {
  title: string;
  pricePKR: number;
  quantity: string;
  status?: "pending" | "accepted" | "rejected";
}

export interface MessageBubbleProps {
  id: string;
  senderName: string;
  senderAvatarUrl?: string;
  text: string;
  timestamp: string | Date;
  isSentByMe: boolean;
  status?: "sent" | "delivered" | "read";
  offerAttachment?: PriceOfferAttachment;
  onAcceptOffer?: (messageId: string) => void;
  onRejectOffer?: (messageId: string) => void;
  className?: string;
}

export function MessageBubble({
  id,
  senderName,
  senderAvatarUrl,
  text,
  timestamp,
  isSentByMe,
  status = "delivered",
  offerAttachment,
  onAcceptOffer,
  onRejectOffer,
  className,
}: MessageBubbleProps) {
  const offerPending =
    !isSentByMe &&
    offerAttachment?.status === "pending" &&
    Boolean(onAcceptOffer || onRejectOffer);

  return (
    <div
      className={cn(
        "flex gap-2.5 sm:gap-3 max-w-[90%] sm:max-w-[80%] md:max-w-[75%]",
        isSentByMe ? "ml-auto flex-row-reverse" : "mr-auto flex-row",
        className
      )}
    >
      <Avatar
        src={senderAvatarUrl}
        alt={senderName}
        fallback={getInitials(senderName)}
        size="sm"
        className="mt-1"
      />

      <div className="space-y-1 min-w-0">
        <div
          className={cn(
            "flex items-center gap-2 px-1 text-xs text-muted-foreground flex-wrap",
            isSentByMe && "justify-end"
          )}
        >
          <span className="font-semibold text-foreground">{senderName}</span>
          <span aria-hidden>•</span>
          <time
            dateTime={new Date(timestamp).toISOString()}
            className="font-mono text-[11px]"
          >
            {formatDateTime(timestamp)}
          </time>
        </div>

        <div
          className={cn(
            "p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed shadow-2xs space-y-3",
            isSentByMe
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card border border-border text-card-foreground rounded-tl-sm"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{text}</p>

          {offerAttachment ? (
            <div
              className={cn(
                "p-3 rounded-xl border text-xs space-y-2",
                isSentByMe
                  ? "bg-black/10 border-white/20 text-white dark:bg-black/30"
                  : "bg-muted/60 border-border text-foreground"
              )}
            >
              <div className="flex items-start justify-between gap-2 font-semibold">
                <span className="flex items-center gap-1.5 min-w-0">
                  <Gavel className="h-3.5 w-3.5 shrink-0" />
                  <span className="line-clamp-2">{offerAttachment.title}</span>
                </span>
                <span className="font-mono font-bold text-sm shrink-0">
                  {formatPKR(offerAttachment.pricePKR)}
                </span>
              </div>
              <p className="text-[11px] opacity-80">
                Quantity: {offerAttachment.quantity}
              </p>

              {offerAttachment.status && offerAttachment.status !== "pending" ? (
                <p
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-wide",
                    offerAttachment.status === "accepted"
                      ? "text-emerald-300 dark:text-emerald-200"
                      : "opacity-70"
                  )}
                >
                  Offer {offerAttachment.status}
                </p>
              ) : null}

              {offerPending ? (
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  {onAcceptOffer ? (
                    <Button
                      type="button"
                      size="xs"
                      variant="harvest"
                      className="flex-1"
                      onClick={() => onAcceptOffer(id)}
                    >
                      Accept Offer
                    </Button>
                  ) : null}
                  {onRejectOffer ? (
                    <Button
                      type="button"
                      size="xs"
                      variant={isSentByMe ? "ghost" : "outline"}
                      className="flex-1"
                      onClick={() => onRejectOffer(id)}
                    >
                      Decline
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {isSentByMe ? (
            <div
              className="flex justify-end text-primary-foreground/70 text-[10px] pt-0.5"
              aria-label={`Message ${status}`}
            >
              {status === "read" ? (
                <CheckCheck className="h-3.5 w-3.5 text-white" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
