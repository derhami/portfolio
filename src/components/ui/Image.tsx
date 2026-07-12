import { useState, useRef, useEffect, type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function Image({ src, alt, fallback, className, width, height, onLoad, ...props }: ImageProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }
    setStatus("loading");
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus("loaded");
    onLoad?.(e);
  };

  const handleError = () => {
    setStatus("error");
  };

  if (status === "error" || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 bg-surface border border-border ${className || ""}`}
        role="img"
        aria-label={alt}
      >
        <svg className="w-8 h-8 text-faint/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        <span className="text-faint text-[0.6rem] select-none text-center px-2 leading-tight">{fallback || alt || "Image"}</span>
        {width && height && (
          <span className="text-faint/50 text-[0.55rem] select-none">{width}×{height}</span>
        )}
      </div>
    );
  }

  return (
    <>
      {status === "loading" && (
        <div
          className={`animate-pulse bg-surface/80 border border-border/50 ${className || ""}`}
          style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt || ""}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className || ""} ${status === "loaded" ? "" : "hidden"}`}
        {...props}
      />
    </>
  );
}
