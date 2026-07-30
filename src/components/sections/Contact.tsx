import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Mail, Phone, Globe } from "@/components/ui/icons";

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

  return (
    <section id="contact" className="min-h-[100dvh] flex flex-col justify-center max-md:pb-0 md:pb-24 relative">
      <div className="relative max-w-[1100px] mx-auto">
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
                href={`mailto:${contact.email}`}
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
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-body hover:text-title transition-colors duration-200 group">
                <Mail className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-body hover:text-title transition-colors duration-200 group">
                <Phone className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
                {contact.phone}
              </a>
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-body hover:text-title transition-colors duration-200 group">
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
      </div>
    </section>
  );
}
