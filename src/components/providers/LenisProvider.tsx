"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useScene } from "@/lib/store";

/**
 * Mounts Lenis on <html>. Bails out on reduced-motion.
 */
export function LenisProvider() {
  const reducedMotion = useScene((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
