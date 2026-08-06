/**
 * @file src/components/landing/final-cta-section.tsx
 * @description Closing conversion band with primary and secondary CTAs.
 */

import Link from "next/link";
import { Section } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { LANDING_FINAL_CTA } from "@/constants/landing";
import { ArrowRight } from "lucide-react";

export function FinalCtaSection() {
  const { title, description, primaryCta, secondaryCta } = LANDING_FINAL_CTA;

  return (
    <Section
      id="get-started"
      aria-label="Get started with AgroBid"
      variant="primary"
      className="relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.802 0.189 79.2 / 0.45), transparent 45%), radial-gradient(circle at 80% 80%, oklch(1 0 0 / 0.2), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center space-y-6">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white text-balance">
          {title}
        </h2>
        <p className="text-white/85 text-base sm:text-lg text-pretty leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild size="lg" variant="harvest" className="shadow-md">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
