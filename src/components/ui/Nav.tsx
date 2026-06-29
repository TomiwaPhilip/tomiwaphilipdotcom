"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { AudioToggle } from "./AudioToggle";

const links = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#timeline", label: "timeline" },
  { href: "#writing", label: "writing" },
  { href: "#now", label: "now" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        "px-[var(--gutter)] py-4",
        "transition-[background,backdrop-filter,border-color] duration-500",
        scrolled
          ? "bg-[rgba(10,10,11,0.65)] backdrop-blur-md border-b border-[var(--line)]"
          : "bg-transparent",
      )}
    >
      <div className="max-w-[var(--max)] mx-auto flex items-center justify-between gap-4">
        <a
          href="#main"
          data-cursor="link"
          className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--fg)] flex items-center gap-2"
          aria-label="Tomiwa Philip — home"
        >
          <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--accent)] pulse-dot" />
          tomiwa<span className="text-[var(--muted)]">.philip</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="link"
              className="text-[12px] font-mono-tight uppercase tracking-[0.16em] text-[var(--fg-dim)] hover:text-[var(--accent)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AudioToggle />
        </div>
      </div>
    </header>
  );
}
