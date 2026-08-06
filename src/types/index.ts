/**
 * @file src/types/index.ts
 *
 * Shared TypeScript types used across the application.
 *
 * Convention:
 *   - Domain-specific types live in their own files (e.g. types/auction.ts)
 *   - This index re-exports commonly used primitives and utilities
 *   - Use `type` imports/exports everywhere (isolatedModules compliance)
 */

/* ── Generic utility types ── */

/** Make specific keys of T required */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific keys of T optional */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Strictly typed Object.entries */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/** Extract string keys of an object */
export type StringKeyOf<T> = Extract<keyof T, string>;

/** Nullable type shorthand */
export type Nullable<T> = T | null;

/** Optional type shorthand */
export type Maybe<T> = T | null | undefined;

/** Async function return type */
export type AsyncFn<T = void, Args extends unknown[] = []> = (...args: Args) => Promise<T>;

/* ── UI primitives ── */

/** Standard size scale used across UI components */
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Standard variant names aligned with design tokens */
export type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "muted"
  | "ghost"
  | "outline"
  | "link";

/** Standard color roles */
export type ColorRole =
  | "brand"
  | "harvest"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "muted";

/** Standard text alignment */
export type TextAlign = "left" | "center" | "right" | "justify";

/** Icon component prop shape (compatible with Lucide React) */
export interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
}

/* ── Navigation ── */

export interface NavLink {
  label: string;
  href: string;
  icon?: React.ComponentType<IconProps>;
  badge?: string | number;
  external?: boolean;
  disabled?: boolean;
}

export interface NavGroup {
  label?: string;
  links: NavLink[];
}

/* ── API / Data ── */

/** Standard paginated response envelope */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/** Standard error shape returned by the API */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

/** Standard success wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/* ── Component prop helpers ── */

/** Props that accept children */
export interface WithChildren {
  children: React.ReactNode;
}

/** Props that accept className */
export interface WithClassName {
  className?: string;
}

/** Common component props */
export interface CommonComponentProps extends WithChildren, WithClassName {}
