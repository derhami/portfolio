import { useEffect, useCallback, useRef, useState } from "react";
import { Image } from "@/components/ui/Image";
import { useTranslation } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import type { ProjectSlug } from "@/content/config";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: ProjectSlug;
  onNext: () => void;
}

const allSlugs = Object.keys(siteConfig.projects) as Array<ProjectSlug>;

const GALLERY_AUTOPLAY_INTERVAL = 4000;

export function ProjectModal({ isOpen, onClose, projectSlug, onNext }: ProjectModalProps) {
  const { t, locale, dir } = useTranslation();
  const projectContent = t.work.items[projectSlug];
  const projectMeta = siteConfig.projects[projectSlug];
  const [activeImage, setActiveImage] = useState(0);

  const isRtl = dir === "rtl";
  const gallery = projectMeta?.gallery || [];

  const currentIndex = allSlugs.indexOf(projectSlug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextContent = t.work.items[nextSlug];
  const nextMeta = siteConfig.projects[nextSlug];

  const prevImage = useCallback(() => {
    setActiveImage((a) => (a - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const nextImage = useCallback(() => {
    setActiveImage((a) => (a + 1) % gallery.length);
  }, [gallery.length]);

  const [galleryPaused, setGalleryPaused] = useState(false);
  useEffect(() => {
    if (!isOpen || galleryPaused || gallery.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImage((a) => (a + 1) % gallery.length);
    }, GALLERY_AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isOpen, galleryPaused, gallery.length]);

  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const swipeDelta = useRef(0);
  const isDragging = useRef(false);

  const handleSwipeStart = (clientX: number, clientY: number) => {
    swipeStart.current = { x: clientX, y: clientY };
    swipeDelta.current = 0;
    isDragging.current = true;
    setGalleryPaused(true);
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
        if (isRtl) { nextImage(); } else { prevImage(); }
      } else {
        if (isRtl) { prevImage(); } else { nextImage(); }
      }
    }
    swipeStart.current = null;
    swipeDelta.current = 0;
    isDragging.current = false;
    setTimeout(() => setGalleryPaused(false), 2000);
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
  const onMouseLeave = () => handleSwipeEnd();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRtl) { nextImage(); } else { prevImage(); }
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRtl) { prevImage(); } else { nextImage(); }
      }
    },
    [onClose, isRtl, prevImage, nextImage]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setActiveImage(0);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const allFocusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (allFocusable.length === 0) return;
      const first = allFocusable[0];
      const last = allFocusable[allFocusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    modal.addEventListener("keydown", trapFocus);
    return () => modal.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  if (!isOpen || !projectContent || !projectMeta) return null;

  const experience = t.experience.items.find((e) => e.id === projectMeta.experienceId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: "var(--bg-overlay)" }}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${projectContent.client} — ${projectContent.title}`}
        className="relative w-full max-w-4xl max-h-[90vh] mx-4 overflow-y-auto rounded-2xl border border-card-border bg-bg-elevated shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-surface-hover text-subtle hover:text-title transition-all duration-300 focus-ring"
          aria-label="Close"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Hero Image + Gallery */}
        <div
          className="relative touch-pan-y cursor-grab active:cursor-grabbing select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseEnter={() => setGalleryPaused(true)}
        >
          <Image
            src={gallery[activeImage]?.src || projectMeta.heroImage}
            alt={gallery[activeImage]?.alt || `${projectContent.client} — ${projectContent.title}`}
            fallback={projectContent.client}
            className="w-full aspect-[16/9] object-cover pointer-events-none"
          />

          {gallery.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-card-border"
              style={{ background: "var(--bg-overlay-light)" }}>
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImage(i); setGalleryPaused(true); setTimeout(() => setGalleryPaused(false), 2000); }}
                  className={`h-[2px] rounded-full transition-all duration-300 focus-ring ${
                    i === activeImage ? "w-4 bg-title" : "w-1.5 bg-faint hover:bg-subtle"
                  }`}
                  aria-label={`Image ${i + 1}`}
                  aria-current={i === activeImage ? "true" : undefined}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10 md:p-12 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              {experience && (
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-widest text-faint mb-2">
                  {locale === "en" ? "Professional Experience" : "تجربه حرفه‌ای"}
                </p>
              )}
              {experience && (
                <p className="text-sm text-subtle mb-3">{experience.company}</p>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-title">{projectContent.client}</h2>
              <p className="text-sm text-subtle mt-1">
                {projectContent.title} — {projectContent.role} · {projectMeta.year}
              </p>
            </div>
            {projectMeta.links[0] && (
              <a
                href={projectMeta.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand hover:text-title bg-brand/10 hover:bg-brand/20 border border-brand/20 rounded-full transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                {locale === "en" ? "Visit Site" : "مشاهده سایت"}
              </a>
            )}
          </div>

          {/* Overview */}
          <p className="text-base sm:text-lg text-body leading-[1.8]">
            {projectContent.overview}
          </p>

          {/* Context */}
          {projectContent.context && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Context" : "زمینه"}
              </h3>
              <p className="text-sm text-body leading-[1.8]">
                {projectContent.context}
              </p>
            </div>
          )}

          {/* My Contribution */}
          {projectContent.contribution && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "My Contribution" : "مشارکت من"}
              </h3>
              <p className="text-sm text-body leading-[1.8]">
                {projectContent.contribution}
              </p>
            </div>
          )}

          {/* Impact */}
          {projectContent.impact && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Impact" : "تأثیر"}
              </h3>
              <p className="text-sm text-body leading-[1.8]">
                {projectContent.impact}
              </p>
            </div>
          )}

          {/* Technologies */}
          {projectMeta.technologies.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Technologies" : "ابزارها"}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {projectMeta.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2.5 py-1 text-xs text-subtle bg-surface border border-border rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Links */}
          {projectMeta.links.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Links" : "لینک‌ها"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {projectMeta.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-subtle hover:text-brand bg-surface border border-border hover:border-brand/30 rounded-md transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Next Project */}
          {nextContent && nextMeta && (
            <div className="pt-6 border-t border-border">
              <button
                onClick={onNext}
                className="group w-full text-left flex items-center justify-between gap-4 p-4 rounded-xl bg-surface hover:bg-surface-hover border border-border transition-all duration-300 focus-ring"
              >
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-faint mb-1">
                    {locale === "en" ? "Next Project" : "پروژه بعدی"}
                  </p>
                  <p className="text-sm font-medium text-title">{nextContent.client}</p>
                  <p className="text-xs text-subtle">{nextContent.subtitle}</p>
                </div>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle group-hover:text-brand group-hover:border-brand/30 transition-all duration-300 ${isRtl ? "rotate-180" : ""}`}>
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
