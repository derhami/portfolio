import { MessageCircle, Phone, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";

const brandColors: Record<string, { hover: string; border: string; bg: string }> = {
  Telegram: { hover: "hover:text-[#0088cc]", border: "hover:border-[#0088cc]/40", bg: "hover:bg-[#0088cc]/10" },
  LinkedIn: { hover: "hover:text-[#0077b5]", border: "hover:border-[#0077b5]/40", bg: "hover:bg-[#0077b5]/10" },
  Dribbble: { hover: "hover:text-[#ea4c89]", border: "hover:border-[#ea4c89]/40", bg: "hover:bg-[#ea4c89]/10" },
  Instagram: { hover: "hover:text-[#e4405f]", border: "hover:border-[#e4405f]/40", bg: "hover:bg-[#e4405f]/10" },
  Threads: { hover: "hover:text-[#000000]", border: "hover:border-[#000000]/40", bg: "hover:bg-[#000000]/10" },
  Bale: { hover: "hover:text-[#35a0d4]", border: "hover:border-[#35a0d4]/40", bg: "hover:bg-[#35a0d4]/10" },
};

const socialIcons: Record<string, string> = {
  Telegram: "/assets/images/social/telegram.svg",
  LinkedIn: "/assets/images/social/linkedin.svg",
  Dribbble: "/assets/images/social/dribbble.svg",
  Instagram: "/assets/images/social/instagram.svg",
  Threads: "/assets/images/social/threads.svg",
  Bale: "/assets/images/social/bale.svg",
};

const darkModeOverrides: Record<string, string> = {
  Telegram: "group-hover:drop-shadow-[0_0_6px_rgba(0,136,204,0.6)]",
  LinkedIn: "group-hover:drop-shadow-[0_0_6px_rgba(0,119,181,0.6)]",
  Dribbble: "group-hover:drop-shadow-[0_0_6px_rgba(234,76,137,0.6)]",
  Instagram: "group-hover:drop-shadow-[0_0_6px_rgba(228,64,95,0.6)]",
  Threads: "group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]",
  Bale: "group-hover:drop-shadow-[0_0_6px_rgba(53,160,212,0.6)]",
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
              const svgPath = socialIcons[link.label];
              const colors = brandColors[link.label] || { hover: "hover:text-title", border: "hover:border-border", bg: "hover:bg-surface" };
              const glow = darkModeOverrides[link.label] || "";
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm text-subtle ${colors.hover} bg-card-bg border border-card-border ${colors.border} ${colors.bg} rounded-full transition-all duration-200`}
                >
                  {svgPath ? (
                    <img
                      src={svgPath}
                      alt={link.label}
                      className={`w-3.5 h-3.5 transition-all duration-200 group-hover:scale-110 ${glow}`}
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