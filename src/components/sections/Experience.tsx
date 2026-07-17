import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Briefcase, MapPin, Clock } from "lucide-react";

const monthMap: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseStartDate(period: string): number {
  const match = period.match(/(\w+)\s+(\d{4})/);
  if (!match) return 0;
  const month = monthMap[match[1].toLowerCase()] ?? 0;
  return Number(match[2]) * 12 + month;
}

export function Experience() {
  const { t } = useTranslation();
  const items = useMemo(
    () => [...t.experience.items].sort((a, b) => parseStartDate(b.period) - parseStartDate(a.period)),
    [t.experience.items]
  );

  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      <FadeIn variant="fadeIn" duration={0.4}>
        <SectionTitle id="experience">{t.experience.label}</SectionTitle>
      </FadeIn>

      <div className="space-y-6">
        {items.map((item, i) => (
          <FadeIn key={item.id} delay={i * 0.1} variant="slideUp" duration={0.5}>
            <div className="group relative p-6 sm:p-7 md:p-8 rounded-2xl border border-border backdrop-blur-xl transition-all duration-200 hover:border-border-subtle"
              style={{
                backgroundColor: "var(--card-bg)",
              }}
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-faint shrink-0" strokeWidth={2} />
                    <h3 className="text-base sm:text-lg font-semibold text-title truncate">{item.company}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-subtle truncate pl-6">{item.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-faint tabular-nums font-medium">
                    <Clock className="w-3 h-3" strokeWidth={2} />
                    {item.period}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 text-[0.6rem] sm:text-[0.65rem] text-faint mt-0.5 justify-end">
                      <MapPin className="w-3 h-3" strokeWidth={2} />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>

              {item.type && (
                <p className="text-[0.6rem] sm:text-[0.65rem] text-faint mb-3 pl-6">{item.type}</p>
              )}

              <p className="text-sm sm:text-base text-body leading-[1.8] mb-5 pl-6">
                {item.description}
              </p>

              {item.keyCollabs && item.keyCollabs.length > 0 && (
                <div className="mb-4 pl-6">
                  <span className="text-[0.6rem] sm:text-[0.65rem] text-faint font-medium uppercase tracking-widest block mb-2">
                    {t.labels.experience.clients}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.keyCollabs.map((client) => (
                      <span
                        key={client}
                        className="inline-flex items-center px-2.5 py-1 text-[0.65rem] sm:text-xs text-subtle bg-surface border border-border rounded-md hover:bg-surface-hover hover:border-border transition-colors duration-150 cursor-default"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-6">
                  {item.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] text-faint bg-surface border border-border-subtle rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
