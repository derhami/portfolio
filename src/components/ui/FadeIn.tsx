import { useRef, type ReactNode } from "react";
import { motion, useInView, type MotionProps } from "framer-motion";

type Variant = "fadeUp" | "fadeIn" | "scaleIn" | "blurIn" | "slideUp";

const variantConfig: Record<
  Variant,
  { initial: Record<string, unknown>; animate: Record<string, unknown> }
> = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
  blurIn: {
    initial: { opacity: 0, filter: "blur(6px)", y: 8 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
};

interface FadeInProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: Variant;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  variant = "fadeUp",
  once = true,
  ...props
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });
  const config = variantConfig[variant];

  return (
    <motion.div
      ref={ref}
      initial={config.initial}
      animate={isInView ? config.animate : config.initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 0.03, 0.26, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container for sequenced children ─── */

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({ children, className, staggerDelay = 0.06 }: StaggerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

