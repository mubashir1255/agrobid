/**
 * @file src/constants/breakpoints.ts
 *
 * Breakpoint constants matching Tailwind CSS v4 defaults.
 * Use these in JS/TS logic (e.g. with useMediaQuery) to stay
 * in sync with CSS breakpoints without hardcoding strings.
 */

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Generate a min-width media query string for a given breakpoint.
 * @example breakpointQuery("lg") → "(min-width: 1024px)"
 */
export function breakpointQuery(bp: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[bp]}px)`;
}
