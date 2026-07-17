import { MessageCircle, Phone, Globe, Link, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "message-circle": MessageCircle,
  link: Link,
  heart: Heart,
  globe: Globe,
};

export function Contact() {
  const { t } = useTranslation();
  const { contact } = t;

  return (
    <section id="contact" className="min-h-[60vh] flex items-center relative py-16 sm:py-24">
      <div className="w-full space-y-12 sm:space-y-14">
        <FadeIn>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-title">
            {contact.headline}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-4">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm sm:text-base text-body hover:text-title transition-colors duration-200 group">
              <MessageCircle className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
              {contact.email}
            </a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm sm:text-base text-body hover:text-title transition-colors duration-200 group">
              <Phone className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
              {contact.phone}
            </a>
            <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm sm:text-base text-body hover:text-title transition-colors duration-200 group">
              <Globe className="w-4 h-4 text-faint group-hover:text-subtle transition-colors" strokeWidth={1.5} />
              {contact.website}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2.5">
            {contact.links.map((link) => {
              const Icon = iconMap[link.icon] || Link;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm text-subtle hover:text-title bg-card-bg border border-card-border hover:border-border rounded-full transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
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
