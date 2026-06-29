"use client";

import { useEffect } from "react";
import { useScene } from "@/lib/store";

/**
 * Detects prefers-reduced-motion and writes it to the global scene store.
 * Also tracks page scroll progress (0..1) for shader phase morphs.
 */
export function MotionProvider() {
  const setReducedMotion = useScene((s) => s.setReducedMotion);
  const setScrollProgress = useScene((s) => s.setScrollProgress);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setReducedMotion]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        setScrollProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setScrollProgress]);

  return null;
}
