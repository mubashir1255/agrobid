"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-9 px-3 rounded-xl border-border/80 text-xs font-semibold gap-1.5 transition hover:bg-muted"
      title="Switch Language / زبان تبدیل کریں"
    >
      <Languages className="size-3.5 text-brand-600" />
      <span>{t("languageToggle")}</span>
    </Button>
  );
}
