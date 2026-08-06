/**
 * @file src/components/primitives/theme-toggle.tsx
 *
 * ThemeToggle — accessible button to cycle between light, dark, and system themes.
 *
 * Features:
 *   - Uses next-themes `useTheme` hook
 *   - Animated sun/moon icon swap using Motion (motion.dev)
 *   - Keyboard accessible (native <button>)
 *   - Screen-reader label updates with current theme
 *   - Respects prefers-reduced-motion
 */

"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /** Render a compact icon-only button or an expanded button with label */
  variant?: "icon" | "labeled";
  className?: string;
}

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const themeLabels = {
  light: "Switch to dark mode",
  dark: "Switch to system mode",
  system: "Switch to light mode",
} as const;

const nextTheme = {
  light: "dark",
  dark: "system",
  system: "light",
} as const;

type ThemeKey = keyof typeof themeIcons;

/**
 * ThemeToggle — cycles light → dark → system on each click.
 *
 * @example
 * // In header:
 * <ThemeToggle />
 *
 * @example
 * // With label (settings page):
 * <ThemeToggle variant="labeled" />
 */
export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme = "system", setTheme } = useTheme();
  const resolvedTheme = (theme as ThemeKey) in themeIcons ? (theme as ThemeKey) : "system";

  const Icon = themeIcons[resolvedTheme];
  const label = themeLabels[resolvedTheme];

  const handleToggle = () => {
    setTheme(nextTheme[resolvedTheme]);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "rounded-md p-2 text-sm font-medium",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variant === "labeled" && "px-3",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolvedTheme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center justify-center"
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </motion.span>
      </AnimatePresence>

      {variant === "labeled" && (
        <span className="capitalize">{resolvedTheme}</span>
      )}
    </button>
  );
}
