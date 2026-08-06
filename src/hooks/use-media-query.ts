/**
 * @file src/hooks/use-media-query.ts
 *
 * useMediaQuery — reactive hook that tracks a CSS media query.
 *
 * Returns true when the media query matches, false otherwise.
 * Uses the `window.matchMedia` API with an event listener for reactivity.
 * SSR-safe: returns `defaultValue` (false) during server rendering.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 * const isDark = useMediaQuery("(prefers-color-scheme: dark)");
 */

"use client";

import { useEffect, useState } from "react";

/**
 * useMediaQuery — tracks a CSS media query match state.
 *
 * @param query - A CSS media query string
 * @param defaultValue - Value returned during SSR (default: false)
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // SSR guard: window is not available on the server
    if (typeof window === "undefined") return defaultValue;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use the modern addEventListener API (supported in all modern browsers)
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/* ── Semantic convenience hooks using design token breakpoints ── */

/** Returns true when viewport is ≥ 640px (sm breakpoint) */
export const useIsSmallScreen = () => useMediaQuery("(min-width: 640px)");

/** Returns true when viewport is ≥ 768px (md breakpoint) */
export const useIsMediumScreen = () => useMediaQuery("(min-width: 768px)");

/** Returns true when viewport is ≥ 1024px (lg breakpoint) */
export const useIsLargeScreen = () => useMediaQuery("(min-width: 1024px)");

/** Returns true when viewport is ≥ 1280px (xl breakpoint) */
export const useIsXLargeScreen = () => useMediaQuery("(min-width: 1280px)");

/** Returns true when user prefers reduced motion */
export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
