/**
 * @file src/app/page.tsx
 * @description AgroBid marketing landing page — composition of reusable sections.
 */

import type { Metadata } from "next";
import { SiteLayout } from "@/components/layouts";
import {
  HeroSection,
  TrustSection,
  HowItWorksSection,
  FeaturedAuctionsSection,
  PlatformStatsSection,
  TestimonialsSection,
  FaqSection,
  FinalCtaSection,
} from "@/components/landing";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — Livestock & Crop Auctions`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — Livestock & Crop Auctions`,
    description: siteConfig.description,
    url: "/",
  },
};

export default function LandingPage() {
  return (
    <SiteLayout transparentHeader>
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <FeaturedAuctionsSection />
      <PlatformStatsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </SiteLayout>
  );
}
