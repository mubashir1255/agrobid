/**
 * @file src/components/business/review-card.tsx
 * @description Feedback & rating review card for farmers, sellers, or crop quality.
 *
 * Responsibilities:
 *  - Render reviewer identity, verified purchase badge, stars, and date
 *  - Show purchased item title and comment body
 *  - Helpful vote CTA (controlled or local)
 */

"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate, getInitials, clamp } from "@/utils/format";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReviewData {
  id: string;
  reviewerName: string;
  reviewerAvatarUrl?: string;
  isVerifiedBuyer?: boolean;
  rating: number;
  date: string | Date;
  itemPurchasedTitle?: string;
  comment: string;
  helpfulCount?: number;
}

export interface ReviewCardProps {
  review: ReviewData;
  onHelpfulClick?: (reviewId: string) => void;
  /** When true, helpful vote was already cast by the current user */
  hasVotedHelpful?: boolean;
  className?: string;
}

export function ReviewCard({
  review,
  onHelpfulClick,
  hasVotedHelpful = false,
  className,
}: ReviewCardProps) {
  const [voted, setVoted] = React.useState(hasVotedHelpful);
  const [helpfuls, setHelpfuls] = React.useState(review.helpfulCount ?? 0);
  const rating = clamp(review.rating, 0, 5);

  React.useEffect(() => {
    setVoted(hasVotedHelpful);
  }, [hasVotedHelpful]);

  React.useEffect(() => {
    setHelpfuls(review.helpfulCount ?? 0);
  }, [review.helpfulCount]);

  const handleHelpful = () => {
    if (voted || !onHelpfulClick) return;
    setHelpfuls((prev) => prev + 1);
    setVoted(true);
    onHelpfulClick(review.id);
  };

  return (
    <article
      className={cn(
        "p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-2xs space-y-3 text-card-foreground h-full",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            src={review.reviewerAvatarUrl}
            alt={review.reviewerName}
            fallback={getInitials(review.reviewerName)}
            size="md"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="font-heading font-semibold text-sm text-foreground">
                {review.reviewerName}
              </h4>
              {review.isVerifiedBuyer ? (
                <Badge
                  variant="success"
                  size="sm"
                  className="text-[10px] gap-0.5"
                >
                  <CheckCircle className="h-2.5 w-2.5" /> Verified Purchase
                </Badge>
              ) : null}
            </div>

            {review.itemPurchasedTitle ? (
              <p className="text-xs text-muted-foreground line-clamp-1">
                Bought:{" "}
                <span className="font-medium text-foreground">
                  {review.itemPurchasedTitle}
                </span>
              </p>
            ) : null}
          </div>
        </div>

        <time
          dateTime={new Date(review.date).toISOString()}
          className="text-xs font-mono text-muted-foreground shrink-0"
        >
          {formatDate(review.date)}
        </time>
      </div>

      <div
        className="flex items-center gap-1"
        aria-label={`Rating: ${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground/30"
            )}
          />
        ))}
        <span className="text-xs font-bold font-mono ml-1 text-foreground">
          {rating.toFixed(1)}
        </span>
      </div>

      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
        {review.comment}
      </p>

      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2 text-xs text-muted-foreground flex-wrap">
        <span>Was this review helpful?</span>
        <button
          type="button"
          onClick={handleHelpful}
          disabled={voted || !onHelpfulClick}
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors text-xs font-medium",
            voted
              ? "bg-primary/10 text-primary border-primary/30 font-semibold cursor-default"
              : onHelpfulClick
                ? "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border cursor-pointer"
                : "bg-muted/40 text-muted-foreground border-border cursor-default opacity-70"
          )}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>Helpful ({helpfuls})</span>
        </button>
      </div>
    </article>
  );
}
