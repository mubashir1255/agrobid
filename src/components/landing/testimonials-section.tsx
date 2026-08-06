/**
 * @file src/components/landing/testimonials-section.tsx
 * @description Farmer and buyer testimonials using existing Avatar + design tokens.
 */

"use client";

import { Section, SectionHeader } from "@/components/layouts";
import { Avatar } from "@/components/ui/avatar";
import { LANDING_TESTIMONIALS } from "@/constants/landing";
import { getInitials } from "@/utils/format";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <Section
      id="testimonials"
      aria-label="Customer testimonials"
      variant="muted"
    >
      <SectionHeader
        eyebrow="Stories"
        title="Trusted by farmers and buyers"
        description="Hear from people already trading livestock and crops on AgroBid."
        align="center"
        className="mx-auto"
      />

      <ul className="grid gap-8 lg:grid-cols-3 list-none p-0 m-0">
        {LANDING_TESTIMONIALS.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-5 border-t border-border pt-6"
          >
            <div
              className="flex items-center gap-1"
              aria-label={`Rated ${item.rating} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < item.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  )}
                  aria-hidden
                />
              ))}
            </div>

            <blockquote className="flex-1">
              <p className="text-sm sm:text-base text-foreground leading-relaxed text-pretty">
                “{item.quote}”
              </p>
            </blockquote>

            <footer className="flex items-center gap-3 mt-auto">
              <Avatar
                src={item.avatarUrl}
                alt={item.name}
                fallback={getInitials(item.name)}
                size="md"
              />
              <div className="min-w-0">
                <cite className="not-italic font-heading font-semibold text-sm text-foreground block truncate">
                  {item.name}
                </cite>
                <p className="text-xs text-muted-foreground truncate">
                  {item.role}
                </p>
              </div>
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
