import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "A small playground for experiments — a RAG eval harness, a generative trust visualization, and other things that don't fit on a portfolio.",
  alternates: { canonical: `${site.url}/lab` },
  robots: { index: true, follow: true },
};

export default function LabPage() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <section className="relative min-h-[80svh] flex items-center justify-center px-[var(--gutter)] py-32 md:py-44">
          <div className="max-w-[760px] w-full">
            <div className="surface p-8 md:p-12">
              <div className="flex items-center justify-between text-[11px] font-mono-tight uppercase tracking-[0.18em] text-[var(--muted)] mb-8 pb-4 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block w-[7px] h-[7px] rounded-full bg-[var(--accent-2)] pulse-dot"
                  />
                  <span className="text-[var(--accent-2)]">tomiwa@lab</span>
                  <span>:</span>
                  <span>~/experiments</span>
                  <span>$</span>
                  <span>ls --upcoming</span>
                </div>
                <span className="hidden sm:inline">private beta</span>
              </div>

              <h1 className="h-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.96] mb-6">
                The{" "}
                <span className="font-serif-italic text-[var(--accent-2)]">lab</span>{" "}
                is currently sealed.
              </h1>
              <p className="text-[var(--fg-dim)] leading-relaxed max-w-xl mb-10">
                A small playground for things that don&apos;t fit on a portfolio —
                a RAG eval harness, a generative trust visualization, a few
                live shaders. Opens publicly in v1.1.
              </p>

              <ul className="space-y-3 font-mono-tight text-[13px] text-[var(--fg-dim)] mb-10">
                <li>
                  <span className="text-[var(--accent)]">[01]</span> rag-eval-harness/ <span className="text-[var(--muted)]">— planned</span>
                </li>
                <li>
                  <span className="text-[var(--accent)]">[02]</span> trust-graph-viz/ <span className="text-[var(--muted)]">— sketching</span>
                </li>
                <li>
                  <span className="text-[var(--accent)]">[03]</span> shader-studies/ <span className="text-[var(--muted)]">— in progress</span>
                </li>
                <li>
                  <span className="text-[var(--accent)]">[04]</span> stablecoin-flow-sim/ <span className="text-[var(--muted)]">— concept</span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton href="/" variant="ghost">
                  ← back home
                </MagneticButton>
                <Link
                  href="/#contact"
                  className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  data-cursor="link"
                >
                  ping for early access →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
