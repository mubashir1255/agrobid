/**
 * @file src/components/landing/hero-section.tsx
 * @description Full-bleed marketing hero — brand, headline, CTAs, agricultural photo.
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/container";
import { LANDING_HERO } from "@/constants/landing";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { brand, headline, description, primaryCta, secondaryCta, image } =
    LANDING_HERO;

  return (
    <section
      aria-label="Hero"
      className="relative isolate min-h-[100svh] flex items-end sm:items-center overflow-hidden"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover animate-in fade-in duration-1000 zoom-in-95"
      />

      {/* Readability gradient — not a badge/overlay chip */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25 dark:from-black/90 dark:via-black/55 dark:to-black/35"
        aria-hidden="true"
      />

      <Container
        size="2xl"
        className="relative z-10 pb-16 pt-[calc(var(--header-height)+2rem)] sm:pb-24 sm:pt-[calc(var(--header-height)+3rem)]"
      >
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <p className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {brand}
            <span className="text-harvest-400">.</span>
          </p>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white/95 text-balance leading-tight">
            {headline}
          </h1>

          <p className="text-base sm:text-lg text-white/80 text-pretty max-w-[42ch] leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
