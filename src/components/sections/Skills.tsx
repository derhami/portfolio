import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";

/* ─── Generic currentColor SVG icons ─── */

const genericIcons: Record<string, string> = {
  palette: "M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2zM12 18a3 3 0 100-6 3 3 0 000 6zM14.5 2v5.5H20",
  code: "M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16",
  workflow: "M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  "Product Design": "M12 2l5 5-5 5-5-5 5-5zM5 15h14v2H5v-2zM7 19h10v2H7v-2z",
  "UI Design": "M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zM6 6h12M10 18h4",
  "UX Research": "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v4l2.5 1.5",
  "Design Systems": "M12 2l2.5 4.5L19 8l-3 3.5L17 16l-5-2-5 2 1-4.5L5 8l4.5-1.5L12 2z",
  Prototyping: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  "Interaction Design": "M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zM8 22h8M12 15v7",
  Figma: "/assets/images/logos/figma.svg",
  Framer: "/assets/images/logos/framer.svg",
  "React / TypeScript": "/assets/images/logos/react.svg",
  TailwindCSS: "/assets/images/logos/tailwindcss.svg",
  "HTML / CSS": "M8 6l-6 6 6 6M16 6l6 6-6 6",
  JavaScript: "/assets/images/logos/javascript.svg",
  Git: "/assets/images/logos/git.svg",
  "Responsive Design": "M4 6h16v8H4V6zM7 18h10M8 14v4M16 14v4",
  "Design Strategy": "M12 2l2.5 4.5L19 8l-3 3.5L17 16l-5-2-5 2 1-4.5L5 8l4.5-1.5L12 2z",
  "User Research": "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  "Workshop Facilitation": "M12 2a3 3 0 100 6 3 3 0 000-6zM4 15a3 3 0 100 6 3 3 0 000-6zM20 15a3 3 0 100 6 3 3 0 000-6zM7 12l2.5 3L12 12l2.5 3L17 12",
  "Agile / Scrum": "M21 12a9 9 0 11-6.219-8.56M21 3v5h-5M21 3l-7.5 7.5",
  "Developer Handoff": "M5 12h14M12 5v14",
  Accessibility: "M12 4a2 2 0 100-4 2 2 0 000 4zM12 8c-4 0-6 1-8 3l1.5 1.5C7 11 8.5 10 12 10s5 1 6.5 2.5L20 11c-2-2-4-3-8-3zM10 14l-1 7h2l1-5 1 5h2l-1-7h-4z",
};

const GenericIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  );
};

function SkillIcon({ name, className }: { name: string; className?: string }) {
  const icon = genericIcons[name];

  if (!icon) return <GenericIcon className={className} />;

  if (icon.startsWith("/")) {
    return <img src={icon} alt={name} className={`${className || ""} object-contain`} loading="lazy" />;
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={icon} />
    </svg>
  );
}

export function Skills() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const groups = t.skills.groups;

  return (
    <section id="skills" className="py-16 sm:py-24 relative">
      <div
        className="absolute left-0 bottom-0 w-20 h-20 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <FadeIn>
        <p className="section-title text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-subtle mb-8 sm:mb-10 font-medium">
          {t.skills.label}
        </p>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.05}>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface border border-border mb-8 sm:mb-10 w-fit overflow-x-auto" role="tablist" aria-label={t.skills.label}>
          {groups.map((group, i) => (
            <button
              key={group.title}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`tabpanel-${i}`}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus-ring ${
                activeTab === i
                  ? "bg-card-solid text-title shadow-sm"
                  : "text-subtle hover:text-title hover:bg-surface-hover"
              }`}
            >
              <SkillIcon name={group.icon} className="w-4 h-4" />
              {group.title}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Skills grid */}
      <div className="relative" key={activeTab} role="tabpanel" id={`tabpanel-${activeTab}`} aria-label={groups[activeTab].title}>
        <FadeIn delay={0} y={8}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
            {groups[activeTab].items.map((skill) => (
              <div
                key={skill}
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-card-bg border border-card-border hover:bg-surface-hover hover:border-border transition-all duration-200 cursor-default"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-surface border border-border group-hover:bg-surface-hover transition-all duration-300 shrink-0">
                  <SkillIcon name={skill} className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-subtle group-hover:text-title transition-colors duration-200" />
                </div>
                <span className="text-xs sm:text-sm text-subtle group-hover:text-title transition-colors leading-snug">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
