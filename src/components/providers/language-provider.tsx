"use client";

import * as React from "react";
import { type Language, translations, type TranslationKeys } from "@/config/i18n";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_COOKIE = "agrobid_lang";

export function LanguageProvider({
  initialLanguage = "en",
  children,
}: {
  initialLanguage?: Language;
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = React.useState<Language>(initialLanguage);

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang);
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, []);

  const toggleLanguage = React.useCallback(() => {
    const nextLang = language === "en" ? "ur" : "en";
    setLanguage(nextLang);
  }, [language, setLanguage]);

  React.useEffect(() => {
    // Read cookie on mount if available
    const match = document.cookie.match(new RegExp(`(^| )${LANGUAGE_COOKIE}=([^;]+)`));
    if (match && (match[2] === "en" || match[2] === "ur")) {
      const savedLang = match[2] as Language;
      setLanguageState(savedLang);
      document.documentElement.dir = savedLang === "ur" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }
  }, []);

  const t = React.useCallback(
    (key: TranslationKeys): string => {
      return translations[language][key] || translations.en[key] || key;
    },
    [language]
  );

  const value = React.useMemo(
    () => ({
      language,
      toggleLanguage,
      setLanguage,
      t,
      dir: (language === "ur" ? "rtl" : "ltr") as "ltr" | "rtl",
    }),
    [language, toggleLanguage, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
