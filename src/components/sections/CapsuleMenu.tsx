import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Briefcase, History, Zap, Send, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

const navIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  work: Briefcase,
  experience: History,
  skills: Zap,
  contact: Send,
};

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
      <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-capsule-bg/80 backdrop-blur-xl border border-capsule-border shadow-lg" role="menubar">
        {items.map((item) => {
          const Icon = navIcons[item.id];
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:px-3.5 sm:py-2 rounded-full transition-all duration-200 focus-ring ${
                isActive
                  ? "text-title bg-surface-hover shadow-sm"
                  : "text-subtle hover:text-title hover:bg-surface-hover"
              }`}
              aria-label={item.label}
            >
              {Icon && <Icon className="w-[18px] h-[18px] sm:w-4 sm:h-4" strokeWidth={1.5} />}
              <span className="hidden sm:inline text-[0.7rem] sm:text-xs font-medium whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}

        <div className="w-px h-5 sm:h-4 bg-border mx-0.5 sm:mx-1.5" />

        <button
          onClick={toggleTheme}
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-faint hover:text-title hover:bg-surface-hover transition-all duration-200 focus-ring"
          aria-label={t.labels.capsule.toggleTheme}
        >
          {theme === "dark" ? <Sun className="w-[18px] h-[18px] sm:w-4 sm:h-4" strokeWidth={1.5} /> : <Moon className="w-[18px] h-[18px] sm:w-4 sm:h-4" strokeWidth={1.5} />}
        </button>

        <button
          onClick={toggleLocale}
          className="flex items-center justify-center gap-1 w-9 h-9 sm:px-3 sm:py-2 sm:w-auto sm:h-auto text-[0.7rem] sm:text-xs font-medium text-faint hover:text-title hover:bg-surface-hover rounded-full transition-all duration-200 focus-ring"
          aria-label={t.labels.capsule.toggleLanguage}
        >
          <Chevron className="w-3.5 h-3.5 sm:w-3 sm:h-3" strokeWidth={2} />
          <span className="hidden sm:inline">{locale === "en" ? "فا" : "EN"}</span>
        </button>
      </div>
    </nav>
  );
}
