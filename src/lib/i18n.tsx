import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Locale } from "@/types/content";
import type { Content } from "@/types/content";
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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

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
