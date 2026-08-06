/**
 * @file src/components/layouts/site-footer.tsx
 *
 * SiteFooter — bottom site-wide footer shell.
 *
 * Structure:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  Logo + tagline  │  Platform  │  Support  │  Legal  │
 *   ├─────────────────────────────────────────────────────┤
 *   │  Copyright bar                                      │
 *   └─────────────────────────────────────────────────────┘
 *
 * Features:
 *   - Semantic <footer> with role="contentinfo"
 *   - Reads links from siteConfig.footerLinks
 *   - Responsive grid: 1 col mobile → 4 col desktop
 *   - Brand gradient top border accent
 *   - Copyright year is computed at build time (Server Component)
 */

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Link from "next/link";

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className={cn(
        "mt-auto border-t border-border",
        "bg-card text-card-foreground",
        className,
      )}
    >
      {/* Brand gradient accent line at the very top */}
      <div className="h-px gradient-brand-harvest" aria-hidden="true" />

      {/* ── Main footer content ── */}
      <div className="container-padding max-w-[var(--container-2xl)] mx-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand column ── */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 no-underline group w-fit"
              aria-label={`${siteConfig.name} — home`}
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-lg font-heading font-bold text-sm gradient-brand text-white"
              >
                A
              </span>
              <span className="font-heading font-bold text-foreground text-lg">
                {siteConfig.shortName}
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[20ch]">
              Pakistan's trusted agricultural bidding marketplace.
            </p>
          </div>

          {/* ── Platform links ── */}
          <nav aria-label="Platform navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2.5" role="list">
              {siteConfig.footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Support links ── */}
          <nav aria-label="Support navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2.5" role="list">
              {siteConfig.footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Legal links ── */}
          <nav aria-label="Legal navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2.5" role="list">
              {siteConfig.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-border">
        <div className="container-padding max-w-[var(--container-2xl)] mx-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for Pakistani farmers 🌾
          </p>
        </div>
      </div>
    </footer>
  );
}
