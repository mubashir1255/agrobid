/**
 * @file src/components/providers/theme-provider.tsx
 *
 * ThemeProvider — wraps `next-themes`' provider with a "use client" boundary.
 *
 * Why a wrapper?
 *  - next-themes requires a Client Component boundary
 *  - The root layout is a Server Component, so we isolate the client code here
 *  - Re-exporting `useTheme` centralizes the import path for consumers
 *
 * Usage in layout:
 *   <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *     {children}
 *   </ThemeProvider>
 *
 * Usage in components:
 *   const { theme, setTheme, resolvedTheme } = useTheme();
 */

"use client";

export { ThemeProvider } from "next-themes";
export { useTheme } from "next-themes";
