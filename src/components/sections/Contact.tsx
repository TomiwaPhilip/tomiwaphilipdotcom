"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-[var(--gutter)] py-32 md:py-56"
    >
      <div className="max-w-[var(--max)] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-10"
        >
          [07] · contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95] max-w-5xl"
        >
          Let&apos;s build something{" "}
          <span className="font-serif-italic text-[var(--accent)]">
            that compounds.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-xl text-[var(--fg-dim)] text-lg leading-relaxed"
        >
          Settlement infrastructure, AI systems, an advisory call, or a
          partnership through{" "}
          <a
            href={site.socials.shakeslabs}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Shakes Labs
          </a>
          . If it moves trust or value, it&apos;s probably my kind of problem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href={`mailto:${site.email}`} variant="accent">
            {site.email}
          </MagneticButton>
          <MagneticButton href={site.socials.x} variant="ghost">
            @tomiwaisgod ↗
          </MagneticButton>
          <MagneticButton href={site.socials.github} variant="ghost">
            github ↗
          </MagneticButton>
          <MagneticButton href={site.socials.shakeslabs} variant="ghost">
            shakeslabs ↗
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
        >
          ps · open the developer console for a small surprise · or hit{" "}
          <kbd className="px-1.5 py-0.5 border border-[var(--line-strong)] rounded text-[var(--fg-dim)] font-mono-tight">
            ~
          </kbd>{" "}
          for the terminal
        </motion.p>
      </div>
    </section>
  );
}
