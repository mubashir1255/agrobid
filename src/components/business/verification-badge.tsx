/**
 * @file src/components/business/verification-badge.tsx
 * @description Trust verification badge for sellers, livestock, and produce.
 *
 * Responsibilities:
 *  - Display verification tier (Govt, Vet, NADRA Biometric, KYC, Quality)
 *  - Tooltip with trust criteria details
 *  - Compact (icon-only) and expanded (icon + label) modes
 */

import * as React from "react";
import { SimpleTooltip } from "@/components/ui/tooltip";
import {
  ShieldCheck,
  Award,
  Stethoscope,
  Fingerprint,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type VerificationType =
  | "govt_verified"
  | "vet_certified"
  | "biometric_verified"
  | "kyc_verified"
  | "quality_certified";

export interface VerificationBadgeProps {
  type: VerificationType;
  /** Display text override */
  label?: string;
  /** Compact icon-only button with tooltip */
  compact?: boolean;
  className?: string;
}

const verificationConfig: Record<
  VerificationType,
  {
    label: string;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
  }
> = {
  govt_verified: {
    label: "Govt Verified",
    description:
      "Verified against Ministry of Agriculture & Livestock records.",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    colorClass:
      "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  vet_certified: {
    label: "Vet Certified",
    description:
      "Inspected and certified healthy by a registered Veterinary Officer.",
    icon: <Stethoscope className="h-3.5 w-3.5" />,
    colorClass:
      "bg-sky-500/10 text-sky-800 border-sky-500/30 dark:bg-sky-500/20 dark:text-sky-300",
  },
  biometric_verified: {
    label: "NADRA Biometric",
    description: "Seller identity biometrically verified via NADRA system.",
    icon: <Fingerprint className="h-3.5 w-3.5" />,
    colorClass:
      "bg-amber-500/10 text-amber-800 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-300",
  },
  kyc_verified: {
    label: "KYC Verified",
    description: "Bank account and identity document verification complete.",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    colorClass:
      "bg-primary/10 text-primary border-primary/30 dark:bg-primary/20 dark:text-primary",
  },
  quality_certified: {
    label: "Grade Certified",
    description:
      "Sample tested for moisture, purity, and grade quality compliance.",
    icon: <Award className="h-3.5 w-3.5" />,
    colorClass:
      "bg-harvest-500/15 text-harvest-900 border-harvest-500/40 dark:bg-harvest-500/25 dark:text-harvest-100",
  },
};

export function VerificationBadge({
  type,
  label,
  compact = false,
  className,
}: VerificationBadgeProps) {
  const config = verificationConfig[type] ?? verificationConfig.kyc_verified;
  const displayLabel = label ?? config.label;

  const badgeContent = compact ? (
    <span
      className={cn(
        "inline-flex items-center justify-center p-1 rounded-full border shadow-2xs transition-transform hover:scale-105 cursor-help",
        config.colorClass,
        className
      )}
      aria-label={displayLabel}
    >
      {config.icon}
    </span>
  ) : (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-2xs select-none",
        config.colorClass,
        className
      )}
    >
      {config.icon}
      <span>{displayLabel}</span>
    </span>
  );

  return (
    <SimpleTooltip content={<p className="text-xs max-w-xs">{config.description}</p>}>
      {badgeContent}
    </SimpleTooltip>
  );
}
