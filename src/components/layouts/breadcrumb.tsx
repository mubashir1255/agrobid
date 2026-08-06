/**
 * @file src/components/layouts/breadcrumb.tsx
 * @description Accessible Breadcrumb navigation component with automatic separator handling,
 * keyboard navigation, and dark mode support.
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  /** Display label for the breadcrumb item */
  label: string;
  /** Optional href for clickable items (last item typically has no href) */
  href?: string;
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Whether this is the current page (applies aria-current) */
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator component (defaults to ChevronRight) */
  separator?: React.ReactNode;
  /** Whether to show home icon as first item when no items provided */
  showHome?: boolean;
  /** Home link href */
  homeHref?: string;
  /** Custom className */
  className?: string;
  /** aria-label for the breadcrumb navigation */
  "aria-label"?: string;
}

/**
 * Breadcrumb — accessible navigation trail showing page hierarchy.
 *
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Auctions", href: "/auctions" },
 *     { label: "Livestock", href: "/auctions/livestock" },
 *     { label: "Sahiwal Bull", isCurrent: true },
 *   ]}
 * />
 */
export function Breadcrumb({
  items,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  showHome = false,
  homeHref = "/",
  className,
  "aria-label": ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  const allItems = React.useMemo(() => {
    const result: BreadcrumbItem[] = [];
    if (showHome && items.length > 0) {
      result.push({ label: "Home", href: homeHref, icon: <Home className="h-4 w-4" /> });
    }
    return [...result, ...items];
  }, [items, showHome, homeHref]);

  if (allItems.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center gap-1.5 text-sm", className)}>
      <ol className="flex items-center gap-1.5 flex-wrap" role="list">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isLink = !isLast && item.href;

          return (
            <li key={item.href ?? item.label ?? index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-muted-foreground/60"
                >
                  {separator}
                </span>
              )}

              {isLink ? (
                <Link
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-1.5 py-0.5 -mx-1.5 -my-0.5"
                  )}
                >
                  {item.icon && <span aria-hidden="true">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1.5 font-medium text-foreground",
                    isLast && "truncate max-w-[200px]"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span aria-hidden="true">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * BreadcrumbSeparator — reusable separator component
 */
export function BreadcrumbSeparator({ children = <ChevronRight className="h-4 w-4" /> }: { children?: React.ReactNode }) {
  return <span aria-hidden="true" className="text-muted-foreground/60 flex-shrink-0">{children}</span>;
}