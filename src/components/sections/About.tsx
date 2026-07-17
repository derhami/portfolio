import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <FadeIn>
        <p className="section-title text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-subtle mb-8 sm:mb-10 font-medium">
          {t.about.label}
        </p>
      </FadeIn>
      <div className="space-y-5 sm:space-y-6">
        {t.about.paragraphs.map((paragraph, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <p className="text-sm sm:text-base md:text-lg text-body leading-[1.8]">
              {paragraph}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
