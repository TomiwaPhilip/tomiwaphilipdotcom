"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 0, 30]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -30]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-[var(--gutter)] py-32 md:py-48"
    >
      <div className="max-w-[var(--max)] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-10"
        >
          [01] · about
        </motion.p>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Pull quote */}
          <motion.div
            style={{ x: leftX }}
            className="md:col-span-7"
          >
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em]">
              Two halves of one engine.{" "}
              <span className="font-serif-italic text-[var(--fg-dim)]">
                The frontier model and the production rail.
              </span>{" "}
              I&apos;ve spent nine years learning to speak both — and to make
              them carry weight together.
            </h2>
          </motion.div>

          {/* Side facts */}
          <motion.div
            style={{ x: rightX }}
            className="md:col-span-5 md:pt-4 space-y-8"
          >
            <Fact label="now" value="Founder · CEO · CTO, Shakes Labs" />
            <Fact label="prev" value="CTO at Vouchify · Zet.money" />
            <Fact label="origin" value="Abuja, Nigeria" />
            <Fact label="degree" value="B.Sc Computer Science · UoPeople" />
          </motion.div>
        </div>

        {/* Dual identity panels */}
        <div className="mt-24 grid md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
          <Panel
            axis="ai"
            title="The AI half"
            kicker="Organic · probabilistic"
            blurb="LLM orchestration, RAG eval harnesses, fine-tuning pipelines, real-time anomaly detection at production scale. From Ivy's research environment to live transaction graphs."
            bullets={[
              "LLM-driven anomaly detection on 100k+ daily transactions",
              "RAG eval framework — 25% accuracy lift on domain queries",
              "Automated SFT + deployment scripts for OSS models",
            ]}
          />
          <Panel
            axis="web3"
            title="The Web3 half"
            kicker="Crystalline · deterministic"
            blurb="Enterprise wallet infrastructure, settlement engines, smart contracts on Base / Avalanche / Ethereum / Solana. Sub-6-second finality, 99.99% uptime, real businesses on top."
            bullets={[
              "Settlement engine: 100k+ tx/day @ 99.99% uptime",
              "Wallet infra for 1,000+ businesses in 7 days from zero",
              "Trust-as-a-Service: multi-sig + decentralized verification",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[var(--line)] pt-3">
      <div className="eyebrow text-[10px]">{label}</div>
      <div className="text-[var(--fg)] text-base md:text-lg mt-1">{value}</div>
    </div>
  );
}

function Panel({
  axis,
  title,
  kicker,
  blurb,
  bullets,
}: {
  axis: "ai" | "web3";
  title: string;
  kicker: string;
  blurb: string;
  bullets: string[];
}) {
  const isAi = axis === "ai";
  const accent = isAi ? "var(--accent)" : "var(--accent-2)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-8 md:p-10 bg-[var(--bg-2)]"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
        />
        <span className="eyebrow" style={{ color: accent }}>
          {kicker}
        </span>
      </div>
      <h3 className="h-display text-[2rem] md:text-[2.5rem] mb-4">{title}</h3>
      <p className="text-[var(--fg-dim)] leading-relaxed mb-6">{blurb}</p>
      <ul className="space-y-2 text-sm">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-[var(--fg-dim)] font-mono-tight text-[12px] uppercase tracking-wider"
          >
            <span
              aria-hidden
              className="mt-[6px] inline-block w-[10px] h-[1px]"
              style={{ background: accent }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
