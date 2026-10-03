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
        "fixed inset-x-0 top-0 z-50 h-[var(--header-height)]",
        "transition-all duration-300 ease-out",
        solid && ["glass", "border-b border-border/60"],
        onHero && "border-transparent bg-transparent",
        className,
      )}
      role="banner"
    >
      <nav
        aria-label="Main navigation"
        className="container-padding mx-auto flex h-full max-w-[var(--container-2xl)] items-center gap-3"
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 no-underline"
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg font-heading text-sm font-bold",
              "gradient-brand text-white shadow-sm",
              "transition-transform duration-200 group-hover:scale-105",
            )}
          >
            A
          </span>
          <span
            className={cn(
              "font-heading text-lg leading-none font-bold",
              onHero ? "text-white" : "text-foreground",
            )}
          >
            {siteConfig.shortName}
            <span className={onHero ? "text-harvest-400" : "text-primary"}>.</span>
          </span>
        </Link>

        <div className="ml-6 hidden items-center gap-1 md:flex">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium no-underline transition-colors duration-150",
                onHero
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground",
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
              onHero && "border-white/20 text-white hover:bg-white/10 hover:text-white",
            )}
          />

          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              onHero && "text-white hover:bg-white/10 hover:text-white",
            )}
          >
            <Link href="/auth/login">Log in</Link>
          </Button>

          <Button asChild size="sm" variant={onHero ? "harvest" : "default"}>
            <Link href="/auth/login">Register</Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className={cn(
              "md:hidden",
              onHero && "text-white hover:bg-white/10 hover:text-white",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-[var(--header-height)] border-b border-border bg-background shadow-md md:hidden"
        >
          <ul className="container-padding m-0 mx-auto max-w-[var(--container-2xl)] list-none space-y-1 py-4">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground no-underline hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Button asChild variant="outline" size="sm" fullWidth>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
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
