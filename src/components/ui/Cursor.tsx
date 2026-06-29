"use client";

import { useEffect, useRef, useState } from "react";
import { useScene } from "@/lib/store";

/**
 * Custom cursor — small dot + lagged outline ring. Morphs over interactive
 * elements (data-cursor="link" | "drag"). Hidden on touch / coarse pointers.
 */
export function Cursor() {
  const reducedMotion = useScene((s) => s.reducedMotion);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"default" | "link" | "drag">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    document.documentElement.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);

      const t = e.target as HTMLElement | null;
      const tag = t?.closest("[data-cursor]") as HTMLElement | null;
      const next = (tag?.dataset.cursor as typeof mode) || "default";
      if (next !== mode) setMode(next);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reducedMotion, mode, visible]);

  if (reducedMotion) return null;

  const ringSize = mode === "link" ? 56 : mode === "drag" ? 72 : 30;
  const ringBg =
    mode === "link"
      ? "rgba(212, 255, 58, 0.08)"
      : mode === "drag"
        ? "rgba(91, 43, 255, 0.18)"
        : "transparent";
  const ringBorder =
    mode === "link"
      ? "#d4ff3a"
      : mode === "drag"
        ? "#5b2bff"
        : "rgba(244, 244, 242, 0.4)";

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          background: ringBg,
          border: `1px solid ${ringBorder}`,
          pointerEvents: "none",
          zIndex: 9998,
          transition:
            "width 240ms var(--ease-out), height 240ms var(--ease-out), background 240ms, border-color 240ms",
          opacity: visible ? 1 : 0,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#f4f4f2",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
