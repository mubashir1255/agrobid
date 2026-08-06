/**
 * @file src/components/business/analytics-card.tsx
 * @description KPI analytics card for seller and market dashboards.
 *
 * Responsibilities:
 *  - Display a primary metric with optional period context
 *  - Show percentage trend (up / down / flat)
 *  - Optional goal progress bar and leading icon
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { clamp } from "@/utils/format";
import { cn } from "@/lib/utils";

export interface AnalyticsCardProps {
  title: string;
  metricValue: string | number;
  periodLabel?: string;
  changePercentage?: number;
  changeLabel?: string;
  /** 0–100 goal completion */
  targetProgress?: number;
  icon?: React.ReactNode;
  className?: string;
}

export function AnalyticsCard({
  title,
  metricValue,
  periodLabel = "vs last 30 days",
  changePercentage,
  changeLabel,
  targetProgress,
  icon,
  className,
}: AnalyticsCardProps) {
  const isPositive = changePercentage !== undefined && changePercentage > 0;
  const isNegative = changePercentage !== undefined && changePercentage < 0;
  const progress =
    targetProgress !== undefined ? clamp(targetProgress, 0, 100) : undefined;

  return (
    <Card className={cn("border-border/80 bg-card shadow-xs h-full", className)}>
      <CardHeader className="p-5 pb-2 flex flex-row items-start justify-between space-y-0 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {icon ? (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
              {icon}
            </span>
          ) : null}
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider truncate">
            {title}
          </CardTitle>
        </div>

        {changePercentage !== undefined ? (
          <div
            className={cn(
              "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold font-mono shrink-0",
              isPositive && "bg-success/15 text-success dark:bg-success/20",
              isNegative &&
                "bg-destructive/15 text-destructive dark:bg-destructive/20",
              !isPositive &&
                !isNegative &&
                "bg-muted text-muted-foreground"
            )}
          >
            {isPositive ? <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> : null}
            {isNegative ? <TrendingDown className="h-3.5 w-3.5 mr-0.5" /> : null}
            {!isPositive && !isNegative ? (
              <Minus className="h-3.5 w-3.5 mr-0.5" />
            ) : null}
            <span>
              {isPositive ? "+" : ""}
              {changePercentage}%
            </span>
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="p-5 pt-1 space-y-3">
        <span className="font-mono text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight block break-all">
          {metricValue}
        </span>

        <p className="text-xs text-muted-foreground">
          {changeLabel || periodLabel}
        </p>

        {progress !== undefined ? (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>Goal Target</span>
              <span>{progress}%</span>
            </div>
            <div
              className="h-1.5 w-full bg-muted rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${title} goal progress`}
            >
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  isNegative ? "bg-harvest-500" : "bg-primary"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
