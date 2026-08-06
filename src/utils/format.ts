/**
 * @file src/utils/format.ts
 *
 * Formatting utilities for AgroBid Pakistan.
 *
 * All functions are pure (no side effects) and locale-aware.
 * Uses Intl APIs for currency, date, and number formatting.
 */

/* ─────────────────────────── Currency ─────────────────────────── */

const pkrFormatter = new Intl.NumberFormat("ur-PK", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const pkrFormatterCompact = new Intl.NumberFormat("ur-PK", {
  style: "currency",
  currency: "PKR",
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

/**
 * Format a number as Pakistani Rupees.
 * @example formatPKR(250000) → "Rs 2,50,000"
 */
export function formatPKR(amount: number): string {
  return pkrFormatter.format(amount);
}

/**
 * Format a large PKR amount compactly.
 * @example formatPKRCompact(1500000) → "Rs 1.5M"
 */
export function formatPKRCompact(amount: number): string {
  return pkrFormatterCompact.format(amount);
}

/* ─────────────────────────── Dates ─────────────────────────── */

const pkDateFormatter = new Intl.DateTimeFormat("en-PK", {
  dateStyle: "medium",
});

const pkDateTimeFormatter = new Intl.DateTimeFormat("en-PK", {
  dateStyle: "medium",
  timeStyle: "short",
});

const pkRelativeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

/**
 * Format a date string or Date object to a human-readable date.
 * @example formatDate("2024-12-25") → "Dec 25, 2024"
 */
export function formatDate(date: string | Date): string {
  return pkDateFormatter.format(new Date(date));
}

/**
 * Format a date with time.
 * @example formatDateTime("2024-12-25T14:30:00") → "Dec 25, 2024, 2:30 PM"
 */
export function formatDateTime(date: string | Date): string {
  return pkDateTimeFormatter.format(new Date(date));
}

/**
 * Format a date as relative time (e.g. "3 hours ago").
 */
export function formatRelativeTime(date: string | Date): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = then - now;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (Math.abs(diffSec) < 60) return pkRelativeFormatter.format(diffSec, "second");
  if (Math.abs(diffMin) < 60) return pkRelativeFormatter.format(diffMin, "minute");
  if (Math.abs(diffHour) < 24) return pkRelativeFormatter.format(diffHour, "hour");
  return pkRelativeFormatter.format(diffDay, "day");
}

/**
 * Format a countdown duration (seconds) into HH:MM:SS.
 * @example formatCountdown(3723) → "01:02:03"
 */
export function formatCountdown(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

/* ─────────────────────────── Numbers ─────────────────────────── */

/**
 * Format a number with commas (Pakistani/South Asian format).
 * @example formatNumber(1250000) → "12,50,000"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("ur-PK").format(n);
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/* ─────────────────────────── Strings ─────────────────────────── */

/**
 * Truncate a string to a max length, appending "…" if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + "…";
}

/**
 * Convert a string to a URL-safe slug.
 * @example slugify("Goat Auction — Lahore 2024") → "goat-auction-lahore-2024"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert camelCase or snake_case to Title Case.
 * @example toTitleCase("livestockAuction") → "Livestock Auction"
 */
export function toTitleCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Get initials from a full name (up to 2 characters).
 * @example getInitials("Muhammad Ali") → "MA"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
