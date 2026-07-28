import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Image } from "@/components/ui/Image";
import { Mail, Phone, Globe } from "lucide-react";

const brandSvgs: Record<string, string> = {
  Telegram:
    "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Dribbble:
    "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.172 10.172 0 004.395-6.87h-.003zm-6.133 7.477c-.297-1.46-1.094-4.943-2.618-8.917h-.017c-3.912 1.292-5.366 3.675-5.866 4.542 1.496 1.597 3.557 2.46 5.74 2.46a8.55 8.55 0 002.76-.47v.385zm-8.633-3.02c.743-1.246 2.807-4.042 7.568-5.44.14-.042.28-.08.417-.116a24.3 24.3 0 00-.677-1.478c-6.25.216-8.285.666-8.553.704-.022.14-.037.282-.037.425a10.18 10.18 0 001.282 5.904v.001zm-1.71-7.446c.39-.024 2.708-.444 8.64-.558 0 0 2.097-4.307 2.617-5.36A10.222 10.222 0 0012 2.06C7.297 2.06 3.227 5.032 1.644 9.013v.003h.222zM16.347 4.09c-.52 1.053-2.608 5.36-2.608 5.36 4.105.28 7.18.636 7.456.67a10.205 10.205 0 00-4.848-6.03zm3.797 8.307c-.008-.177-.09-.35-.26-.492a9.14 9.14 0 00-.665-.532c-.256.015-2.89.163-5.477.67 0 0-.015.012-.022.03.078.17.163.34.252.506.04.082.08.164.122.246 3.064-.383 5.96.132 6.05.16v-.588z",
  Instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  Threads:
    "M14.976 10.959c-.302.045-.62.062-.942.069-.43.4-.97.865-1.278 1.088.229-2.034.27-3.822-.173-5.403-.802-2.858-2.754-4.69-4.758-4.69-2.327 0-4.563 2.26-5.172 5.34-.603 3.09.006 7.327 2.665 9.394M19.2 1.2C24.8 4.8 26.4 12.8 20.8 18.4m-17.6 0C9.6 24 18.4 21.6 21.6 16",
};

function BrandIcon({ name, className }: { name: string; className?: string }) {
  const path = brandSvgs[name];
  if (!path) return null;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  );
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
                  <BrandIcon name={link.label} className="w-4 h-4" />
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
