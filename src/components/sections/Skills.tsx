import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";

const brandLogos: Record<string, React.FC<{ className?: string }>> = {
  Figma: ({ className }) => (
    <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2534 23.2534 19 28.5 19C33.7466 19 38 23.2534 38 28.5C38 33.7466 33.7466 38 28.5 38C23.2534 38 19 33.7466 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2534 4.25339 37.5 9.5 37.5H19V47.5C19 52.7466 14.7466 57 9.5 57C4.25339 57 0 52.7466 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7466 19 38 14.7466 38 9.5C38 4.25339 33.7466 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7466 4.25339 19 9.5 19H19V0H9.5C4.25339 0 0 4.25339 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7466 4.25339 38 9.5 38H19V19H9.5C4.25339 19 0 23.2534 0 28.5Z" fill="#A259FF"/>
    </svg>
  ),
  Framer: ({ className }) => (
    <svg className={className} viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 24V12H12L24 0H0V24Z" fill="#05F"/>
      <path d="M0 36V24H12L24 12H12L0 24V36Z" fill="#05F"/>
      <path d="M12 24V12H24L12 24Z" fill="#05F"/>
    </svg>
  ),
  React: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)"/>
    </svg>
  ),
  TailwindCSS: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C8 6 6 8 4 10C6 8 8 8 10 10C8 12 6 16 4 18C6 16 8 16 10 18C12 20 14 20 16 18C18 16 20 12 22 10C20 12 18 12 16 14C18 12 20 8 22 6C20 8 18 8 16 10C14 8 12 6 12 6Z" fill="#38BDF8"/>
    </svg>
  ),
  JavaScript: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path d="M7 18.5V7.5H10.5C12.5 7.5 13.5 8.5 13.5 10C13.5 11.5 12.5 12 11.5 12.5C12.8 13 14 14 14 16C14 18.5 12 18.5 10 18.5H7ZM9 10H9.5C10 10 10.5 9.5 10.5 9C10.5 8.5 10 8 9.5 8H9V10ZM9.5 16.5H10C10.5 16.5 11 16 11 15.5C11 15 10.5 14.5 10 14.5H9V16.5Z" fill="#323330"/>
      <path d="M15 18.5V7.5H18.5C20.5 7.5 21.5 9 21.5 11C21.5 13 20.5 14 19 14H17V18.5H15ZM17 12H18C19 12 19.5 11.5 19.5 11C19.5 10.5 19 10 18 10H17V12Z" fill="#323330"/>
    </svg>
  ),
  Git: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.2 11.5L12.8 1.1C12.4 0.7 11.8 0.7 11.4 1.1L9.3 3.2L11.6 5.5C12.1 5 12.8 4.7 13.5 4.7C15 4.7 16.2 5.9 16.2 7.4V7.9H18.5C20.4 7.9 22 9.5 22 11.4C22 13.3 20.4 14.9 18.5 14.9H17.8V17.4C17.8 19.8 15.8 21.8 13.4 21.8C11 21.8 9 19.8 9 17.4V16.4H7V17.4C7 20.9 9.9 23.8 13.4 23.8C16.9 23.8 19.8 20.9 19.8 17.4V14.9C21 14.9 22 13.9 22 12.7" fill="#F05032"/>
    </svg>
  ),
  Accessibility: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="4" r="2" fill="currentColor"/>
      <path d="M12 8C8 8 6 9 4 11L5.5 12.5C7 11 8.5 10 12 10C15.5 10 17 11 18.5 12.5L20 11C18 9 16 8 12 8Z" fill="currentColor"/>
      <path d="M10 14L9 21H11L12 16L13 21H15L14 14H10Z" fill="currentColor"/>
    </svg>
  ),
  Design: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="14" y="14" width="7" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  Development: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6L22 12L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Process: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <circle cx="12" cy="4" r="2" fill="currentColor"/>
      <circle cx="19" cy="8" r="2" fill="currentColor"/>
      <circle cx="19" cy="16" r="2" fill="currentColor"/>
      <circle cx="12" cy="20" r="2" fill="currentColor"/>
      <circle cx="5" cy="16" r="2" fill="currentColor"/>
      <circle cx="5" cy="8" r="2" fill="currentColor"/>
      <path d="M12 6V9M16.2 9.5L14.5 10.5M17.5 15L15.5 14M12 15V18M7.8 14.5L9.5 13.5M6.5 9L8.5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
};

const FallbackIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <path d="M9 9h6M9 12h6M9 15h4"/>
  </svg>
);

export function Skills() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const groups = t.skills.groups;

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="section-divider mb-20 sm:mb-28" />

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
          {groups.map((group, i) => {
            const Logo = brandLogos[group.icon] || FallbackIcon;
            return (
              <button
                key={group.title}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`tabpanel-${i}`}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 focus-ring ${
                  activeTab === i
                    ? "bg-card-solid text-title shadow-sm"
                    : "text-subtle hover:text-title hover:bg-surface-hover"
                }`}
              >
                <Logo className="w-4 h-4" />
                {group.title}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Skills grid */}
      <div className="relative" key={activeTab} role="tabpanel" id={`tabpanel-${activeTab}`} aria-label={groups[activeTab].title}>
        <FadeIn delay={0} y={8}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
            {groups[activeTab].items.map((skill) => {
              const Logo = brandLogos[skill] || FallbackIcon;
              return (
                <div
                  key={skill}
                  className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-card-bg border border-card-border hover:bg-surface-hover hover:border-border transition-all duration-300 cursor-default"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-surface border border-border group-hover:bg-surface-hover transition-all duration-300 shrink-0">
                    <Logo className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-subtle group-hover:text-title transition-colors" />
                  </div>
                  <span className="text-xs sm:text-sm text-subtle group-hover:text-title transition-colors leading-snug">
                    {skill}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
