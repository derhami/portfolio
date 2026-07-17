import { useEffect, useCallback, useRef, useState } from "react";
import { Image } from "@/components/ui/Image";
import { useTranslation } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { X, ExternalLink, ChevronRight, ChevronLeft, Folder, Tag, Building2 } from "lucide-react";
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
  const { t, dir } = useTranslation();
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

  const accent = projectMeta.accent;
  const accentStyle = accent ? { "--accent": accent } as React.CSSProperties : undefined;

  if (!isOpen || !projectContent || !projectMeta) return null;

  const experience = t.experience.items.find((e) => e.id === projectMeta.experienceId);

  const media = projectContent.media || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pb-[90px] sm:pb-[100px]" style={accentStyle}>
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
        className="relative w-full max-w-4xl max-h-[calc(90vh-100px)] mx-4 overflow-y-auto rounded-2xl border border-card-border bg-bg-elevated shadow-2xl"
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-surface-hover text-subtle hover:text-title transition-all duration-200 focus-ring"
          aria-label={t.labels.modal.close}
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Hero Image + Gallery */}
        <div
          className="relative group touch-pan-y cursor-grab active:cursor-grabbing select-none min-h-[40dvh] sm:min-h-[45dvh] md:min-h-[55dvh]"
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
            className="w-full h-full absolute inset-0 aspect-auto object-cover pointer-events-none"
          />

          {gallery.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/50 dark:hover:bg-black/50 focus-ring"
                aria-label={t.labels.modal.previousImage}
              >
                <ChevronLeft className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" strokeWidth={2.5} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/50 dark:hover:bg-black/50 focus-ring"
                aria-label={t.labels.modal.nextImage}
              >
                <ChevronRight className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" strokeWidth={2.5} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-card-border"
                style={{ background: "var(--bg-overlay-light)" }}>
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(i); setGalleryPaused(true); setTimeout(() => setGalleryPaused(false), 2000); }}
                    className={`h-[2px] rounded-full transition-all duration-200 focus-ring ${
                      i === activeImage ? "w-4 bg-title" : "w-1.5 bg-faint hover:bg-subtle"
                    }`}
                    aria-label={t.labels.modal.imageAlt(i)}
                    aria-current={i === activeImage ? "true" : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10 md:p-12 space-y-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.6rem] rounded-md"
                  style={{
                    color: accent ? `${accent}cc` : "var(--subtle)",
                    background: accent ? `${accent}12` : "var(--surface)",
                    border: `1px solid ${accent ? `${accent}20` : "var(--border)"}`,
                  }}
                >
                  <Folder className="w-3 h-3" strokeWidth={2} />
                  {projectMeta.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.6rem] text-faint bg-surface border border-border rounded-md">
                  <Tag className="w-3 h-3" strokeWidth={2} />
                  {projectMeta.year}
                </span>
              </div>
              {experience && (
                <p className="flex items-center gap-1.5 text-xs text-subtle">
                  <Building2 className="w-3.5 h-3.5" strokeWidth={2} />
                  {experience.company}
                </p>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-title">{projectContent.client}</h2>
              <p className="text-sm text-subtle">
                {projectContent.title} — {projectContent.role}
              </p>
            </div>
            {projectMeta.links[0] && (
              <a
                href={projectMeta.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 shrink-0"
                style={{
                  color: accent || "var(--brand)",
                  background: accent ? `${accent}15` : "var(--brand-bg)",
                  border: `1px solid ${accent ? `${accent}30` : "var(--brand-border)"}`,
                }}
              >
                <ExternalLink className="w-4 h-4" strokeWidth={2} />
                {t.labels.modal.visitSite}
              </a>
            )}
          </div>

          {/* Overview */}
          <p className="text-base sm:text-lg text-body leading-[1.8] max-w-[70ch]">
            {projectContent.overview}
          </p>

          {/* Media */}
          {media.length > 0 && (
            <div className="space-y-6 pt-2">
              {media.map((m, i) => (
                <div key={i}>
                  <Image
                    src={m.src}
                    alt={m.alt}
                    className="w-full aspect-video object-cover rounded-xl ring-1 ring-border"
                  />
                  {m.caption && (
                    <p className="text-xs text-faint mt-1.5 text-center">{m.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Context */}
          {projectContent.context && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {t.labels.modal.context}
              </h3>
              <p className="text-sm text-body leading-[1.8] max-w-[70ch]">
                {projectContent.context}
              </p>
            </div>
          )}

          {/* My Contribution */}
          {projectContent.contribution && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {t.labels.modal.myContribution}
              </h3>
              <p className="text-sm text-body leading-[1.8] max-w-[70ch]">
                {projectContent.contribution}
              </p>
            </div>
          )}

          {/* Impact */}
          {projectContent.impact && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {t.labels.modal.impact}
              </h3>
              <p className="text-sm text-body leading-[1.8] max-w-[70ch]">
                {projectContent.impact}
              </p>
            </div>
          )}

          {/* Technologies */}
          {projectMeta.technologies.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">
                {t.labels.modal.technologies}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {projectMeta.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2.5 py-1 text-xs rounded-md"
                    style={{
                      color: accent ? `${accent}cc` : "var(--subtle)",
                      background: accent ? `${accent}12` : "var(--surface)",
                      borderColor: accent ? `${accent}20` : "var(--border)",
                    }}
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
                {t.labels.modal.links}
              </h3>
              <div className="flex flex-wrap gap-2">
                {projectMeta.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-all duration-300"
                    style={{
                      color: "var(--subtle)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <ExternalLink className="w-3 h-3" strokeWidth={2} />
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
                className="group w-full text-start flex items-center justify-between gap-4 p-4 rounded-xl bg-surface hover:bg-surface-hover border border-border transition-all duration-200 focus-ring"
              >
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-faint mb-1">
                    {t.labels.modal.nextProject}
                  </p>
                  <p className="text-sm font-medium text-title">{nextContent.client}</p>
                  <p className="text-xs text-subtle">{nextContent.subtitle}</p>
                </div>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border border-border text-subtle group-hover:text-brand group-hover:border-brand/30 transition-all duration-200 ${isRtl ? "rotate-180" : ""}`}>
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
