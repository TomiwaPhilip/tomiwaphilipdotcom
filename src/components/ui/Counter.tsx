"use client";

import { useEffect, useRef, useState } from "react";
import { useScene } from "@/lib/store";

interface Props {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (n: number) => string;
  className?: string;
}

/**
 * Animated number counter. Plays once when scrolled into view.
 */
export function Counter({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  formatter,
  className,
}: Props) {
  const reducedMotion = useScene((s) => s.reducedMotion);
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(reducedMotion ? to : 0);
  const started = useRef(false);

  useEffect(() => {
    if (reducedMotion) return setValue(to);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(eased * to);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, reducedMotion]);

  const formatted = formatter
    ? formatter(value)
    : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
