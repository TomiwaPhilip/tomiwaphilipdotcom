"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { skills } from "@/lib/content";
import { cn } from "@/lib/cn";

const axisColor = (axis: "ai" | "web3" | "platform") =>
  axis === "ai"
    ? "var(--accent)"
    : axis === "web3"
      ? "var(--accent-2)"
      : "var(--fg)";

export function SkillsCloud() {
  return (
    <section
      id="skills"
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
            <p className="eyebrow mb-4">[04] · stack</p>
            <h2 className="h-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.96]">
              Tools I&apos;ve{" "}
              <span className="font-serif-italic text-[var(--accent)]">
                bent into shape
              </span>
              .
            </h2>
          </div>
          <p className="md:col-span-5 text-[var(--fg-dim)]">
            Hover for a small lift. I&apos;m not a maximalist about tools — I
            pick what gets us from zero to production fastest, with grace.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skills.map((group) => (
            <SkillGroup key={group.group} group={group.group} axis={group.axis} items={group.items} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroup({
  group,
  axis,
  items,
}: {
  group: string;
  axis: "ai" | "web3" | "platform";
  items: string[];
}) {
  const color = axisColor(axis);
  return (
    <div className="grid md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-3">
        <div
          className="font-display text-[1.25rem] md:text-[1.5rem]"
          style={{ color }}
        >
          {group}
        </div>
        <div className="eyebrow mt-1">{axis}</div>
      </div>
      <div className="md:col-span-9 flex flex-wrap gap-2.5">
        {items.map((item, i) => (
          <Chip key={item} label={item} delay={i * 0.04} color={color} />
        ))}
      </div>
    </div>
  );
}

function Chip({
  label,
  delay,
  color,
}: {
  label: string;
  delay: number;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.04 }}
      data-cursor="link"
      className={cn(
        "select-none px-3.5 py-2 rounded-full",
        "border border-[var(--line-strong)] bg-[var(--bg-2)]",
        "text-[13px] font-mono-tight tracking-tight text-[var(--fg)]",
        "cursor-pointer transition-colors hover:border-current",
      )}
      style={{ color }}
    >
      <span className="text-[var(--fg)]">{label}</span>
    </motion.div>
  );
}
