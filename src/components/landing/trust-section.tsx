/**
 * @file src/components/landing/trust-section.tsx
 * @description Trust pillars — verified farmers, payments, live auctions, speed.
 */

import { Section, SectionHeader } from "@/components/layouts";
import { LANDING_TRUST } from "@/constants/landing";
import { ShieldCheck, Lock, Gavel, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  shield: ShieldCheck,
  lock: Lock,
  gavel: Gavel,
  zap: Zap,
} as const;

export function TrustSection() {
  return (
    <Section id="trust" aria-label="Why trust AgroBid" variant="muted">
      <SectionHeader
        eyebrow="Trust"
        title="Built for fair, secure farm trade"
        description="Every listing and payment path is designed to protect Pakistani farmers and buyers."
        align="center"
        className="mx-auto"
      />

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
        {LANDING_TRUST.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <li key={item.id} className="flex flex-col items-start gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  "bg-primary/10 text-primary dark:bg-primary/20 border border-border/40"
                )}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
