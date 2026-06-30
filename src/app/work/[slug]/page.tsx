import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { missions } from "@/lib/content";
import { site } from "@/lib/site";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/Footer";
import { Counter } from "@/components/ui/Counter";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return missions.map((m) => ({ slug: m.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const m = missions.find((x) => x.slug === slug);
  if (!m) return {};
  const title = `${m.company} — ${m.role}`;
  const description = `${m.oneLiner} ${m.period}. ${m.impact}`;
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/work/${m.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${m.slug}`,
      title: `${title} · ${site.name}`,
      description,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}

const axisColor = {
  ai: "var(--accent)",
  web3: "var(--accent-2)",
  both: "var(--accent)",
} as const;

const axisLabel = { ai: "AI", web3: "WEB3", both: "AI · WEB3" } as const;

function parseMetric(value: string): { num: number; suffix: string } {
  const match = value.match(/^([0-9,.<>]+)([A-Za-z%+]*)$/);
  if (!match) return { num: NaN, suffix: value };
  const numStr = match[1].replace(/[<>,]/g, "");
  const num = parseFloat(numStr);
  return { num: isNaN(num) ? NaN : num, suffix: match[2] };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const m = missions.find((x) => x.slug === slug);
  if (!m) notFound();

  const idx = missions.findIndex((x) => x.slug === m.slug);
  const next = missions[(idx + 1) % missions.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${m.company} — ${m.role}`,
    description: m.oneLiner,
    author: { "@type": "Person", name: site.fullName, url: site.url },
    publisher: { "@type": "Person", name: site.fullName, url: site.url },
    datePublished: m.period.split(" ")[0],
    mainEntityOfPage: `${site.url}/work/${m.slug}`,
    image: `${site.url}/opengraph-image`,
    keywords: m.stack.join(", "),
  };

  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <article className="relative px-[var(--gutter)] pt-32 md:pt-44 pb-24">
          <div className="max-w-[var(--max)] mx-auto">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--fg)] transition-colors mb-12"
              data-cursor="link"
            >
              <span aria-hidden>←</span> all work
            </Link>

            <div className="grid md:grid-cols-12 gap-8 mb-16">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="font-mono-tight text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border"
                    style={{
                      color: axisColor[m.axis],
                      borderColor: `color-mix(in oklab, ${axisColor[m.axis]} 40%, transparent)`,
                    }}
                  >
                    {axisLabel[m.axis]}
                  </span>
                  <span className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {m.period}
                  </span>
                  {m.status === "active" && (
                    <span className="font-mono-tight text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] flex items-center gap-1.5">
                      <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
                      live
                    </span>
                  )}
                </div>

                <h1 className="h-display text-[clamp(3rem,9vw,7rem)] leading-[0.92] mb-4">
                  {m.company}
                </h1>
                <p className="font-mono-tight uppercase tracking-[0.18em] text-[12px] text-[var(--fg-dim)] mb-8">
                  {m.role}
                </p>
                <p className="font-serif-italic text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2] text-[var(--fg-dim)] max-w-2xl">
                  {m.oneLiner}
                </p>
              </div>

              <aside className="md:col-span-4 md:pl-8 md:border-l md:border-[var(--line)]">
                <div className="space-y-6 font-mono-tight text-[12px]">
                  <div>
                    <p className="uppercase tracking-[0.18em] text-[10px] text-[var(--muted)] mb-2">role</p>
                    <p className="text-[var(--fg)]">{m.role}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.18em] text-[10px] text-[var(--muted)] mb-2">period</p>
                    <p className="text-[var(--fg)]">{m.period}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.18em] text-[10px] text-[var(--muted)] mb-2">stack</p>
                    <p className="text-[var(--fg-dim)] leading-relaxed">
                      {m.stack.join(" · ")}
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            <section className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden mb-20">
              {m.metrics.map((metric) => {
                const { num, suffix } = parseMetric(metric.value);
                return (
                  <div key={metric.label} className="bg-[var(--bg)] p-6 md:p-10">
                    <p className="h-display text-[clamp(2.4rem,5vw,4rem)] leading-none">
                      {!isNaN(num) ? (
                        <Counter to={num} duration={1800} />
                      ) : (
                        metric.value
                      )}
                      <span className="text-[var(--accent)]">{suffix}{metric.suffix ?? ""}</span>
                    </p>
                    <p className="mt-3 font-mono-tight text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </section>

            <section className="grid md:grid-cols-12 gap-10 mb-20">
              <div className="md:col-span-4">
                <p className="eyebrow mb-4">problem</p>
                <p className="text-[var(--fg-dim)] leading-relaxed">{m.problem}</p>
              </div>
              <div className="md:col-span-4">
                <p className="eyebrow mb-4">approach</p>
                <p className="text-[var(--fg-dim)] leading-relaxed">{m.approach}</p>
              </div>
              <div className="md:col-span-4">
                <p
                  className="eyebrow mb-4"
                  style={{ color: axisColor[m.axis] }}
                >
                  impact
                </p>
                <p className="text-[var(--fg)] leading-relaxed">{m.impact}</p>
              </div>
            </section>

            <section className="mb-20">
              <p className="eyebrow mb-6">stack</p>
              <div className="flex flex-wrap gap-2">
                {m.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono-tight text-[11px] uppercase tracking-[0.16em] px-3 py-1.5 border border-[var(--line-strong)] rounded-full text-[var(--fg-dim)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className="border-t border-[var(--line)] pt-12 flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="eyebrow mb-2">next case</p>
                <Link
                  href={`/work/${next.slug}`}
                  data-cursor="link"
                  className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight hover:text-[var(--accent)] transition-colors"
                >
                  {next.company} <span aria-hidden>→</span>
                </Link>
              </div>
              <MagneticButton href="/#contact" variant="accent">
                Work together
              </MagneticButton>
            </section>
          </div>
        </article>
      </main>
      <Footer />
      <Script
        id={`ld-article-${m.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
