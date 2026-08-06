/**
 * @file src/components/layouts/site-header.tsx
 * @description Sticky site navigation — logo, links, theme toggle, auth CTAs.
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/primitives";
import { Menu, X } from "lucide-react";

interface SiteHeaderProps {
  /** When true, starts transparent over a full-bleed hero */
  transparent?: boolean;
  className?: string;
}

export function SiteHeader({ transparent = false, className }: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const solid = !transparent || scrolled || mobileOpen;
  const onHero = transparent && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-[var(--header-height)]",
        "transition-all duration-300 ease-out",
        solid && ["glass", "border-b border-border/60"],
        onHero && "bg-transparent border-transparent",
        className
      )}
      role="banner"
    >
      <nav
        aria-label="Main navigation"
        className="flex h-full items-center container-padding max-w-[var(--container-2xl)] mx-auto gap-3"
      >
        <Link
          href="/"
          className="flex items-center gap-2 no-underline group shrink-0"
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg font-heading font-bold text-sm",
              "gradient-brand text-white shadow-sm",
              "transition-transform duration-200 group-hover:scale-105"
            )}
          >
            A
          </span>
          <span
            className={cn(
              "font-heading font-bold text-lg leading-none",
              onHero ? "text-white" : "text-foreground"
            )}
          >
            {siteConfig.shortName}
            <span className={onHero ? "text-harvest-400" : "text-primary"}>
              .
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 ml-6">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium no-underline transition-colors duration-150",
                onHero
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle
            variant="icon"
            className={cn(
              onHero &&
                "text-white hover:bg-white/10 hover:text-white border-white/20"
            )}
          />

          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              onHero && "text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Link href="/login">Log in</Link>
          </Button>

          <Button asChild size="sm" variant={onHero ? "harvest" : "default"}>
            <Link href="/register">Register</Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={cn(
              "md:hidden",
              onHero && "text-white hover:bg-white/10 hover:text-white"
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="md:hidden absolute inset-x-0 top-[var(--header-height)] border-b border-border bg-background shadow-md"
        >
          <ul className="container-padding max-w-[var(--container-2xl)] mx-auto py-4 space-y-1 list-none m-0">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Button asChild variant="outline" size="sm" fullWidth>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
