/**
 * @file src/constants/index.ts
 *
 * Application-wide constants.
 *
 * Keep this file for non-configurable values:
 *   - Limits (max file size, max bid amount)
 *   - Durations (session timeout, cache TTLs)
 *   - Enum-like string constants
 *
 * For site branding / navigation, use src/config/site.ts.
 */

/* ── Pagination ── */
export const ITEMS_PER_PAGE = 24;
export const MAX_PAGINATION_PAGES = 100;

/* ── File upload limits ── */
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MAX_LISTING_IMAGES = 8;

/* ── Auction rules ── */
export const MIN_BID_INCREMENT_PKR = 500;
export const MAX_BID_AMOUNT_PKR = 50_000_000; // 5 Crore PKR
export const AUCTION_EXTENSION_SECONDS = 60; // Extend by 1 min on last-second bid

/* ── Session / cache ── */
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const STALE_TIME_MS = 5 * 60 * 1000;       // 5 minutes (React Query)
export const CACHE_TIME_MS = 10 * 60 * 1000;      // 10 minutes (React Query)

/* ── Toast / notification durations ── */
export const TOAST_DURATION_MS = 5000;
export const SUCCESS_TOAST_DURATION_MS = 3000;
export const ERROR_TOAST_DURATION_MS = 7000;

/* ── Date formats ── */
export const DATE_FORMAT = "dd MMM yyyy";
export const DATE_TIME_FORMAT = "dd MMM yyyy, hh:mm a";

/* ── Listing categories ── */
export const LISTING_CATEGORIES = [
  "livestock",
  "crops",
  "machinery",
  "seeds",
  "fertilizer",
  "land",
  "other",
] as const;

export type ListingCategory = (typeof LISTING_CATEGORIES)[number];

/* ── Auction status ── */
export const AUCTION_STATUS = {
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  ACTIVE: "active",
  CLOSING_SOON: "closing_soon",
  CLOSED: "closed",
  CANCELLED: "cancelled",
  SOLD: "sold",
} as const;

export type AuctionStatus = (typeof AUCTION_STATUS)[keyof typeof AUCTION_STATUS];

/* ── User roles ── */
export const USER_ROLES = {
  BUYER: "buyer",
  SELLER: "seller",
  ADMIN: "admin",
  MODERATOR: "moderator",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/* ── Local storage keys ── */
export const STORAGE_KEYS = {
  THEME: "agrobid-theme",
  RECENT_SEARCHES: "agrobid-recent-searches",
  WATCHLIST: "agrobid-watchlist",
  PREFERRED_CATEGORY: "agrobid-preferred-category",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/* ── Routes ── */
export const ROUTES = {
  HOME: "/",
  AUCTIONS: "/auctions",
  AUCTION_DETAIL: (id: string) => `/auctions/${id}`,
  LIVESTOCK: "/livestock",
  CROPS: "/crops",
  HOW_IT_WORKS: "/how-it-works",
  ABOUT: "/about",
  CONTACT: "/contact",
  // Auth
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  // Dashboard
  DASHBOARD: "/dashboard",
  MY_LISTINGS: "/dashboard/listings",
  MY_BIDS: "/dashboard/bids",
  PROFILE: "/dashboard/profile",
  // Legal
  PRIVACY: "/legal/privacy",
  TERMS: "/legal/terms",
} as const;
