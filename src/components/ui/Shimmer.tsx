interface ShimmerProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Shimmer({ className = "", style }: ShimmerProps) {
  return (
    <div
      className={`relative overflow-hidden bg-surface/80 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
          animation: "shimmer 1.8s ease-in-out infinite",
        }}
      />
    </div>
  );
}
