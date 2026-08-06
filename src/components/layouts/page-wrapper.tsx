/**
 * @file src/components/layouts/page-wrapper.tsx
 *
 * Page wrapper components — standardized content regions used inside pages.
 *
 * Exports:
 *   - PageWrapper      : outermost page container (optional, for dashboards)
 *   - PageHeader       : page title + breadcrumbs + actions row
 *   - PageContent      : scrollable page body
 *   - Section          : a vertically-padded content section
 *   - SectionHeader    : section title + description + CTA
 *
 * Design principles:
 *   - All wrappers are polymorphic (accept `as` prop)
 *   - All use design tokens for spacing (not hard-coded values)
 *   - ARIA roles and landmark elements applied by default
 *   - Server Components (no "use client")
 */

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { Container, type ContainerSize } from "@/components/layouts/container";

/* ═══════════════════════════════════════════════════════════════
   PageWrapper
   Outermost shell for dashboard / app pages (not marketing pages).
   Provides a flex column layout that fills the viewport height.
═══════════════════════════════════════════════════════════════ */

interface PageWrapperProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

/**
 * PageWrapper — fills available height, flex-column layout.
 * Used for dashboard layouts where sidebar + content share the viewport.
 *
 * @example
 * <PageWrapper>
 *   <PageHeader title="Dashboard" />
 *   <PageContent>...</PageContent>
 * </PageWrapper>
 */
export function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  return (
    <div
      className={cn("flex flex-1 flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PageHeader
   Sticky section at the top of a page with title, breadcrumbs,
   and optional action buttons.
═══════════════════════════════════════════════════════════════ */

interface PageHeaderProps extends ComponentPropsWithoutRef<"div"> {
  /** Main page title */
  title?: string;
  /** Optional subtitle or description */
  description?: string;
  /** Right-aligned action elements (e.g. buttons) */
  actions?: ReactNode;
  /** Breadcrumbs or back-navigation */
  breadcrumbs?: ReactNode;
  className?: string;
}

/**
 * PageHeader — title + description + actions row.
 *
 * @example
 * <PageHeader
 *   title="All Auctions"
 *   description="Browse active livestock and crop auctions"
 *   actions={<Button>Post Listing</Button>}
 * />
 */
export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-b border-border bg-card",
        "px-[var(--page-padding-x)] py-5",
        className,
      )}
      role="banner"
      aria-label="Page header"
      {...props}
    >
      {breadcrumbs && (
        <div className="mb-3" aria-label="Breadcrumb">
          {breadcrumbs}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 min-w-0">
          {title && (
            <h1 className="text-2xl font-heading font-bold text-foreground tracking-tight truncate">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm text-muted-foreground max-w-prose">
              {description}
            </p>
          )}
          {children}
        </div>

        {actions && (
          <div
            className="flex items-center gap-2 shrink-0"
            role="group"
            aria-label="Page actions"
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PageContent
   Main scrollable content area of a page.
═══════════════════════════════════════════════════════════════ */

interface PageContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

/**
 * PageContent — scrollable page body with consistent padding.
 *
 * @example
 * <PageContent>
 *   <AuctionGrid />
 * </PageContent>
 */
export function PageContent({ children, className, ...props }: PageContentProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col overflow-y-auto",
        "px-[var(--page-padding-x)] py-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Section
   A vertical content section (used in marketing pages).
   Handles padding, optional background, and container sizing.
═══════════════════════════════════════════════════════════════ */

type SectionVariant = "default" | "muted" | "primary" | "accent";

const sectionVariants: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-muted",
  primary: "gradient-brand text-white",
  accent: "gradient-brand-harvest text-white",
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background variant. Defaults to "default". */
  variant?: SectionVariant;
  /** Max-width of the inner container. Defaults to "xl". */
  containerSize?: ContainerSize;
  /** Whether the container has horizontal padding. Defaults to true. */
  containerPadding?: boolean;
  /** HTML element tag. Defaults to "section". */
  as?: ElementType;
  /** aria-label for the section (recommended for landmark sections) */
  "aria-label"?: string;
  id?: string;
}

/**
 * Section — marketing page content block with vertical rhythm.
 *
 * @example
 * <Section aria-label="Features overview" id="features">
 *   <SectionHeader title="Why AgroBid?" />
 *   <FeatureGrid />
 * </Section>
 *
 * @example
 * <Section variant="muted">
 *   <TestimonialsCarousel />
 * </Section>
 */
export function Section({
  children,
  className,
  variant = "default",
  containerSize = "xl",
  containerPadding = true,
  as: Tag = "section",
  "aria-label": ariaLabel,
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "section-padding",
        sectionVariants[variant],
        className,
      )}
    >
      <Container size={containerSize} padding={containerPadding}>
        {children}
      </Container>
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SectionHeader
   Consistent title + description + optional CTA for sections.
═══════════════════════════════════════════════════════════════ */

interface SectionHeaderProps extends ComponentPropsWithoutRef<"div"> {
  /** Section eyebrow / category label */
  eyebrow?: string;
  /** Main section heading */
  title: string;
  /** Supporting description */
  description?: string;
  /** Optional CTA below the description */
  cta?: ReactNode;
  /** Text alignment. Defaults to "left". */
  align?: "left" | "center" | "right";
  className?: string;
}

const alignClasses: Record<"left" | "center" | "right", string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

/**
 * SectionHeader — standardized heading block for page sections.
 *
 * @example
 * <SectionHeader
 *   eyebrow="How it works"
 *   title="Simple, transparent bidding"
 *   description="List your produce in minutes and reach thousands of buyers."
 *   align="center"
 * />
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  cta,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-10 lg:mb-14",
        alignClasses[align],
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary uppercase tracking-widest">
          {eyebrow}
        </span>
      )}

      <h2 className="text-balance font-heading font-bold text-foreground">
        {title}
      </h2>

      {description && (
        <p className="text-muted-foreground text-pretty leading-relaxed max-w-[55ch]">
          {description}
        </p>
      )}

      {cta && (
        <div className="mt-2">
          {cta}
        </div>
      )}
    </div>
  );
}
