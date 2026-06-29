"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { useScene } from "@/lib/store";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
  className?: string;
  /** Hit-zone radius multiplier (1 = element bounds, 1.6 = larger) */
  radius?: number;
  /** Strength of magnetic pull, 0..1 */
  strength?: number;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  variant?: "default" | "accent" | "ghost";
}

export function MagneticButton({
  children,
  className,
  radius = 1.6,
  strength = 0.35,
  href,
  onClick,
  ariaLabel,
  variant = "default",
}: Props) {
  const reducedMotion = useScene((s) => s.reducedMotion);
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const reach = Math.max(rect.width, rect.height) * radius;
    if (dist > reach) {
      el.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    const f = strength * (1 - dist / reach);
    el.style.transform = `translate3d(${dx * f}px, ${dy * f}px, 0)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  const styles = cn(
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full",
    "text-sm font-mono-tight uppercase tracking-[0.14em]",
    "transition-[background,color,border-color,transform] duration-300 ease-[var(--ease-out)]",
    "will-change-transform",
    variant === "accent" &&
      "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[#bff028]",
    variant === "ghost" &&
      "bg-transparent border border-[var(--line-strong)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
    variant === "default" &&
      "bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--fg-dim)]",
    className,
  );

  const common = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    "aria-label": ariaLabel,
    className: styles,
    "data-cursor": "link" as const,
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...common}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      {...common}
    >
      {children}
    </button>
  );
}
