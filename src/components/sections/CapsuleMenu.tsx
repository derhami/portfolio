import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

export function CapsuleMenu() {
  const { t, locale, toggleLocale, dir } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "skills", "experience", "work"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { id: "work", label: t.labels.nav.work, href: "#work" },
    { id: "experience", label: t.labels.nav.experience, href: "#experience" },
    { id: "skills", label: t.labels.nav.skills, href: "#skills" },
    { id: "contact", label: t.labels.nav.contact, href: "#contact" },
  ];

  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50" aria-label={t.labels.capsule.sectionNav}>
      <div className="flex items-center gap-1 sm:gap-0.5 px-2 sm:px-1.5 py-2 sm:py-1.5 rounded-full bg-capsule-bg/80 backdrop-blur-xl border border-capsule-border shadow-lg" role="menubar">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            role="menuitem"
            className={`px-4 sm:px-3.5 py-2.5 sm:py-2 text-[0.7rem] sm:text-xs font-medium rounded-full transition-all duration-200 focus-ring whitespace-nowrap ${
              activeSection === item.id
                ? "text-title bg-surface-hover shadow-sm"
                : "text-subtle hover:text-title hover:bg-surface-hover"
            }`}
          >
            {item.label}
          </a>
        ))}

        <div className="w-px h-4 bg-border mx-1.5 sm:mx-1" />

        <button
          onClick={toggleTheme}
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-faint hover:text-title hover:bg-surface-hover transition-all duration-200 focus-ring"
          aria-label={t.labels.capsule.toggleTheme}
        >
          {theme === "dark" ? <Sun className="w-4 h-4 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} /> : <Moon className="w-4 h-4 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />}
        </button>

        <button
          onClick={toggleLocale}
          className="flex items-center gap-1 px-3.5 sm:px-3 py-2.5 sm:py-2 text-[0.7rem] sm:text-xs font-medium text-faint hover:text-title hover:bg-surface-hover rounded-full transition-all duration-200 focus-ring"
          aria-label={t.labels.capsule.toggleLanguage}
        >
          <Chevron className="w-3.5 h-3.5 sm:w-3 sm:h-3" strokeWidth={2} />
          {locale === "en" ? "فا" : "EN"}
        </button>
      </div>
    </nav>
  );
}
