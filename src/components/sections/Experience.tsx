import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Clock, Building2 } from "lucide-react";

const CURRENT_BLUE = "#0033FF";

export function Experience() {
  const { t, dir } = useTranslation();
  const items = t.experience.items;

  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      <FadeIn variant="fadeIn" duration={0.4}>
        <SectionTitle id="experience">{t.experience.label}</SectionTitle>
      </FadeIn>

      <div className="space-y-6 md:space-y-8">
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;

          return (
            <FadeIn key={item.id} delay={i * 0.1} variant="slideUp" duration={0.5}>
              <div className="relative flex items-stretch gap-4 md:gap-6">
                {/* Timeline dot — visible on md+ */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-[18px]"
                    style={{
                      backgroundColor: isCurrent ? CURRENT_BLUE : "var(--border)",
                    }}
                  />
                  {/* Vertical line connecting dots */}
                  {i < items.length - 1 && (
                    <div className="w-[1.5px] flex-1 mt-2" style={{ backgroundColor: "var(--border)" }} />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 min-w-0">
                  <div
                    className="relative p-5 sm:p-6 rounded-xl border transition-all duration-200"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-6 right-6 h-px"
                      style={{
                        background: isCurrent
                          ? `linear-gradient(90deg, ${CURRENT_BLUE}44, transparent)`
                          : "linear-gradient(90deg, var(--border), transparent)",
                      }}
                    />

                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <Building2 className="w-3.5 h-3.5 text-faint shrink-0" strokeWidth={1.5} />
                          <h3 className="text-sm sm:text-base font-semibold text-title truncate">
                            {item.company}
                          </h3>
                          {isCurrent && (
                            <span
                              className="shrink-0 text-[0.55rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full"
                              style={{
                                color: CURRENT_BLUE,
                                backgroundColor: `${CURRENT_BLUE}14`,
                              }}
                            >
                              {dir === "rtl" ? "در حال حاضر" : "Current"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-subtle truncate pl-6">{item.role}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-faint tabular-nums shrink-0 pt-0.5">
                        <Clock className="w-3 h-3" strokeWidth={1.5} />
                        {item.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-body leading-[1.7] mb-4 pl-6">
                      {item.description}
                    </p>

                    {/* Key Collabs */}
                    {item.keyCollabs && item.keyCollabs.length > 0 && (
                      <div className="mb-2.5 pl-6">
                        <span className="text-[0.55rem] text-faint font-medium uppercase tracking-widest block mb-1">
                          {t.labels.experience.clients}
                        </span>
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                          {item.keyCollabs.map((client) => (
                            <span
                              key={client}
                              className="text-[0.6rem] text-subtle"
                            >
                              {client}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills tags */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pl-6">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[0.55rem] text-faint rounded-sm"
                            style={{ backgroundColor: "var(--surface)" }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
