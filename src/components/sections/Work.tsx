import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { Image } from "@/components/ui/Image";
import { siteConfig } from "@/content/config";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from "lucide-react";

export function Work() {
  const { t, dir } = useTranslation();
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const items = t.work.items;
  const project = items[active];
  const projectKeys = ["daewoo", "snowa", "entekhab", "ardesia", "shadow"] as const;
  const projectImage = siteConfig.assets.projects[projectKeys[active]];

  const isRtl = dir === "rtl";

  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (modalOpen) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRtl) { next(); } else { prev(); }
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRtl) { prev(); } else { next(); }
      }
    },
    [modalOpen, isRtl, prev, next]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="work" className="py-20 sm:py-28 relative">
      <div className="section-divider mb-20 sm:mb-28" />

      <div
        className="absolute right-0 top-0 w-28 h-28 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <FadeIn>
        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-subtle mb-8 sm:mb-10 font-medium">
          {t.work.label}
        </p>
      </FadeIn>

      <div>
        <FadeIn>
          <button onClick={() => setModalOpen(true)} className="group w-full text-left focus-ring">
            <div className="relative overflow-hidden rounded-xl ring-1 ring-border hover:ring-border-subtle transition-all duration-500">
              <Image
                src={projectImage}
                alt={`${project.client} — ${project.project}`}
                fallback={project.client}
                className="w-full aspect-[16/9] md:aspect-[2/1] object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, var(--bg-gradient-end), transparent)" }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[0.6rem] sm:text-xs text-subtle uppercase tracking-wider">
                  {dir === "rtl" ? "کلیک برای مشاهده" : "Click to view details"}
                </span>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-surface backdrop-blur-md border border-border">
                  <ArrowUpRight className="w-4 h-4 text-body" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </button>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-start justify-between gap-4 sm:gap-6 mt-6">
            <div className="max-w-lg">
              <div className="flex items-baseline gap-2 sm:gap-3 mb-1.5">
                <h3 className="text-lg sm:text-xl font-semibold text-title">{project.client}</h3>
                <span className="text-xs sm:text-sm text-faint tabular-nums">{project.period}</span>
              </div>
              <p className="text-xs sm:text-sm text-subtle mb-2">
                {project.project} — {project.role}
              </p>
              <p className="text-sm sm:text-base text-body leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-1.5">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle hover:text-brand hover:border-brand/30 transition-all duration-300"
                  aria-label="Visit website"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              )}
              <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle hover:text-title hover:border-border transition-all duration-300 focus-ring" aria-label="Previous">
                <PrevIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <span className="text-xs text-faint tabular-nums min-w-[3ch] text-center">
                {String(active + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
              </span>
              <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle hover:text-title hover:border-border transition-all duration-300 focus-ring" aria-label="Next">
                <NextIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="flex gap-1.5 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-[2px] rounded-full transition-all duration-500 focus-ring ${
                i === active ? "w-6 bg-title" : "w-1.5 bg-faint hover:bg-subtle"
              }`}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>
      </FadeIn>

      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} projectIndex={active} />
    </section>
  );
}
