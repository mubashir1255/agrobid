/**
 * @file src/components/landing/faq-section.tsx
 * @description Landing FAQ — reuses Accordion for accessible Q&A.
 */

"use client";

import { Section, SectionHeader } from "@/components/layouts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LANDING_FAQ } from "@/constants/landing";

export function FaqSection() {
  return (
    <Section id="faq" aria-label="Frequently asked questions">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 items-start">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions buyers and sellers ask most"
          description="Clear answers on verification, payments, and how auctions work on AgroBid."
          align="left"
          className="mb-0 lg:mb-0 sticky top-[calc(var(--header-height)+1.5rem)]"
        />

        <Accordion type="single" collapsible className="w-full" defaultValue="faq-1">
          {LANDING_FAQ.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-[15px]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
