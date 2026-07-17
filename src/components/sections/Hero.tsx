import { useTranslation } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";

export function Hero() {
  const { t, dir } = useTranslation();
  const isRtl = dir === "rtl";
  const PrimaryIcon = isRtl ? ArrowLeft : ArrowRight;

  const paragraphs = t.hero.description.split("\n\n").filter(Boolean);

  return (
    <section className="min-h-screen flex items-center relative">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-color) 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col">
          {/* Portrait */}
          <FadeIn delay={0} variant="scaleIn" className="mb-6" duration={0.6}>
            <div className="relative inline-block">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-brand/20 to-transparent opacity-60 blur-sm" />
              <img
                src={siteConfig.assets.profile}
                alt={t.hero.name}
                loading="eager"
                decoding="async"
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl object-cover ring-1 ring-border bg-surface"
              />
            </div>
          </FadeIn>

          {/* Content */}
          <div className="flex-1">
            <div className="space-y-4">
              <FadeIn delay={0.1} variant="slideUp" duration={0.55}>
                <div className="space-y-1.5">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-title whitespace-nowrap">
                    {t.hero.name}
                  </h1>
                  <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-subtle font-medium">
                    {t.hero.role}
                  </p>
                </div>
              </FadeIn>

              {t.hero.tagline && (
                <FadeIn delay={0.15} variant="blurIn" duration={0.5}>
                  <p className="text-sm sm:text-base text-subtle leading-relaxed max-w-xl">
                    {t.hero.tagline}
                  </p>
                </FadeIn>
              )}

              <FadeIn delay={0.2} variant="fadeUp" duration={0.5}>
                <div className="space-y-3">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="text-sm sm:text-base md:text-lg text-body leading-[1.8]">
                      {para}
                    </p>
                  ))}
                </div>
              </FadeIn>

              {/* Stats */}
              {t.hero.stats.length > 0 && (
                <FadeIn delay={0.25} variant="fadeIn" duration={0.5}>
                  <div className="flex items-center gap-6 sm:gap-8 pt-1">
                    {t.hero.stats.map((stat, i) => (
                      <div key={i} className="space-y-0.5">
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-title">
                          {stat.value}
                        </p>
                        <p className="text-[0.6rem] sm:text-[0.65rem] text-faint uppercase tracking-widest">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}

              {/* CTAs */}
              <FadeIn delay={0.3} variant="slideUp" duration={0.45}>
                <div className="flex items-center gap-4 pt-1">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand rounded-full hover:opacity-90 transition-all duration-200 focus-ring group"
                  >
                    {t.hero.cta}
                    <PrimaryIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={1.5} />
                  </a>
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-subtle hover:text-title transition-colors duration-200 focus-ring"
                  >
                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                    {t.hero.secondaryCta}
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
