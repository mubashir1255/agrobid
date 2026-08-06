/**
 * @file src/components/ui/empty-state.tsx
 * @description Accessible Empty State placeholder component for empty lists, search results, or uncreated resources.
 * Supports custom icons/illustrations, titles, descriptions, primary & secondary action buttons, and dark mode.
 */

import * as React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main icon or custom SVG illustration */
  icon?: React.ReactNode;
  /** Heading title */
  title: string;
  /** Description message explaining what to do */
  description?: string;
  /** Primary action button element */
  action?: React.ReactNode;
  /** Secondary action element or link */
  secondaryAction?: React.ReactNode;
  /** Component size variant */
  size?: "sm" | "default" | "lg";
}

export function EmptyState({
  icon = <FolderOpen className="h-10 w-10 text-muted-foreground" />,
  title,
  description,
  action,
  secondaryAction,
  size = "default",
  className,
  ...props
}: EmptyStateProps) {
  const sizeClasses = {
    sm: "py-8 px-4 max-w-sm",
    default: "py-12 px-6 max-w-md",
    lg: "py-20 px-8 max-w-lg",
  };

  return (
    <div
      className={cn(
        "mx-auto flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border bg-card/50 dark:bg-card/30 dark:border-border p-6 transition-all duration-200",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/80 dark:bg-muted/40 shadow-xs border border-border/50">
        {icon}
      </div>

      <h3 className="font-heading text-lg font-bold text-foreground mb-1.5">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose mb-6">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
