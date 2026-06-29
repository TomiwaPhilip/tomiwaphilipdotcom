"use client";

import { useEffect, useRef, useState, createElement } from "react";
import { useScene } from "@/lib/store";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>/?abcdefghijklmnopqrstuvwxyz0123456789";

interface Props {
  text: string;
  className?: string;
  /** Trigger on mount + once-in-view (default), or every hover. */
  trigger?: "mount" | "hover";
  /** Delay in ms before starting */
  delay?: number;
  /** Frame interval ms; lower = faster scramble */
  speed?: number;
  /** Steps per character before it locks in */
  steps?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

export function ScrambleText({
  text,
  className,
  trigger = "mount",
  delay = 0,
  speed = 28,
  steps = 8,
  as = "span",
}: Props) {
  const reducedMotion = useScene((s) => s.reducedMotion);
  const [display, setDisplay] = useState(reducedMotion ? text : "");
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(text);
      return;
    }

    const run = () => {
      let frame = 0;
      const len = text.length;
      const out: string[] = Array(len).fill("");
      const lockAt: number[] = Array.from({ length: len }, (_, i) => i * steps);
      const interval = window.setInterval(() => {
        let done = true;
        for (let i = 0; i < len; i++) {
          if (frame >= lockAt[i] + steps) {
            out[i] = text[i];
          } else if (frame >= lockAt[i]) {
            done = false;
            out[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            done = false;
            out[i] = text[i] === " " ? " " : "\u00A0";
          }
        }
        setDisplay(out.join(""));
        frame++;
        if (done) window.clearInterval(interval);
      }, speed);
      return () => window.clearInterval(interval);
    };

    let cleanup: (() => void) | void;

    if (trigger === "mount") {
      const t = window.setTimeout(() => {
        cleanup = run();
      }, delay);
      return () => {
        window.clearTimeout(t);
        cleanup?.();
      };
    }

    const el = ref.current;
    if (!el) return;
    const onEnter = () => {
      cleanup?.();
      cleanup = run();
    };
    el.addEventListener("pointerenter", onEnter);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      cleanup?.();
    };
  }, [text, reducedMotion, delay, speed, steps, trigger]);

  return createElement(
    as,
    {
      ref,
      className,
      "aria-label": text,
    },
    display || text,
  );
}
