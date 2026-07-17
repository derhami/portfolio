import { MessageCircle, Phone, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";

const socialIcons: Record<string, { path: string; color: string; darkColor: string }> = {
  Telegram: { path: "/assets/images/social/telegram.svg", color: "#0088cc", darkColor: "#0088cc" },
  LinkedIn: { path: "/assets/images/social/linkedin.svg", color: "#0077b5", darkColor: "#0077b5" },
  Dribbble: { path: "/assets/images/social/dribbble.svg", color: "#ea4c89", darkColor: "#ea4c89" },
  Instagram: { path: "/assets/images/social/instagram.svg", color: "#e4405f", darkColor: "#e4405f" },
  Threads: { path: "/assets/images/social/threads.svg", color: "#000000", darkColor: "#ffffff" },
  Bale: { path: "/assets/images/social/bale.svg", color: "#35a0d4", darkColor: "#35a0d4" },
};

export function Contact() {
  const { t } = useTranslation();
  const { contact } = t;

  return (
    <section id="contact" className="min-h-[60vh] flex items-center relative py-16 sm:py-24">
      <div className="w-full space-y-12 sm:space-y-14">
        <FadeIn variant="blurIn" duration={0.6}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-title leading-[1.1] mb-6 sm:mb-8 md:mb-10">
            {contact.headline}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} variant="slideUp" duration={0.5}>
          <div className="space-y-4">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm sm:text-base text-body hover:text-title transition-colors duration-200 group">
              <MessageCircle className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={2} />
              {contact.email}
            </a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm sm:text-base text-body hover:text-title transition-colors duration-200 group">
              <Phone className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={2} />
              {contact.phone}
            </a>
            <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm sm:text-base text-body hover:text-title transition-colors duration-200 group">
              <Globe className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={2} />
              {contact.website}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} variant="fadeUp" duration={0.5}>
          <div className="flex flex-wrap gap-2.5">
            {contact.links.map((link) => {
              const icon = socialIcons[link.label];
              const svgPath = icon?.path;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link group inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm text-subtle hover:text-title bg-card-bg border border-card-border hover:border-border rounded-full transition-all duration-200`}
                  data-brand={link.label}
                >
                  {svgPath ? (
                    <img
                      src={svgPath}
                      alt={link.label}
                      className={`social-icon w-3.5 h-3.5 transition-all duration-200 group-hover:scale-110`}
                      data-brand={link.label}
                    />
                  ) : (
                    <span className="w-3.5 h-3.5 flex items-center justify-center text-xs font-bold">{link.label[0]}</span>
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}