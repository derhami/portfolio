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
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50" aria-label={t.labels.capsule.sectionNav}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-capsule-bg/80 backdrop-blur-xl shadow-[0_-15px_25px_-8px_var(--bg),0_15px_25px_-8px_var(--bg)]" role="menubar">
        {items.map((item) => {
          const Icon = navIcons[item.id];
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-full transition-all duration-200 focus-ring min-w-[52px] ${
                isActive
                  ? "text-title bg-surface-hover shadow-sm"
                  : "text-subtle hover:text-title hover:bg-surface-hover"
              }`}
              aria-label={item.label}
            >
              {Icon && <Icon className="w-5 h-5" strokeWidth={2} />}
              <span className="text-[0.5rem] leading-none font-medium whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}

        <div className="w-px h-7 bg-border mx-1" />

        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-full text-subtle hover:text-title hover:bg-surface-hover transition-all duration-200 focus-ring min-w-[52px]"
          aria-label={t.labels.capsule.toggleTheme}
        >
          {theme === "dark" ? <Sun className="w-5 h-5" strokeWidth={2} /> : <Moon className="w-5 h-5" strokeWidth={2} />}
          <span className="text-[0.5rem] leading-none font-medium">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>

        <button
          onClick={toggleLocale}
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-full text-subtle hover:text-title hover:bg-surface-hover transition-all duration-200 focus-ring min-w-[52px]"
          aria-label={t.labels.capsule.toggleLanguage}
        >
          <Globe className="w-5 h-5" strokeWidth={2} />
          <span className="text-[0.5rem] leading-none font-medium">{locale === "en" ? "FA" : "EN"}</span>
        </button>
      </div>
    </nav>
  );
}