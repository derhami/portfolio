import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Clock, Building2 } from "@/components/ui/icons";

const CURRENT_BLUE = "#0033FF";

const lineTransition = { duration: 1.4, ease: [0.22, 0.03, 0.26, 1] as const };
const dotTransition = { duration: 0.6, ease: [0.22, 0.03, 0.26, 1] as const };

export function Experience() {
  const { t, dir } = useTranslation();
  const items = t.experience.items;

  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      <FadeIn variant="fadeIn" duration={0.4}>
        <SectionTitle id="experience">{t.experience.label}</SectionTitle>
      </FadeIn>

      <div className="relative">
        {/* Static background line — visible on md+ */}
        <div
          className="hidden md:block absolute top-3 bottom-3 w-px bg-border"
          style={{ [dir === "rtl" ? "right" : "left"]: "11px" }}
        />

        {/* Animated foreground line — reveals top→bottom on scroll */}
        <motion.div
          className="hidden md:block absolute top-3 w-px"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "top", backgroundColor: "var(--brand)", [dir === "rtl" ? "right" : "left"]: "11px" }}
          transition={lineTransition}
        />

        <div className="space-y-6 md:space-y-8">
          {items.map((item, i) => {
            const isCurrent = i === items.length - 1;

            return (
              <FadeIn key={item.id} delay={i * 0.1} variant="slideUp" duration={0.5}>
                <div className="relative flex items-stretch gap-4 md:gap-6" style={{ [dir === "rtl" ? "paddingRight" : "paddingLeft"]: "2.5rem" }}>
                  {/* Timeline dot — visible on md+ */}
                  <div className="hidden md:block absolute top-[18px]" style={{ [dir === "rtl" ? "right" : "left"]: "5px" }}>
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      initial={{ scale: 0, backgroundColor: "var(--border)" }}
                      whileInView={{ scale: 1, backgroundColor: isCurrent ? CURRENT_BLUE : "var(--border)" }}
                      viewport={{ once: true }}
                      transition={{ ...dotTransition, delay: 0.2 }}
                    />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="relative p-6 sm:p-7 rounded-xl border transition-all duration-200"
                      style={{
                        backgroundColor: "var(--card-bg)",
                        borderColor: "var(--border)",
                      }}
                    >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 mb-1">
                          <h3 className="text-sm sm:text-base font-semibold text-title">
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
                        <p className="text-xs sm:text-sm text-subtle">{item.role}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-faint tabular-nums shrink-0 pt-0.5">
                        <Clock className="w-3 h-3" strokeWidth={1.5} />
                        {item.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-body leading-[1.8] mb-5">
                      {item.description}
                    </p>

                    {/* Key Collabs */}
                    {item.keyCollabs && item.keyCollabs.length > 0 && (
                      <div className="mb-4">
                        <span className="flex items-center gap-1.5 text-[0.55rem] text-faint font-medium uppercase tracking-widest mb-2.5">
                          <Building2 className="w-3 h-3" strokeWidth={1.5} />
                          {t.labels.experience.clients}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.keyCollabs.map((client) => (
                            <span
                              key={client}
                              className="px-2.5 py-1 text-[0.6rem] font-medium rounded-md"
                              style={{
                                color: "var(--subtle)",
                                backgroundColor: "var(--surface)",
                                border: "1px solid var(--border-subtle)",
                              }}
                            >
                              {client}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills tags */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[0.5rem] text-faint rounded-sm"
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
      </div>
    </section>
  );
}
