/**
 * @file src/components/business/statistics-card.tsx
 * @description Dashboard summary statistic tile with icon and optional trend.
 *
 * Responsibilities:
 *  - Present high-level figures (active auctions, bidders, volume)
 *  - Style icon containers by semantic variant
 *  - Optional comparative trend line under the value
 */

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatisticsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  /** Percentage change vs previous period */
  trendPercentage?: number;
  iconVariant?: "brand" | "harvest" | "success" | "info" | "warning";
  className?: string;
}

const iconVariantClasses = {
  brand: "bg-primary/10 text-primary dark:bg-primary/20",
  harvest:
    "bg-harvest-500/15 text-harvest-900 dark:bg-harvest-500/25 dark:text-harvest-100",
  success: "bg-success/15 text-success dark:bg-success/25",
  info: "bg-info/15 text-info dark:bg-info/25",
  warning: "bg-warning/15 text-warning-foreground dark:bg-warning/25",
};

export function StatisticsCard({
  label,
  value,
  icon,
  description,
  trendPercentage,
  iconVariant = "brand",
  className,
}: StatisticsCardProps) {
  const isUp = trendPercentage !== undefined && trendPercentage > 0;
  const isDown = trendPercentage !== undefined && trendPercentage < 0;

  return (
    <Card className={cn("border-border/80 bg-card shadow-xs h-full", className)}>
      <CardContent className="p-5 flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/40 shadow-2xs",
            iconVariantClasses[iconVariant]
          )}
        >
          {icon}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            {label}
          </span>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-2xl font-bold text-foreground tracking-tight">
              {value}
            </span>
            {trendPercentage !== undefined ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-[11px] font-bold font-mono",
                  isUp && "text-success",
                  isDown && "text-destructive",
                  !isUp && !isDown && "text-muted-foreground"
                )}
              >
                {isUp ? <TrendingUp className="h-3 w-3" /> : null}
                {isDown ? <TrendingDown className="h-3 w-3" /> : null}
                {isUp ? "+" : ""}
                {trendPercentage}%
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="text-xs text-muted-foreground leading-normal">
              {description}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
