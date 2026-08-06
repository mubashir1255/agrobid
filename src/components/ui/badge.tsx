/**
 * @file src/components/ui/badge.tsx
 * @description Production-ready Badge component supporting variants, sizes, live status dot indicator, and removable tags.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors select-none shrink-0 border rounded-full",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground",
        harvest:
          "border-transparent bg-harvest-500 text-harvest-950 font-semibold shadow-xs hover:bg-harvest-400 dark:bg-harvest-500 dark:text-harvest-950",
        outline:
          "border-border text-foreground hover:bg-accent dark:border-border dark:text-foreground",
        destructive:
          "border-transparent bg-destructive/15 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground",
        success:
          "border-transparent bg-success/15 text-success dark:bg-success/20 dark:text-success-foreground",
        warning:
          "border-transparent bg-warning/20 text-warning-foreground dark:bg-warning/25 dark:text-warning-foreground",
        info:
          "border-transparent bg-info/15 text-info dark:bg-info/20 dark:text-info-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px] gap-1",
        default: "px-2.5 py-0.5 text-xs gap-1.5",
        lg: "px-3 py-1 text-sm gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Renders a small status dot inside the badge */
  dot?: boolean;
  /** Dot pulse animation for live status */
  pulse?: boolean;
  /** If provided, renders an X button to remove/dismiss the badge */
  onRemove?: () => void;
  /** Label for the remove button */
  removeLabel?: string;
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  pulse = false,
  onRemove,
  removeLabel = "Remove tag",
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulse && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-current"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export { badgeVariants };
