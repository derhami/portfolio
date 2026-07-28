import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Image } from "@/components/ui/Image";

const expertiseIcons: Record<string, string> = {
  product:
    "M12 2l2.5 4.5L19 8l-3 3.5L17 16l-5-2-5 2 1-4.5L5 8l4.5-1.5L12 2z",
  ux:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  ui:
    "M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zM6 6h12M10 18h4",
  system:
    "M12 2l2.5 4.5L19 8l-3 3.5L17 16l-5-2-5 2 1-4.5L5 8l4.5-1.5L12 2zM5 16h14v2H5zM7 20h10v2H7z",
  wordpress:
    "M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2zM12 18a3 3 0 100-6 3 3 0 000 6z",
  seo:
    "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v4l2.5 1.5",
};

export function About() {
  const { t } = useTranslation();
  const about = t.about;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-24 relative overflow-hidden">
      <FadeIn variant="fadeIn" duration={0.4}>
        <SectionTitle id="about">{about.label}</SectionTitle>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left — Content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Subtitle */}
          <FadeIn delay={0.05} variant="fadeUp" duration={0.5}>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-title leading-snug whitespace-pre-line">
              {about.subtitle}
            </p>
          </FadeIn>

          {/* Body paragraphs */}
          <div className="space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.06} variant="blurIn" duration={0.5}>
                <p className="text-sm sm:text-base text-body leading-[1.8] max-w-[56ch]">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>

          {/* Expertise Grid — 2 rows × 3 columns */}
          <FadeIn delay={0.4} variant="fadeUp" duration={0.5}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {about.expertise.map((item) => {
                const d = expertiseIcons[item.icon];
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60"
                    style={{
                      background: "color-mix(in srgb, var(--card-bg) 60%, transparent)",
                    }}
                  >
                    {d && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-subtle shrink-0"
                      >
                        <path d={d} />
                      </svg>
                    )}
                    <span className="text-xs font-medium text-title leading-snug">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>

        {/* Right — Visual Composition */}
        <div className="hidden lg:block w-[340px] xl:w-[400px] shrink-0 relative h-[520px] xl:h-[580px]">
          {/* Subtle grid background */}
          <motion.div
            style={{ y: gridY }}
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </motion.div>

          {/* Gradient blur blob */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)",
              opacity: 0.06,
              filter: "blur(60px)",
            }}
          />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)",
              opacity: 0.04,
              filter: "blur(50px)",
            }}
          />

          {/* Thin glowing lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 580" fill="none">
            <line x1="0" y1="120" x2="400" y2="120" stroke="var(--brand)" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="340" x2="400" y2="340" stroke="var(--brand)" strokeWidth="0.5" opacity="0.06" />
            <line x1="160" y1="0" x2="160" y2="580" stroke="var(--brand)" strokeWidth="0.5" opacity="0.05" />
          </svg>

          {/* Portrait */}
          <motion.div
            style={{ y: portraitY }}
            className="relative z-10 w-full h-full rounded-2xl overflow-hidden"
          >
            <Image
              src={about.portrait.src}
              mobileSrc={about.portrait.mobileSrc}
              alt={about.portrait.alt}
              fallback={about.portrait.alt}
              className="w-full h-full object-cover"
            />
            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
