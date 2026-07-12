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
        className={`flex items-center justify-center bg-surface border border-border ${className || ""}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-faint text-xs select-none">{fallback || alt || "Image"}</span>
      </div>
    );
  }

  return (
    <>
      {status === "loading" && (
        <div
          className={`animate-pulse bg-surface border border-border ${className || ""}`}
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
