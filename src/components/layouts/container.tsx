/**
 * @file src/components/layouts/container.tsx
 *
 * Container — constrains content to a max-width and centers it horizontally.
 *
 * Props:
 *   - size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "fluid"
 *     Controls the max-width of the container.
 *   - padding: boolean (default true)
 *     Whether to apply horizontal page padding (--page-padding-x).
 *   - as: any valid HTML element tag (default "div")
 *     Allows semantic HTML, e.g. <Container as="section"> or <Container as="main">
 *   - className: additional Tailwind classes
 *
 * Design decisions:
 *   - Uses CSS custom properties for container widths to stay in sync with tokens
 *   - Padding uses `container-padding` utility class from globals.css
 *   - "fluid" size = 100% width with no max-width constraint
 */

import { cn } from "@/lib/utils";
import type { ComponentPropsWithRef, ElementType } from "react";

/* ── Size → max-width token map ── */
const containerSizes = {
  xs: "max-w-[var(--container-xs)]",
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
  "2xl": "max-w-[var(--container-2xl)]",
  "3xl": "max-w-[var(--container-3xl)]",
  fluid: "max-w-full",
} as const;

export type ContainerSize = keyof typeof containerSizes;

/* ── Polymorphic component types ── */
type ContainerOwnProps<E extends ElementType = "div"> = {
  /** Max-width constraint. Defaults to "xl" (1280px). */
  size?: ContainerSize;
  /** Apply horizontal page padding. Defaults to true. */
  padding?: boolean;
  /** HTML element to render. Defaults to "div". */
  as?: E;
  className?: string;
  children?: React.ReactNode;
};

type ContainerProps<E extends ElementType = "div"> = ContainerOwnProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof ContainerOwnProps<E>>;

/**
 * Container component — semantic, accessible content wrapper.
 *
 * @example
 * // Standard page container
 * <Container>...</Container>
 *
 * @example
 * // Full-width section with narrow prose content
 * <Container as="section" size="md">...</Container>
 *
 * @example
 * // No padding (e.g. inside a full-bleed hero)
 * <Container padding={false} size="2xl">...</Container>
 */
export function Container<E extends ElementType = "div">({
  as,
  size = "xl",
  padding = true,
  className,
  children,
  ...props
}: ContainerProps<E>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        containerSizes[size],
        padding && "container-padding",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
