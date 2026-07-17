import { useState, useRef, useEffect, type ImgHTMLAttributes } from "react";
import { Shimmer } from "@/components/ui/Shimmer";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  mobileSrc?: string;
}

const shimmerStyles = [
  { icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", label: "Folder" },
  { icon: "M14.5 4h-5L7 7H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7h-3z", label: "File" },
  { icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Circle" },
  { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14", label: "Image" },
];

export function Image({ src, alt, fallback, className, width, height, onLoad, mobileSrc, ...props }: ImageProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const imgRef = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef(Math.floor(Math.random() * shimmerStyles.length));

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
    const s = shimmerStyles[shimmerRef.current];
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-surface border border-border ${className || ""}`}
        role="img"
        aria-label={alt}
      >
        <svg className="w-7 h-7 text-faint/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d={s.icon} />
        </svg>
        <span className="text-faint/60 text-[0.55rem] select-none text-center px-2 leading-tight uppercase tracking-wider">
          {fallback || alt || "Image"}
        </span>
        {width && height && (
          <span className="text-faint/30 text-[0.5rem] select-none">{width}×{height}</span>
        )}
      </div>
    );
  }

  return (
    <>
      {status === "loading" && (
        <Shimmer
          className={`${className || ""}`}
          style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
        />
      )}
      <picture>
        {mobileSrc && <source media="(max-width: 767px)" srcSet={mobileSrc} />}
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          width={width}
          height={height}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className || ""} ${status === "loaded" ? "" : "opacity-0"}`}
          {...props}
        />
      </picture>
    </>
  );
}
