"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useScene } from "@/lib/store";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiProvider() {
  const router = useRouter();
  const unlock = useScene((s) => s.unlockKonami);
  const already = useScene((s) => s.konamiUnlocked);
  const buf = useRef<string[]>([]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTyping) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.current = [...buf.current, key].slice(-SEQUENCE.length);

      const hit = SEQUENCE.every((k, i) => buf.current[i] === k);
      if (hit && !already) {
        unlock();
        // Subtle celebratory flash
        const flash = document.createElement("div");
        flash.style.cssText =
          "position:fixed;inset:0;background:radial-gradient(circle at 50% 50%, rgba(212,255,58,0.35), transparent 70%);pointer-events:none;z-index:9999;opacity:0;transition:opacity 280ms ease-out;";
        document.body.appendChild(flash);
        requestAnimationFrame(() => (flash.style.opacity = "1"));
        setTimeout(() => {
          flash.style.opacity = "0";
          setTimeout(() => flash.remove(), 320);
        }, 240);

        setTimeout(() => router.push("/lab"), 480);
        buf.current = [];
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, unlock, already]);

  return null;
}
