/**
 * @file src/components/business/quality-badge.tsx
 * @description Quality and grading badge for agricultural produce.
 *
 * Responsibilities:
 *  - Categorize crop/livestock quality tiers for buyer confidence
 *  - Map grades to design-system badge variants
 */

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Leaf, Award, ShieldAlert, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type QualityGradeType =
  | "grade_a_plus"
  | "grade_a"
  | "grade_b"
  | "organic"
  | "export_quality"
  | "standard";

export interface QualityBadgeProps {
  grade: QualityGradeType;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

const gradeConfig: Record<
  QualityGradeType,
  {
    label: string;
    variant: "default" | "secondary" | "harvest" | "outline" | "info" | "success";
    icon: React.ReactNode;
  }
> = {
  grade_a_plus: {
    label: "Grade A+ (Premium)",
    variant: "success",
    icon: <Sparkles className="h-3 w-3" />,
  },
  grade_a: {
    label: "Grade A",
    variant: "default",
    icon: <Award className="h-3 w-3" />,
  },
  grade_b: {
    label: "Grade B (Standard)",
    variant: "secondary",
    icon: <Check className="h-3 w-3" />,
  },
  organic: {
    label: "100% Organic",
    variant: "harvest",
    icon: <Leaf className="h-3 w-3" />,
  },
  export_quality: {
    label: "Export Quality",
    variant: "info",
    icon: <Award className="h-3 w-3" />,
  },
  standard: {
    label: "Commercial Grade",
    variant: "outline",
    icon: <ShieldAlert className="h-3 w-3" />,
  },
};

export function QualityBadge({
  grade,
  label,
  showIcon = true,
  className,
}: QualityBadgeProps) {
  const config = gradeConfig[grade] ?? gradeConfig.standard;
  const displayLabel = label ?? config.label;

  return (
    <Badge
      variant={config.variant}
      className={cn("gap-1 font-semibold text-xs", className)}
    >
      {showIcon ? <span className="shrink-0">{config.icon}</span> : null}
      <span>{displayLabel}</span>
    </Badge>
  );
}
