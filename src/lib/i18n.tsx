import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Locale, Content } from "@/types/content";
import { enContent } from "@/content/en";
import { faContent } from "@/content/fa";

interface I18nContextValue {
  locale: Locale;
  content: Content;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  dir: "ltr" | "rtl";
}

const contentMap: Record<Locale, Content> = {
  en: enContent,
  fa: faContent,
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("locale") as Locale | null;
  if (saved && (saved === "en" || saved === "fa")) return saved;
  const browserLang = navigator.language.split("-")[0];
  return browserLang === "fa" ? "fa" : "en";
}

function validateSchema(enObj: Record<string, unknown>, faObj: Record<string, unknown>, path: string) {
  const issues: string[] = [];
  const allKeys = new Set([...Object.keys(enObj), ...Object.keys(faObj)]);
  for (const key of allKeys) {
    if (!(key in enObj)) {
      issues.push(`[en] missing key "${key}" at ${path}`);
    }
    if (!(key in faObj)) {
      issues.push(`[fa] missing key "${key}" at ${path}`);
    }
  }
  return issues;
}

function validateContentSchema(en: Content, fa: Content) {
  if (typeof import.meta === "undefined") return;
  if (!(import.meta as { env?: { DEV?: boolean } }).env?.DEV) return;

  const issues: string[] = [];

  issues.push(...validateSchema(en as unknown as Record<string, unknown>, fa as unknown as Record<string, unknown>, "root"));

  if (en.work?.items && fa.work?.items) {
    const enKeys = Object.keys(en.work.items);
    const faKeys = Object.keys(fa.work.items);
    const allProjectKeys = new Set([...enKeys, ...faKeys]);
    for (const slug of allProjectKeys) {
      if (!en.work.items[slug as keyof typeof en.work.items]) {
        issues.push(`[en] missing project "${slug}" in work.items`);
      }
      if (!fa.work.items[slug as keyof typeof fa.work.items]) {
        issues.push(`[fa] missing project "${slug}" in work.items`);
      }
    }
  }

  if (issues.length > 0) {
    console.warn("[i18n] Content schema validation issues:\n" + issues.join("\n"));
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    validateContentSchema(enContent, faContent);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "fa" ? "rtl" : "ltr";
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "fa" : "en");
  }, [locale, setLocale]);

  const value: I18nContextValue = {
    locale,
    content: contentMap[locale],
    setLocale,
    toggleLocale,
    dir: locale === "fa" ? "rtl" : "ltr",
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslation() {
  const { locale, content, setLocale, toggleLocale, dir } = useI18n();
  return { locale, t: content, setLocale, toggleLocale, dir };
}
