import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Star, Heart, Image2, Briefcase, Globe, Search, ChevronDown } from "@/components/ui/icons";
import { createElement } from "react";

const expertiseIcons: Record<string, typeof Star> = {
  product: Star,
  ux: Heart,
  ui: Image2,
  system: Briefcase,
  wordpress: Globe,
  seo: Search,
};

export function About() {
  const { t } = useTranslation();
  const about = t.about;
  const labels = t.labels.assistant;
  const [expanded, setExpanded] = useState(false);
  const previewCount = 2;
  const hasMore = about.paragraphs.length > previewCount;
  const visible = expanded ? about.paragraphs : about.paragraphs.slice(0, previewCount);

  return (
    <section id="about" className="min-h-[100dvh] flex flex-col justify-center max-md:py-0 py-16 sm:py-24 md:pb-32 relative overflow-hidden">
      <FadeIn variant="fadeIn" duration={0.4}>
        <SectionTitle id="about">{about.label}</SectionTitle>
      </FadeIn>

      <div className="space-y-8">
        {/* Subtitle */}
        <FadeIn delay={0.05} variant="fadeUp" duration={0.5}>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-title leading-snug whitespace-pre-line">
            {about.subtitle}
          </p>
        </FadeIn>

        {/* Body paragraphs */}
        <div className="space-y-5">
          {visible.map((paragraph, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.06} variant="blurIn" duration={0.5}>
              <p className="text-sm sm:text-base text-body leading-[1.8] max-w-[56ch]">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>

        {/* Expand / Collapse */}
        {hasMore && (
          <FadeIn delay={0.1 + previewCount * 0.06} variant="fadeIn" duration={0.3}>
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-subtle hover:text-title transition-colors duration-200"
            >
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform duration-300"
                strokeWidth={2}
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              />
              {expanded ? labels.showLess : labels.showMore}
            </button>
          </FadeIn>
        )}

        {/* Expertise Grid — 2 rows × 3 columns */}
        <FadeIn delay={0.4} variant="fadeUp" duration={0.5}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {about.expertise.map((item) => {
              const d = expertiseIcons[item.icon];
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-2.5 p-3 rounded-lg"
                  style={{
                    background: "var(--card-bg-solid)",
                  }}
                >
                  {d && createElement(d, { className: "w-4 h-4 text-subtle shrink-0", strokeWidth: 1.5 })}
                  <span className="text-xs font-medium text-title leading-snug">
                    {item.title}
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
