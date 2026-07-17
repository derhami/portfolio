import { useRef, type ReactNode } from "react";
import { motion, useInView, type MotionProps } from "framer-motion";

type Variant = "fadeUp" | "fadeIn" | "scaleIn" | "blurIn" | "slideUp";

const variants: Record<Variant, { initial: Record<string, number | string>; animate: Record<string, number | string> }> = {
  fadeUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  scaleIn: { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 } },
  blurIn: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } },
  slideUp: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
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
  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={v.initial}
      animate={isInView ? v.animate : v.initial}
      transition={{ duration, delay, ease: [0.22, 0.03, 0.26, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
