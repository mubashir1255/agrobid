/**
 * @file src/components/layouts/site-layout.tsx
 *
 * SiteLayout — the standard shell for marketing and public-facing pages.
 *
 * Structure:
 *   ┌─────────────────────────────────────────┐
 *   │  <Header />  (sticky top navigation)    │
 *   ├─────────────────────────────────────────┤
 *   │  <main id="main-content">               │
 *   │    {children}                           │
 *   │  </main>                                │
 *   ├─────────────────────────────────────────┤
 *   │  <Footer />  (site-wide footer)         │
 *   └─────────────────────────────────────────┘
 *
 * Notes:
 *   - Sets `id="main-content"` on <main> so the skip link works
 *   - Header and Footer are placeholder shells until built out
 *   - Uses flex-col + flex-1 on <main> to push footer to the bottom
 *   - Server Component by default (no "use client" needed)
 */

import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";

interface SiteLayoutProps {
  /** Page content rendered between header and footer */
  children: React.ReactNode;
  /** Additional classes applied to the outer wrapper */
  className?: string;
  /**
   * When true, the header will be absolutely positioned and transparent
   * (useful for hero-first pages that need full-bleed imagery under the header).
   */
  transparentHeader?: boolean;
}

/**
 * SiteLayout — wraps public pages with header and footer.
 *
 * @example
 * // app/(marketing)/page.tsx
 * export default function HomePage() {
 *   return (
 *     <SiteLayout>
 *       <HeroSection />
 *       <FeaturesSection />
 *     </SiteLayout>
 *   );
 * }
 */
export function SiteLayout({
  children,
  className,
  transparentHeader = false,
}: SiteLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <SiteHeader transparent={transparentHeader} />

      <main
        id="main-content"
        tabIndex={-1} // Makes the skip link target focusable
        className={cn(
          "flex flex-1 flex-col outline-none",
          // When header is transparent, let content start at viewport top
          transparentHeader ? "pt-0" : "pt-[var(--header-height)]",
        )}
      >
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
