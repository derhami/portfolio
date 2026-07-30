import { useState, useRef, useEffect, type ImgHTMLAttributes } from "react";
import { Shimmer } from "@/components/ui/Shimmer";
import { Folder, Document, Circle, Image2 } from "@/components/ui/icons";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  mobileSrc?: string;
}

const shimmerIcons = [Folder, Document, Circle, Image2];

export function Image({ src, alt, fallback, className, width, height, onLoad, mobileSrc, ...props }: ImageProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const imgRef = useRef<HTMLImageElement>(null);
  const [shimmerIcon] = useState(() => Math.floor(Math.random() * shimmerIcons.length));

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
    const Icon = shimmerIcons[shimmerIcon];
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-surface border border-border ${className || ""}`}
        role="img"
        aria-label={alt}
      >
        <Icon className="w-7 h-7 text-faint/40" strokeWidth={1} />
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
