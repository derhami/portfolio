import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Briefcase, History, Zap, Send, Sun, Moon, Globe, House } from "lucide-react";

const navIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  home: House,
  work: Briefcase,
  experience: History,
  skills: Zap,
  contact: Send,
};

export function CapsuleMenu() {
  const { t, locale, toggleLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "skills", "experience", "work", "hero"];
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
      if (window.scrollY < 100) setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { id: "home", label: t.labels.nav.home, href: "#hero" },
    { id: "work", label: t.labels.nav.work, href: "#work" },
    { id: "experience", label: t.labels.nav.experience, href: "#experience" },
    { id: "skills", label: t.labels.nav.skills, href: "#skills" },
    { id: "contact", label: t.labels.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50" aria-label={t.labels.capsule.sectionNav}>
      <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-full glass-capsule" role="menubar">
        {items.map((item) => {
          const Icon = navIcons[item.id];
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`group flex flex-col items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-200 focus-ring ${
                isActive
                  ? "text-title bg-white/25 dark:bg-white/15 shadow-sm"
                  : "text-title/80 dark:text-title/70 hover:text-title hover:bg-white/20 dark:hover:bg-white/10"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {Icon && <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" strokeWidth={2} />}
              <span className="text-[0.6rem] sm:text-[0.65rem] font-normal leading-none whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}

        <div className="w-px h-6 sm:h-7 bg-title/20 dark:bg-title/15 mx-0.5 sm:mx-1" />

        <button
          onClick={toggleTheme}
          className="group flex flex-col items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-title/80 dark:text-title/70 hover:text-title hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 focus-ring"
          aria-label={t.labels.capsule.toggleTheme}
        >
          <span className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
            {theme === "dark" ? <Sun className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} /> : <Moon className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} />}
          </span>
          <span className="text-[0.6rem] sm:text-[0.65rem] font-normal leading-none whitespace-nowrap">
            {theme === "dark" ? t.labels.capsule.themeLight : t.labels.capsule.themeDark}
          </span>
        </button>

        <button
          onClick={toggleLocale}
          className="group flex flex-col items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-title/80 dark:text-title/70 hover:text-title hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 focus-ring"
          aria-label={t.labels.capsule.toggleLanguage}
        >
          <Globe className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" strokeWidth={2} />
          <span className="text-[0.6rem] sm:text-[0.65rem] font-normal leading-none whitespace-nowrap">
            {locale === "en" ? t.labels.capsule.langFa : t.labels.capsule.langEn}
          </span>
        </button>
      </div>
    </nav>
  );
}
