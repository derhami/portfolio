import { useTranslation } from "@/lib/i18n";
import { Image } from "@/components/ui/Image";
import { siteConfig } from "@/content/config";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";

export function Hero() {
  const { t, dir } = useTranslation();
  const isRtl = dir === "rtl";
  const PrimaryIcon = isRtl ? ArrowLeft : ArrowRight;

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

      <div className="w-full relative">
        <div className="flex flex-col md:flex-row md:items-start md:gap-12 lg:gap-16">
          {/* Portrait */}
          <FadeIn delay={0} className="shrink-0 mb-8 md:mb-0">
            <Image
              src={siteConfig.assets.profile}
              alt={t.hero.name}
              fallback="HD"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl object-cover ring-1 ring-border"
            />
          </FadeIn>

          {/* Content */}
          <div className="flex-1 space-y-5">
            <div className="space-y-2">
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-title">
                  {t.hero.name}
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-subtle font-medium">
                  {t.hero.role}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <p className="text-sm sm:text-base md:text-lg text-body leading-relaxed max-w-xl">
                {t.hero.description}
              </p>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.25}>
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

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand rounded-full hover:opacity-90 transition-all duration-300 focus-ring group"
                >
                  {t.hero.cta}
                  <PrimaryIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-subtle hover:text-title transition-colors duration-300 focus-ring"
                >
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  {t.hero.secondaryCta}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
