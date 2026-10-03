/**
 * @file src/components/providers/theme-provider.tsx
 *
 * ThemeProvider — wraps `next-themes`' provider with a "use client" boundary.
 *
 * Why a wrapper?
 *  - next-themes requires a Client Component boundary
 *  - Suppresses benign React 19 false-positive warning for next-themes' inline script
 *  - Re-exporting `useTheme` centralizes the import path for consumers
 *
 * Usage in layout:
 *   <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *     {children}
 *   </ThemeProvider>
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const SCRIPT_TAG_WARNING = "Encountered a script tag while rendering React component";

// Suppress benign React 19 script-tag false positive emitted by next-themes during client hydration
if (
  process.env.NODE_ENV === "development" &&
  !(globalThis as Record<string, unknown>).__themeScriptWarningPatched
) {
  (globalThis as Record<string, unknown>).__themeScriptWarningPatched = true;
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes(SCRIPT_TAG_WARNING)) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export { useTheme } from "next-themes";
