"use client";

import { motion } from "motion/react";
import { experience, type Experience } from "@/lib/content";

const axisColor = (axis: Experience["axis"]) =>
  axis === "ai"
    ? "var(--accent)"
    : axis === "web3"
      ? "var(--accent-2)"
      : axis === "both"
        ? "linear-gradient(135deg, var(--accent), var(--accent-2))"
        : "var(--muted)";

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative px-[var(--gutter)] py-32 md:py-48"
    >
      <div className="max-w-[var(--max)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid md:grid-cols-12 gap-6 items-end"
        >
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">[03] · timeline</p>
            <h2 className="h-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.96]">
              Nine years,{" "}
              <span className="font-serif-italic text-[var(--accent)]">
                one through-line
              </span>
              .
            </h2>
          </div>
          <p className="md:col-span-5 text-[var(--fg-dim)]">
            From agency frontend to enterprise wallet infrastructure to
            production AI — same operator, more leverage each year.
          </p>
        </motion.div>

        <ol className="relative">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--line-strong)] to-transparent"
          />

          {experience.map((row, i) => (
            <Row key={row.company + row.period} row={row} i={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Row({ row, i }: { row: Experience; i: number }) {
  const side = i % 2 === 0 ? "left" : "right";
  const color = axisColor(row.axis);

  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 mb-10 md:mb-16"
    >
      {/* Dot */}
      <span
        aria-hidden
        className="absolute left-[10px] md:left-1/2 top-2 -translate-x-1/2 w-[14px] h-[14px] rounded-full border-2 border-[var(--bg)]"
        style={{
          background: color,
          boxShadow: row.axis === "both" ? "0 0 12px var(--accent-2)" : `0 0 12px ${color}`,
        }}
      />

      <div
        className={
          side === "left"
            ? "md:text-right md:pr-12"
            : "md:col-start-2 md:pl-12 md:order-2"
        }
      >
        <div className="eyebrow mb-2">{row.period}</div>
        <h3 className="font-display text-[1.5rem] md:text-[2rem] leading-tight">
          {row.company}
        </h3>
        <p className="text-[var(--fg-dim)] mt-1">{row.role}</p>
        <p className="text-[var(--fg-dim)] mt-3 text-[15px] leading-relaxed max-w-md md:inline-block">
          {row.blurb}
        </p>
      </div>
    </motion.li>
  );
}
