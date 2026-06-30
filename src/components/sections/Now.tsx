"use client";

import { motion } from "motion/react";
import { now } from "@/lib/content";

const kindColor = {
  building: "var(--accent)",
  shipping: "var(--accent-2)",
  thinking: "var(--fg)",
  reading: "var(--fg-dim)",
} as const;

export function Now() {
  const today = new Date();
  const stamp = today.toISOString().slice(0, 10);

  return (
    <section
      id="now"
      className="relative px-[var(--gutter)] py-32 md:py-48"
    >
      <div className="max-w-[var(--max)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid md:grid-cols-12 gap-6 items-end"
        >
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">[06] · now</p>
            <h2 className="h-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.96]">
              What I&apos;m{" "}
              <span className="font-serif-italic text-[var(--accent)]">
                actually doing
              </span>{" "}
              today.
            </h2>
          </div>
          <p className="md:col-span-5 text-[var(--fg-dim)]">
            A small, honest window into the current focus. Updated when the
            focus changes — not before.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="surface relative overflow-hidden p-6 md:p-10"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between text-[11px] font-mono-tight uppercase tracking-[0.16em] text-[var(--muted)] mb-6 pb-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block w-[7px] h-[7px] rounded-full bg-[var(--accent)] pulse-dot"
              />
              <span className="text-[var(--accent)]">tomiwa@shakes-labs</span>
              <span className="text-[var(--line-strong)]">:</span>
              <span>~/now</span>
              <span className="text-[var(--line-strong)]">$</span>
              <span>cat focus.md</span>
            </div>
            <span className="hidden sm:inline">{stamp}</span>
          </div>

          {/* Items */}
          <ul className="space-y-5 font-mono-tight text-[14px] md:text-[15px]">
            {now.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-4 items-start"
              >
                <span
                  className="uppercase tracking-[0.18em] text-[10px] md:text-[11px] mt-1.5"
                  style={{ color: kindColor[item.kind] }}
                >
                  {item.kind}
                </span>
                <div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-[var(--accent)]"
                    >
                      {item.label}
                      <span className="ml-1 text-[var(--muted)]">↗</span>
                    </a>
                  ) : (
                    <span className="text-[var(--fg)]">{item.label}</span>
                  )}
                  {item.detail && (
                    <p className="text-[var(--fg-dim)] mt-1 leading-relaxed max-w-2xl">
                      {item.detail}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Status bar */}
          <div className="mt-8 pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono-tight uppercase tracking-[0.18em] text-[var(--muted)]">
            <span>
              status:{" "}
              <span className="text-[var(--accent)]">accepting new ventures</span>
            </span>
            <span>last commit · {stamp}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
