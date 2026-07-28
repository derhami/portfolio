import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Image } from "@/components/ui/Image";
import { Mail, Phone, Globe } from "lucide-react";

function BrandIcon({ name, label, className }: { name: string; label: string; className?: string }) {
  const size = className || "w-4 h-4";

  switch (name) {
    case "Telegram":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
          <circle cx="12" cy="12" r="10" />
          <path d="M7 12l3 1.5L16 8l-4 7 1.5 3L18 6" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
          <rect x="2" y="2" width="20" height="20" rx="4" />
          <path d="M6 10v7M6 7v.01M10 10v7M10 17h4a2 2 0 002-2v-3a2 2 0 00-2-2h-2" />
        </svg>
      );
    case "Dribbble":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12c0 0 5-2 10-2s10 2 10 2" />
          <path d="M12 2c0 0-3 6-3 10s3 10 3 10" />
          <path d="M22 12c0 0-7 2-10 2s-12-2-12-2" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Threads":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12c0-3 2-5 4-5s4 2 4 5-2 7-5 7c-2 0-3-2-3-5s2-6 5-6" />
          <path d="M7 14c1.5 0 3-1 3-3" />
        </svg>
      );
    default:
      return null;
  }
}

function StaggerFadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.03, 0.26, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Contact() {
  const { t } = useTranslation();
  const { contact } = t;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ringY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background — subtle gradient fade */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left — Content */}
        <div className="flex-1 min-w-0">
          {/* Headline */}
          <StaggerFadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-title leading-[1.1] mb-5">
              {contact.headline}
            </h2>
          </StaggerFadeIn>

          {/* Subtitle */}
          <StaggerFadeIn delay={0.12}>
            <p className="text-sm sm:text-base text-body leading-[1.8] max-w-[56ch] mb-8">
              {contact.subtitle}
            </p>
          </StaggerFadeIn>

          {/* CTA Buttons */}
          <StaggerFadeIn delay={0.24}>
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="mailto:hello@hawid.ir"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 text-white"
                style={{
                  background: "var(--brand)",
                }}
              >
                {contact.ctaPrimary}
              </a>
              <a
                href="/files/Hamidreza-Derhami-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 text-subtle hover:text-title hover:border-border border-border/60"
              >
                {contact.ctaSecondary}
              </a>
            </div>
          </StaggerFadeIn>

          {/* Contact info rows */}
          <StaggerFadeIn delay={0.36}>
            <div className="space-y-3 mb-8">
              <a href="mailto:hello@hawid.ir" className="flex items-center gap-3 text-sm text-body hover:text-title transition-colors duration-200 group">
                <Mail className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
                hello@hawid.ir
              </a>
              <a href="tel:+989334847452" className="flex items-center gap-3 text-sm text-body hover:text-title transition-colors duration-200 group">
                <Phone className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
                +98 933 484 7452
              </a>
              <a href="https://derhami.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-body hover:text-title transition-colors duration-200 group">
                <Globe className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
                derhami.com
              </a>
            </div>
          </StaggerFadeIn>

          {/* Social icons */}
          <StaggerFadeIn delay={0.48}>
            <div className="flex items-center gap-5">
              {contact.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-faint hover:text-[var(--brand)] transition-all hover:scale-110" style={{ transitionDuration: "180ms" }}
                  aria-label={link.label}
                >
                  <BrandIcon name={link.label} label={link.label} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </StaggerFadeIn>
        </div>

        {/* Right — Visual Composition */}
        <div className="hidden lg:block w-[340px] xl:w-[400px] shrink-0 relative h-[480px] xl:h-[540px]">
          {/* Gradient ring */}
          <motion.div
            style={{ y: ringY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[320px] h-[320px] xl:w-[360px] xl:h-[360px] rounded-full"
              style={{
                background: "radial-gradient(circle, var(--brand) 0%, transparent 65%)",
                opacity: 0.05,
                filter: "blur(40px)",
              }}
            />
          </motion.div>

          {/* Thin grid */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-[0.04]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Animated glowing lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 540" fill="none">
            <motion.line
              x1="0" y1="100" x2="400" y2="100"
              stroke="var(--brand)" strokeWidth="0.5" opacity="0.08"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line
              x1="0" y1="320" x2="400" y2="320"
              stroke="var(--brand)" strokeWidth="0.5" opacity="0.06"
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line
              x1="180" y1="0" x2="180" y2="540"
              stroke="var(--brand)" strokeWidth="0.5" opacity="0.04"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          {/* Glass panel with profile */}
          <div className="absolute right-0 top-[15%] z-10 w-[220px] xl:w-[260px] rounded-2xl overflow-hidden backdrop-blur-xl border border-border/30 shadow-xl"
            style={{
              background: "var(--bg-overlay-light)",
            }}
          >
            <Image
              src={contact.profileImage}
              alt="Contact"
              fallback="Profile"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
