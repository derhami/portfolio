import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { useTranslation } from "@/lib/i18n";
import { Image } from "@/components/ui/Image";
import { siteConfig } from "@/content/config";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectModal = lazy(() =>
  import("@/components/ui/ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

const allSlugs = Object.keys(siteConfig.projects) as Array<keyof typeof siteConfig.projects>;
const AUTOPLAY_INTERVAL = 5000;

interface GroupSliderProps {
  slugs: Array<keyof typeof siteConfig.projects>;
  onOpenModal: (slug: keyof typeof siteConfig.projects) => void;
}

function GroupSlider({ slugs, onOpenModal }: GroupSliderProps) {
  const { t, dir } = useTranslation();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const currentSlug = slugs[active];
  const projectContent = t.work.items[currentSlug];
  const projectMeta = siteConfig.projects[currentSlug];

  const isRtl = dir === "rtl";

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + slugs.length) % slugs.length);
  }, [slugs.length]);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % slugs.length);
  }, [slugs.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % slugs.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, slugs.length]);

  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const swipeDelta = useRef(0);
  const isDragging = useRef(false);

  const handleSwipeStart = (clientX: number, clientY: number) => {
    swipeStart.current = { x: clientX, y: clientY };
    swipeDelta.current = 0;
    isDragging.current = true;
  };

  const handleSwipeMove = (clientX: number, clientY: number) => {
    if (!swipeStart.current || !isDragging.current) return;
    const dx = clientX - swipeStart.current.x;
    const dy = clientY - swipeStart.current.y;
    if (Math.abs(dy) > Math.abs(dx)) {
      isDragging.current = false;
      return;
    }
    swipeDelta.current = dx;
  };

  const handleSwipeEnd = () => {
    if (!isDragging.current) return;
    const threshold = 50;
    if (Math.abs(swipeDelta.current) > threshold) {
      if (swipeDelta.current > 0) {
        if (isRtl) { next(); } else { prev(); }
      } else {
        if (isRtl) { prev(); } else { next(); }
      }
    }
    swipeStart.current = null;
    swipeDelta.current = 0;
    isDragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => handleSwipeStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => handleSwipeMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => handleSwipeEnd();

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSwipeStart(e.clientX, e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => handleSwipeMove(e.clientX, e.clientY);
  const onMouseUp = () => handleSwipeEnd();
  const onMouseLeave = () => { handleSwipeEnd(); setPaused(false); };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRtl) { next(); } else { prev(); }
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRtl) { prev(); } else { next(); }
      }
    },
    [isRtl, prev, next]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!projectContent || !projectMeta) return null;

  return (
    <div className="space-y-6">
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setPaused(true)}
      >
        <button onClick={() => onOpenModal(currentSlug)} className="group w-full text-left focus-ring">
          <div className="relative overflow-hidden rounded-xl ring-1 ring-border group-hover:ring-border-subtle group-hover:shadow-lg group-hover:shadow-[var(--shadow-color)] transition-all duration-200">
            <Image
              src={projectMeta.coverImage}
              mobileSrc={projectMeta.mobileCover}
              alt={`${projectContent.client} — ${projectContent.title}`}
              fallback={projectContent.client}
              className="w-full aspect-[4/3] md:aspect-[2/1] object-cover group-hover:scale-[1.015] transition-transform duration-400 pointer-events-none"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(to top, var(--bg-gradient-end), transparent)" }} />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-[0.6rem] sm:text-xs text-subtle uppercase tracking-wider">
                {t.labels.work.clickToView}
              </span>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-surface backdrop-blur-md border border-border">
                <ArrowUpRight className="w-4 h-4 text-body" strokeWidth={1.5} />
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-md border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-surface-hover focus-ring"
              aria-label={t.labels.work.prevProject}
            >
              <ChevronLeft className="w-4 h-4 text-body" strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-md border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-surface-hover focus-ring"
              aria-label={t.labels.work.nextProject}
            >
              <ChevronRight className="w-4 h-4 text-body" strokeWidth={1.5} />
            </button>
          </div>
        </button>
      </div>

      <button onClick={() => onOpenModal(currentSlug)} className="w-full text-left focus-ring">
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <div className="max-w-lg">
            <div className="flex items-baseline gap-2 sm:gap-3 mb-1">
              <h3 className="text-lg sm:text-xl font-semibold text-title">{projectContent.client}</h3>
              <span className="text-xs sm:text-sm text-faint tabular-nums">{projectMeta.year}</span>
            </div>
            <p className="text-xs sm:text-sm text-subtle mb-1.5">
              {projectContent.title} — {projectContent.role}
            </p>
            <p className="text-sm sm:text-base text-body leading-relaxed">
              {projectContent.overview}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-1" onClick={(e) => e.stopPropagation()}>
            {projectMeta.links[0] && (
              <a
                href={projectMeta.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle hover:text-brand hover:border-brand/30 transition-all duration-200"
                aria-label={t.labels.work.visitWebsite}
              >
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </button>

      <div className="flex items-center justify-center gap-2">
        {slugs.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-[2px] rounded-full transition-all duration-200 focus-ring ${
              i === active ? "w-6 bg-title" : "w-1.5 bg-faint hover:bg-subtle"
            }`}
            aria-label={t.labels.work.projectAlt(i)}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<keyof typeof siteConfig.projects | null>(null);

  const openModal = (slug: keyof typeof siteConfig.projects) => {
    setActiveSlug(slug);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToNext = useCallback(() => {
    if (!activeSlug) return;
    const idx = allSlugs.indexOf(activeSlug);
    const next = allSlugs[(idx + 1) % allSlugs.length];
    setActiveSlug(next);
  }, [activeSlug]);

  return (
    <section id="work" className="py-16 sm:py-24 relative">
      <div
        className="absolute right-0 top-0 w-28 h-28 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <FadeIn variant="fadeIn" duration={0.4}>
        <SectionTitle id="work" className="mb-12 sm:mb-16">{t.work.label}</SectionTitle>
      </FadeIn>

      <FadeIn variant="scaleIn" duration={0.6} delay={0.1}>
        <GroupSlider slugs={allSlugs} onOpenModal={openModal} />
      </FadeIn>

      <Suspense fallback={null}>
        {activeSlug && (
          <ProjectModal
            isOpen={modalOpen}
            onClose={closeModal}
            projectSlug={activeSlug}
            onNext={goToNext}
          />
        )}
      </Suspense>
    </section>
  );
}
