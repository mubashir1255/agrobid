/**
 * @file src/components/landing/platform-stats-section.tsx
 * @description Platform KPIs — reuses StatisticsCard with landing mock stats.
 */

import { Section, SectionHeader } from "@/components/layouts";
import { StatisticsCard } from "@/components/business/statistics-card";
import { LANDING_STATS } from "@/constants/landing";
import { Users, Gavel, ShoppingBag, TrendingUp } from "lucide-react";

const STAT_ICONS = {
  farmers: <Users className="h-6 w-6" />,
  auctions: <Gavel className="h-6 w-6" />,
  sales: <ShoppingBag className="h-6 w-6" />,
  volume: <TrendingUp className="h-6 w-6" />,
} as const;

export function PlatformStatsSection() {
  return (
    <Section id="stats" aria-label="Platform statistics">
      <SectionHeader
        eyebrow="By the numbers"
        title="A marketplace farmers already trust"
        description="Real activity across Pakistan’s agricultural regions — updated as trade grows."
        align="center"
        className="mx-auto"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LANDING_STATS.map((stat) => (
          <StatisticsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            iconVariant={stat.iconVariant}
            trendPercentage={stat.trendPercentage}
            icon={STAT_ICONS[stat.id]}
          />
        ))}
      </div>
    </Section>
  );
}
