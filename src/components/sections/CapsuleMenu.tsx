import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Briefcase, History, Message1, Sun, Moon, Globe, House, User } from "@/components/ui/icons";

const navIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  home: House,
  about: User,
  work: Briefcase,
  experience: History,
  contact: Message1,
};

const shortLabels: Record<string, { en: string; fa: string }> = {
  experience: { en: "Exp", fa: "تجربه" },
};

const itemBase =
  "group capsule-item relative flex flex-col items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-300 focus-ring select-none";

const itemInactive =
  "text-title/80 dark:text-title/70 hover:text-title hover:bg-black/[0.06] dark:hover:bg-white/[0.1]";

const itemActive =
  "text-title bg-black/10 dark:bg-white/20";

export function CapsuleMenu() {
  const { t, locale, toggleLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionIds = ["hero", "about", "experience", "work", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id === "hero" ? "home" : id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const items = [
    { id: "home", label: t.labels.nav.home, href: "#hero" },
    { id: "about", label: t.labels.nav.about, href: "#about" },
    { id: "experience", label: t.labels.nav.experience, href: "#experience" },
    { id: "work", label: t.labels.nav.work, href: "#work" },
    { id: "contact", label: t.labels.nav.contact, href: "#contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 select-none"
      aria-label={t.labels.capsule.sectionNav}
    >
      <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-full glass-capsule" role="menubar">
        {items.map((item) => {
          const Icon = navIcons[item.id];
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`${itemBase} ${isActive ? itemActive : itemInactive}`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && <span className="capsule-active-glow" />}
              {Icon && <Icon className="capsule-icon w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} />}
              <span className="text-[0.6rem] sm:text-[0.65rem] font-normal leading-none whitespace-nowrap">
                {shortLabels[item.id] ? shortLabels[item.id][locale] || item.label : item.label}
              </span>
            </a>
          );
        })}

        <div className="w-px h-6 sm:h-7 bg-title/20 dark:bg-title/15 mx-0.5 sm:mx-1" />

        <button
          onClick={toggleTheme}
          className={`${itemBase} ${itemInactive}`}
          aria-label={t.labels.capsule.toggleTheme}
        >
          <span className="capsule-icon">
            {theme === "dark" ? <Sun className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} /> : <Moon className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} />}
          </span>
          <span className="text-[0.6rem] sm:text-[0.65rem] font-normal leading-none whitespace-nowrap">
            {theme === "dark" ? t.labels.capsule.themeLight : t.labels.capsule.themeDark}
          </span>
        </button>

        <button
          onClick={toggleLocale}
          className={`${itemBase} ${itemInactive}`}
          aria-label={t.labels.capsule.toggleLanguage}
        >
          <span className="capsule-icon">
            <Globe className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={2} />
          </span>
          <span className="text-[0.6rem] sm:text-[0.65rem] font-normal leading-none whitespace-nowrap">
            {locale === "en" ? "FA" : "EN"}
          </span>
        </button>
      </div>
    </nav>
  );
}