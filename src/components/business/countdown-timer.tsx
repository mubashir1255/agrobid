/**
 * @file src/components/business/countdown-timer.tsx
 * @description Real-time countdown timer for auction end times.
 *
 * Responsibilities:
 *  - Tick remaining days/hours/minutes/seconds every second
 *  - Urgency styling when under 1 hour remains
 *  - Fire `onExpire` once when the timer hits zero
 *  - Expose boxes / compact / inline layout variants
 */

"use client";

import * as React from "react";
import { Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CountdownTimerProps {
  /** Target end date for the auction */
  targetDate: string | Date;
  /** Callback fired once when countdown reaches zero */
  onExpire?: () => void;
  /** Layout mode: "boxes" (big numbers), "inline" (text string), "compact" (small pill) */
  variant?: "boxes" | "inline" | "compact";
  /** Seconds threshold for urgent styling (default: 3600 = 1 hour) */
  urgentThresholdSeconds?: number;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

function calculateTimeRemaining(target: Date): TimeRemaining {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isExpired: false, totalSeconds };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function CountdownTimer({
  targetDate,
  onExpire,
  variant = "boxes",
  urgentThresholdSeconds = 3600,
  className,
}: CountdownTimerProps) {
  const target = React.useMemo(() => new Date(targetDate), [targetDate]);
  const [time, setTime] = React.useState<TimeRemaining>(() =>
    calculateTimeRemaining(target)
  );
  const expiredNotifiedRef = React.useRef(false);
  const onExpireRef = React.useRef(onExpire);

  React.useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  React.useEffect(() => {
    expiredNotifiedRef.current = false;
    setTime(calculateTimeRemaining(target));

    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(target);
      setTime(remaining);

      if (remaining.isExpired && !expiredNotifiedRef.current) {
        expiredNotifiedRef.current = true;
        clearInterval(timer);
        onExpireRef.current?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  const isUrgent =
    !time.isExpired && time.totalSeconds < urgentThresholdSeconds;

  if (time.isExpired) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
          className
        )}
        role="status"
      >
        <Clock className="h-3.5 w-3.5" />
        <span>Auction Ended</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-mono",
          isUrgent
            ? "bg-harvest-500/20 text-harvest-900 border border-harvest-500/40 dark:bg-harvest-500/30 dark:text-harvest-100 animate-pulse"
            : "bg-muted text-muted-foreground border border-border",
          className
        )}
        role="timer"
        aria-live="polite"
        aria-label={`Time remaining ${time.days} days ${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds`}
      >
        {isUrgent ? (
          <Flame className="h-3.5 w-3.5 text-harvest-600 dark:text-harvest-400" />
        ) : (
          <Clock className="h-3.5 w-3.5" />
        )}
        <span>
          {time.days > 0 ? `${time.days}d ` : ""}
          {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
        </span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span
        className={cn(
          "font-mono font-medium text-sm",
          isUrgent
            ? "text-harvest-600 dark:text-harvest-400 font-bold"
            : "text-foreground",
          className
        )}
        role="timer"
        aria-live="polite"
      >
        {time.days > 0 ? `${time.days}d ` : ""}
        {pad(time.hours)}h {pad(time.minutes)}m {pad(time.seconds)}s
      </span>
    );
  }

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2 text-center select-none", className)}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`}
    >
      {time.days > 0 ? (
        <div className="flex flex-col items-center min-w-11 p-2 rounded-xl bg-card border border-border shadow-xs">
          <span className="font-mono text-lg font-bold text-foreground">
            {time.days}
          </span>
          <span className="text-[10px] uppercase font-semibold text-muted-foreground">
            Days
          </span>
        </div>
      ) : null}

      {(
        [
          { value: time.hours, label: "Hrs", urgentPulse: false },
          { value: time.minutes, label: "Min", urgentPulse: false },
          { value: time.seconds, label: "Sec", urgentPulse: true },
        ] as const
      ).map((unit, index) => (
        <React.Fragment key={unit.label}>
          {index > 0 || time.days > 0 ? (
            <span className="font-mono font-bold text-muted-foreground text-sm hidden sm:inline">
              :
            </span>
          ) : null}
          <div
            className={cn(
              "flex flex-col items-center min-w-11 p-2 rounded-xl border shadow-xs transition-colors",
              isUrgent
                ? "bg-harvest-500/10 border-harvest-500/40 text-harvest-950 dark:bg-harvest-500/20 dark:text-harvest-100"
                : "bg-card border-border",
              isUrgent && unit.urgentPulse && "bg-harvest-500/20 border-harvest-500/50 animate-pulse"
            )}
          >
            <span
              className={cn(
                "font-mono text-lg font-bold",
                unit.urgentPulse ? "text-primary" : "text-foreground"
              )}
            >
              {pad(unit.value)}
            </span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">
              {unit.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
