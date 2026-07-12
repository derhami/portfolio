import { useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setJsonLd(data: Record<string, unknown>) {
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function Seo() {
  const { t, locale } = useTranslation();

  useEffect(() => {
    document.title = t.seo.title;

    setMeta("name", "description", t.seo.description);
    setMeta("name", "author", t.seo.author);

    setMeta("property", "og:title", t.seo.ogTitle);
    setMeta("property", "og:description", t.seo.ogDescription);
    setMeta("property", "og:url", t.seo.ogUrl);
    setMeta("property", "og:site_name", t.seo.ogSiteName);
    setMeta("property", "og:locale", locale === "fa" ? "fa_IR" : "en_US");

    setMeta("name", "twitter:title", t.seo.ogTitle);
    setMeta("name", "twitter:description", t.seo.ogDescription);

    setJsonLd(t.seo.jsonLd);
  }, [t, locale]);

  return null;
}
