"use client";

import { motion } from "motion/react";
import { missions, type Mission } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Missions() {
  return (
    <section
      id="work"
      className="relative px-[var(--gutter)] py-32 md:py-48"
    >
      <div className="max-w-[var(--max)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="eyebrow mb-4">[02] · selected missions</p>
            <h2 className="h-display text-[clamp(2.4rem,6vw,4.6rem)]">
              Engines{" "}
              <span className="font-serif-italic text-[var(--accent)]">
                I&apos;ve built
              </span>
              .
            </h2>
          </div>
          <p className="max-w-md text-[var(--fg-dim)]">
            Four production systems. Real numbers. Read the architecture in 90
            seconds, or pull the thread on any of them.
          </p>
        </motion.div>

        <div className="space-y-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
          {missions.map((m, i) => (
            <MissionCard key={m.slug} mission={m} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  const axisAccent =
    mission.axis === "ai"
      ? "var(--accent)"
      : mission.axis === "web3"
        ? "var(--accent-2)"
        : "var(--fg)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[var(--bg-2)] p-8 md:p-12"
    >
      {/* Top meta row */}
      <div className="flex items-start justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <span className="font-mono-tight text-[12px] text-[var(--muted)]">
            {String(index).padStart(2, "0")}
          </span>
          <span
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-mono-tight uppercase tracking-[0.16em]"
            style={{
              background: `color-mix(in oklab, ${axisAccent} 10%, transparent)`,
              color: axisAccent,
              border: `1px solid color-mix(in oklab, ${axisAccent} 30%, transparent)`,
            }}
          >
            <span
              aria-hidden
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: axisAccent }}
            />
            {mission.axis === "both" ? "AI · WEB3" : mission.axis.toUpperCase()}
          </span>
          <span className="text-[var(--muted)] text-[12px] font-mono-tight uppercase tracking-[0.16em]">
            {mission.period}
          </span>
          {mission.status === "active" && (
            <span className="text-[var(--accent)] text-[10px] font-mono-tight uppercase tracking-[0.18em] flex items-center gap-1.5">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] pulse-dot" />
              live
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <header className="mb-8 grid md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-8">
          <h3 className="h-display text-[clamp(2rem,5vw,3.6rem)] leading-[0.96]">
            {mission.company}
          </h3>
          <p className="text-[var(--fg-dim)] mt-3 text-base md:text-lg">
            {mission.role}
          </p>
        </div>
        <p className="md:col-span-4 font-serif-italic text-[var(--fg)] text-lg md:text-xl leading-[1.3]">
          {mission.oneLiner}
        </p>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius)] overflow-hidden mb-10">
        {mission.metrics.map((m) => {
          const numeric = parseFloat(m.value.replace(/[,<+]/g, ""));
          const isNum = !Number.isNaN(numeric);
          return (
            <div
              key={m.label}
              className="bg-[var(--bg)] p-5 md:p-6 flex flex-col gap-2"
            >
              <div className="h-display text-[clamp(2rem,5vw,3.4rem)] leading-none">
                {isNum ? (
                  <Counter
                    to={numeric}
                    formatter={(n) => {
                      // mimic comma formatting if original had it
                      if (m.value.includes(","))
                        return Math.round(n).toLocaleString();
                      if (numeric < 10)
                        return n.toFixed(numeric % 1 === 0 ? 0 : 1);
                      return Math.round(n).toString();
                    }}
                  />
                ) : (
                  <span>{m.value}</span>
                )}
                {m.suffix && (
                  <span className="text-[var(--accent)]">{m.suffix}</span>
                )}
              </div>
              <div className="eyebrow text-[10px]">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Problem / Approach / Impact */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <Column label="problem" body={mission.problem} />
        <Column label="approach" body={mission.approach} />
        <Column label="impact" body={mission.impact} accent />
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="eyebrow text-[10px] mr-1">stack</span>
        {mission.stack.map((t) => (
          <span
            key={t}
            className="text-[11px] font-mono-tight uppercase tracking-[0.12em] text-[var(--fg-dim)] border border-[var(--line)] rounded-full px-2.5 py-1"
          >
            {t}
          </span>
        ))}
        <div className="ml-auto">
          <MagneticButton href={`/work/${mission.slug}`} variant="ghost">
            Read the case →
          </MagneticButton>
        </div>
      </div>

      {/* Hover halo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(700px 300px at 50% 0%, color-mix(in oklab, ${axisAccent} 10%, transparent), transparent 70%)`,
        }}
      />
    </motion.article>
  );
}

function Column({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="eyebrow mb-3" style={accent ? { color: "var(--accent)" } : undefined}>
        {label}
      </div>
      <p className="text-[var(--fg-dim)] leading-relaxed text-[15px]">
        {body}
      </p>
    </div>
  );
}
