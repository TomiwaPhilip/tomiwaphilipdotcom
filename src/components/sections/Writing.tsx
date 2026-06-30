"use client";

import { motion } from "motion/react";
import { writing } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Writing() {
  return (
    <section
      id="writing"
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
            <p className="eyebrow mb-4">[05] · writing</p>
            <h2 className="h-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.96]">
              Notes from the{" "}
              <span className="font-serif-italic text-[var(--accent)]">
                engine room
              </span>
              .
            </h2>
          </div>
          <p className="md:col-span-5 text-[var(--fg-dim)]">
            Long-form on what worked, what didn&apos;t, and the architecture
            decisions that compound — or don&apos;t.
          </p>
        </motion.div>

        <ul className="border-t border-[var(--line)]">
          {writing.map((post, i) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group border-b border-[var(--line)]"
            >
              <a
                href={post.href ?? `/writing/${post.slug}`}
                data-cursor="link"
                className="grid md:grid-cols-12 gap-6 items-baseline py-7 md:py-9 px-2 md:px-4 hover:bg-[var(--bg-2)] transition-colors"
              >
                <div className="md:col-span-1 eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-[1.3rem] md:text-[1.8rem] leading-[1.1] group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[var(--fg-dim)] mt-2 text-[15px] max-w-xl">
                    {post.blurb}
                  </p>
                </div>
                <div className="md:col-span-2 eyebrow">{post.date}</div>
                <div className="md:col-span-2 flex items-center md:justify-end gap-3">
                  <span
                    className={cn(
                      "text-[10px] font-mono-tight uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border",
                      post.tag === "ai" &&
                        "text-[var(--accent)] border-[color-mix(in_oklab,var(--accent)_40%,transparent)]",
                      post.tag === "web3" &&
                        "text-[var(--accent-2)] border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]",
                      post.tag === "engineering" &&
                        "text-[var(--fg)] border-[var(--line-strong)]",
                      post.tag === "essay" &&
                        "text-[var(--fg-dim)] border-[var(--line)]",
                    )}
                  >
                    {post.tag}
                  </span>
                  <span className="text-[var(--muted)] text-[11px] font-mono-tight uppercase tracking-[0.16em]">
                    {post.read}
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
