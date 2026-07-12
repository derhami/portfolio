import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { Image } from "@/components/ui/Image";
import { siteConfig } from "@/content/config";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from "lucide-react";

const projectSlugs = Object.keys(siteConfig.projects) as Array<keyof typeof siteConfig.projects>;

export function Work() {
  const { t, dir } = useTranslation();
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const currentSlug = projectSlugs[active];
  const projectContent = t.work.items[currentSlug];
  const projectMeta = siteConfig.projects[currentSlug];

  const isRtl = dir === "rtl";

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + projectSlugs.length) % projectSlugs.length);
  }, []);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % projectSlugs.length);
  }, []);

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  // Touch swipe handling
  const touchStart = useRef<number | null>(null);
  const touchDelta = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (Math.abs(touchDelta.current) > threshold) {
      if (touchDelta.current > 0) {
        if (isRtl) { next(); } else { prev(); }
      } else {
        if (isRtl) { prev(); } else { next(); }
      }
    }
    touchStart.current = null;
    touchDelta.current = 0;
  };

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

  if (!projectContent || !projectMeta) return null;

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
        <p className="section-title text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-subtle mb-8 sm:mb-10 font-medium">
          {t.work.label}
        </p>
      </FadeIn>

      <div>
        <FadeIn>
          <div
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="touch-pan-y"
          >
            <button onClick={() => setModalOpen(true)} className="group w-full text-left focus-ring">
              <div className="relative overflow-hidden rounded-xl ring-1 ring-border hover:ring-border-subtle transition-all duration-500">
                <Image
                  src={projectMeta.coverImage}
                  alt={`${projectContent.client} — ${projectContent.title}`}
                  fallback={projectContent.client}
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
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-start justify-between gap-4 sm:gap-6 mt-6">
            <div className="max-w-lg">
              <div className="flex items-baseline gap-2 sm:gap-3 mb-1.5">
                <h3 className="text-lg sm:text-xl font-semibold text-title">{projectContent.client}</h3>
                <span className="text-xs sm:text-sm text-faint tabular-nums">{projectMeta.year}</span>
              </div>
              <p className="text-xs sm:text-sm text-subtle mb-2">
                {projectContent.title} — {projectContent.role}
              </p>
              <p className="text-sm sm:text-base text-body leading-relaxed">
                {projectContent.overview}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1.5">
              {projectMeta.links[0] && (
                <a
                  href={projectMeta.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle hover:text-brand hover:border-brand/30 transition-all duration-300"
                  aria-label="Visit website"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle hover:text-title hover:border-border transition-all duration-300 focus-ring" aria-label="Previous">
            <PrevIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
          <span className="text-xs text-faint tabular-nums min-w-[3ch] text-center">
            {String(active + 1).padStart(2, "0")}/{String(projectSlugs.length).padStart(2, "0")}
          </span>
          <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle hover:text-title hover:border-border transition-all duration-300 focus-ring" aria-label="Next">
            <NextIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>

          <div className="w-px h-4 bg-border mx-1" />

          <div className="flex gap-1.5">
            {projectSlugs.map((_, i) => (
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
        </div>
      </FadeIn>

      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} projectSlug={currentSlug} />
    </section>
  );
}
