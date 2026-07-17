import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <FadeIn variant="fadeIn" duration={0.4}>
        <SectionTitle id="about">{t.about.label}</SectionTitle>
      </FadeIn>
      <div className="space-y-5 sm:space-y-6">
        {t.about.paragraphs.map((paragraph, i) => (
          <FadeIn key={i} delay={i * 0.08} variant="blurIn" duration={0.5}>
            <p className="text-sm sm:text-base md:text-lg text-body leading-[1.8]">
              {paragraph}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
