import { type ReactNode } from "react";

const sectionIndex: Record<string, string> = {
  about: "01",
  work: "02",
  experience: "03",
  skills: "04",
};

interface SectionTitleProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ id, children, className = "" }: SectionTitleProps) {
  const index = sectionIndex[id];

  return (
    <div
      className={`section-title flex items-center gap-3 mb-8 sm:mb-10 ${className}`}
    >
      {index && (
        <span className="text-[0.55rem] font-semibold text-faint/50 tracking-[0.15em] tabular-nums select-none">
          {index}
        </span>
      )}
      <h2 className="text-sm sm:text-base font-semibold text-title uppercase tracking-[0.15em]">
        {children}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
    </div>
  );
}
