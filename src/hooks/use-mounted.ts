/**
 * @file src/hooks/use-mounted.ts
 *
 * useMounted — returns true only after the component has mounted on the client.
 *
 * Use this to avoid SSR/CSR hydration mismatches when rendering
 * client-only content (theme state, localStorage, window APIs).
 *
 * @example
 * function ThemeAwareComponent() {
 *   const mounted = useMounted();
 *   if (!mounted) return null; // Prevent hydration mismatch
 *   return <div>Current theme: {theme}</div>;
 * }
 */

"use client";

import { useEffect, useState } from "react";

/**
 * useMounted — hydration safety hook.
 * Returns false during SSR, true after first client render.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
