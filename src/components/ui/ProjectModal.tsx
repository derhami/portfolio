import { useEffect, useCallback, useRef } from "react";
import { Image } from "@/components/ui/Image";
import { useTranslation } from "@/lib/i18n";
import { siteConfig } from "@/content/config";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { ProjectSlug } from "@/content/config";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: ProjectSlug;
}

export function ProjectModal({ isOpen, onClose, projectSlug }: ProjectModalProps) {
  const { t, locale, dir } = useTranslation();
  const projectContent = t.work.items[projectSlug];
  const projectMeta = siteConfig.projects[projectSlug];
  const [activeImage, setActiveImage] = useState(0);

  const isRtl = dir === "rtl";
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const gallery = projectMeta?.gallery || [];

  const prevImage = useCallback(() => {
    setActiveImage((a) => (a - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const nextImage = useCallback(() => {
    setActiveImage((a) => (a + 1) % gallery.length);
  }, [gallery.length]);

  // Touch swipe for gallery
  const touchStart = useRef<number | null>(null);
  const touchDelta = useRef(0);

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
        if (isRtl) { nextImage(); } else { prevImage(); }
      } else {
        if (isRtl) { prevImage(); } else { nextImage(); }
      }
    }
    touchStart.current = null;
    touchDelta.current = 0;
  };

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

  if (!isOpen || !projectContent || !projectMeta) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: "var(--bg-overlay)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] mx-4 overflow-y-auto rounded-2xl border border-card-border bg-bg-elevated shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-surface-hover text-subtle hover:text-title transition-all duration-300 focus-ring"
          aria-label="Close"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Image gallery */}
        <div
          className="relative touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={gallery[activeImage]?.src || projectMeta.heroImage}
            alt={gallery[activeImage]?.alt || `${projectContent.client} — ${projectContent.title}`}
            fallback={projectContent.client}
            className="w-full aspect-[16/9] object-cover"
          />

          {/* Image navigation */}
          {gallery.length > 1 && (
            <>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-card-border"
                style={{ background: "var(--bg-overlay-light)" }}>
                <button
                  onClick={() => {
                    if (isRtl) { nextImage(); } else { prevImage(); }
                  }}
                  className="text-subtle hover:text-title transition-colors"
                >
                  <PrevIcon className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <span className="text-xs text-faint tabular-nums min-w-[3ch] text-center">
                  {activeImage + 1}/{gallery.length}
                </span>
                <button
                  onClick={() => {
                    if (isRtl) { prevImage(); } else { nextImage(); }
                  }}
                  className="text-subtle hover:text-title transition-colors"
                >
                  <NextIcon className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeImage ? "bg-title scale-110" : "bg-faint hover:bg-subtle"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-title">{projectContent.client}</h2>
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
          <p className="text-base text-body leading-[1.8]">
            {projectContent.overview}
          </p>

          {/* Challenge */}
          {projectContent.challenge && (
            <div>
              <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Challenge" : "چالش"}
              </h3>
              <p className="text-sm text-body leading-[1.8]">
                {projectContent.challenge}
              </p>
            </div>
          )}

          {/* Approach */}
          {projectContent.approach && (
            <div>
              <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Approach" : "رویکرد"}
              </h3>
              <p className="text-sm text-body leading-[1.8]">
                {projectContent.approach}
              </p>
            </div>
          )}

          {/* Solution */}
          {projectContent.solution && (
            <div>
              <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Solution" : "راه‌حل"}
              </h3>
              <p className="text-sm text-body leading-[1.8]">
                {projectContent.solution}
              </p>
            </div>
          )}

          {/* Outcome */}
          {projectContent.outcome.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-3">
                {locale === "en" ? "Key Results" : "نتایج کلیدی"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {projectContent.outcome.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface border border-border-subtle"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    <span className="text-sm text-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {projectMeta.technologies.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-3">
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
        </div>
      </div>
    </div>
  );
}
