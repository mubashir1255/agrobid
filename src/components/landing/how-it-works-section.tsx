/**
 * @file src/components/landing/how-it-works-section.tsx
 * @description Four-step onboarding flow for buyers and sellers.
 */

import { Section, SectionHeader } from "@/components/layouts";
import { LANDING_HOW_IT_WORKS } from "@/constants/landing";

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" aria-label="How AgroBid works">
      <SectionHeader
        eyebrow="How it works"
        title="From registration to payout in four steps"
        description="Whether you are listing a harvest or placing a bid, the path is the same: clear, verified, and fast."
        align="center"
        className="mx-auto"
      />

      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0 relative">
        {LANDING_HOW_IT_WORKS.map((step, index) => (
          <li key={step.step} className="relative flex flex-col gap-3">
            {index < LANDING_HOW_IT_WORKS.length - 1 ? (
              <span
                className="hidden lg:block absolute top-5 left-[calc(3rem+0.5rem)] right-0 h-px bg-border"
                aria-hidden="true"
              />
            ) : null}

            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono text-sm font-bold shadow-sm">
              {step.step}
            </span>
            <h3 className="font-heading text-lg font-bold text-foreground">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
