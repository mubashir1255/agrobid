/**
 * @file src/components/ui/error-state.tsx
 * @description Accessible Error State component for API failures, broken pages, or form submit errors.
 * Supports retry buttons, error code details, inline or card layouts, and dark mode.
 */

import * as React from "react";
import { AlertOctagon, RefreshCw, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Error heading title */
  title?: string;
  /** Error message description */
  description?: string;
  /** Optional error code or stack trace details */
  errorCode?: string;
  /** Callback for Retry button */
  onRetry?: () => void;
  /** Label for retry button */
  retryLabel?: string;
  /** If true, shows loading spinner on retry button */
  retrying?: boolean;
  /** Callback for Go Back / Home button */
  onBack?: () => void;
  /** Label for back button */
  backLabel?: string;
  /** Layout mode: card (boxed) or inline (compact) */
  variant?: "card" | "inline";
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this data. Please try again or contact support if the issue persists.",
  errorCode,
  onRetry,
  retryLabel = "Try Again",
  retrying = false,
  onBack,
  backLabel = "Go Back",
  variant = "card",
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 mx-auto",
        variant === "card" &&
          "rounded-2xl border border-destructive/20 bg-destructive/5 dark:bg-destructive/10 dark:border-destructive/30 max-w-lg my-4",
        variant === "inline" && "py-6 max-w-md",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/15 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground shadow-xs">
        <AlertOctagon className="h-8 w-8" />
      </div>

      <h3 className="font-heading text-lg font-bold text-foreground mb-1.5">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-prose mb-4">
        {description}
      </p>

      {errorCode && (
        <code className="text-xs font-mono bg-muted/80 text-muted-foreground px-2.5 py-1 rounded-md mb-6 border border-border">
          Error Code: {errorCode}
        </code>
      )}

      {(onRetry || onBack) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 w-full sm:w-auto">
          {onRetry && (
            <Button
              variant="default"
              onClick={onRetry}
              loading={retrying}
              loadingText="Retrying..."
              leftIcon={!retrying ? <RefreshCw className="h-4 w-4" /> : undefined}
            >
              {retryLabel}
            </Button>
          )}

          {onBack && (
            <Button
              variant="outline"
              onClick={onBack}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              {backLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
