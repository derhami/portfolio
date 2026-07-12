import { useEffect, useCallback, useRef } from "react";
import { Image } from "@/components/ui/Image";
import { useTranslation } from "@/lib/i18n";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectIndex: number;
}

export function ProjectModal({ isOpen, onClose, projectIndex }: ProjectModalProps) {
  const { t, locale, dir } = useTranslation();
  const project = t.work.items[projectIndex];
  const [activeImage, setActiveImage] = useState(0);

  const isRtl = dir === "rtl";
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const prevImage = useCallback(() => {
    setActiveImage((a) => (a - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  const nextImage = useCallback(() => {
    setActiveImage((a) => (a + 1) % project.images.length);
  }, [project.images.length]);

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

  if (!isOpen || !project) return null;

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
            src={project.images[activeImage]}
            alt={`${project.client} — ${project.project}`}
            fallback={project.client}
            className="w-full aspect-[16/9] object-cover"
          />

          {/* Image navigation */}
          {project.images.length > 1 && (
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
                  {activeImage + 1}/{project.images.length}
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
                {project.images.map((_, i) => (
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
              <h2 className="text-2xl font-bold tracking-tight text-title">{project.client}</h2>
              <p className="text-sm text-subtle mt-1">
                {project.project} — {project.role} · {project.period}
              </p>
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand hover:text-title bg-brand/10 hover:bg-brand/20 border border-brand/20 rounded-full transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                {locale === "en" ? "Visit Site" : "مشاهده سایت"}
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-base text-body leading-[1.8]">
            {project.longDescription}
          </p>

          {/* Highlights */}
          <div>
            <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-3">
              {locale === "en" ? "Key Results" : "نتایج کلیدی"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {project.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface border border-border-subtle"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                  <span className="text-sm text-body">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
