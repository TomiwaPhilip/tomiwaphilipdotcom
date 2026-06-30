"use client";

import { motion } from "motion/react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center px-[var(--gutter)] pt-32 pb-16"
    >
      <div className="max-w-[var(--max)] mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow mb-8 flex items-center gap-3"
        >
          <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--accent)] pulse-dot" />
          AI / ML · Web3 · Entrepreneur
          <span className="hidden md:inline text-[var(--line-strong)]">|</span>
          <span className="hidden md:inline">9 years in the engine room</span>
        </motion.p>

        <h1 className="h-display text-[clamp(3.5rem,14vw,11.5rem)] leading-[0.86] tracking-[-0.04em]">
          <span className="block">
            <ScrambleText text="Tomiwa" as="span" delay={120} />
          </span>
          <span className="block">
            <ScrambleText
              text="Philip"
              as="span"
              delay={420}
              className="font-serif-italic text-[var(--accent)]"
            />
            <span className="font-display text-[var(--muted)] text-[0.35em] align-top ml-3 md:ml-5">
              ™
            </span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 grid md:grid-cols-12 gap-6 items-end"
        >
          <p className="md:col-span-7 text-[1.15rem] md:text-[1.4rem] leading-[1.45] text-[var(--fg-dim)] max-w-2xl">
            I build{" "}
            <span className="font-serif-italic text-[var(--fg)]">engines</span>{" "}
            that move trust and value — settlement infrastructure, AI systems,
            and the production glue that turns a thesis into a thing customers
            depend on.
          </p>
          <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <MagneticButton href="#work" variant="accent">
              See the work
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </div>
        </motion.div>

        {/* Bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 left-[var(--gutter)] right-[var(--gutter)] flex items-end justify-between text-[10px] md:text-[11px] font-mono-tight uppercase tracking-[0.18em] text-[var(--muted)]"
        >
          <div className="flex flex-col gap-1">
            <span>Abuja · NG · UTC+1</span>
            <span className="text-[var(--fg-dim)]">
              available for new ventures
            </span>
          </div>
          <a
            href="#about"
            data-cursor="link"
            className="hidden sm:flex flex-col items-center gap-2 hover:text-[var(--accent)] transition-colors"
            aria-label="Scroll to about section"
          >
            <span>scroll</span>
            <span className="block w-[1px] h-10 bg-current animate-[scrollHint_2.2s_var(--ease-in-out)_infinite]" />
          </a>
          <div className="flex flex-col gap-1 text-right">
            <span>v3.0 · 2026</span>
            <span className="text-[var(--fg-dim)]">the settlement engine</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scrollHint {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
