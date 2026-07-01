import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { writing, type WritingBlock } from "@/lib/content";
import { site } from "@/lib/site";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return writing.map((w) => ({ slug: w.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const w = writing.find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: w.title,
    description: w.blurb,
    keywords: w.keywords,
    alternates: { canonical: `${site.url}/writing/${w.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/writing/${w.slug}`,
      title: `${w.title} · ${site.name}`,
      description: w.blurb,
      images: ["/opengraph-image"],
      publishedTime: `${w.date}-01`,
      tags: w.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${w.title} · ${site.name}`,
      description: w.blurb,
      images: ["/opengraph-image"],
    },
  };
}

const tagColor = {
  ai: "var(--accent)",
  web3: "var(--accent-2)",
  engineering: "var(--fg)",
  essay: "var(--fg-dim)",
} as const;

function renderBlock(block: WritingBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="h-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] mt-16 mb-6 text-[var(--fg)]"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="font-display text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.15] mt-10 mb-4 text-[var(--fg)]"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-[17px] md:text-[18px] leading-[1.75]">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="list-disc pl-6 space-y-3 text-[17px] md:text-[18px] leading-[1.7] marker:text-[var(--muted)]">
          {block.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="list-decimal pl-6 space-y-3 text-[17px] md:text-[18px] leading-[1.7] marker:text-[var(--muted)]">
          {block.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="font-serif-italic text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.4] text-[var(--fg)] my-8 pl-6 border-l-2 border-[var(--accent)]"
        >
          {block.text}
          {block.cite ? (
            <footer className="mt-2 font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] not-italic">
              — {block.cite}
            </footer>
          ) : null}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={i}
          className="my-6 p-5 rounded-lg border border-[var(--line)] bg-[var(--bg-elev)] overflow-x-auto text-[13px] leading-[1.6] font-mono-tight"
        >
          <code>{block.code}</code>
        </pre>
      );
  }
}

export default async function WritingPage({ params }: PageProps) {
  const { slug } = await params;
  const w = writing.find((x) => x.slug === slug);
  if (!w) notFound();

  const idx = writing.findIndex((x) => x.slug === w.slug);
  const next = writing[(idx + 1) % writing.length];
  const wordCount = w.body
    ? w.body.reduce((n, b) => {
        if (b.type === "p" || b.type === "h2" || b.type === "h3" || b.type === "quote") return n + b.text.split(/\s+/).length;
        if (b.type === "ul" || b.type === "ol") return n + b.items.reduce((s, it) => s + it.split(/\s+/).length, 0);
        return n;
      }, 0)
    : undefined;

  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <article className="relative px-[var(--gutter)] pt-32 md:pt-44 pb-24">
          <div className="max-w-[760px] mx-auto">
            <Link
              href="/#writing"
              className="inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--fg)] transition-colors mb-12"
              data-cursor="link"
            >
              <span aria-hidden>←</span> all writing
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono-tight text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border"
                style={{
                  color: tagColor[w.tag],
                  borderColor: `color-mix(in oklab, ${tagColor[w.tag]} 35%, transparent)`,
                }}
              >
                {w.tag}
              </span>
              <span className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {w.date}
              </span>
              <span className="font-mono-tight text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                · {w.read}
              </span>
            </div>

            <h1 className="h-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.96] mb-8">
              {w.title}
            </h1>

            <p className="font-serif-italic text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.35] text-[var(--fg-dim)] mb-16 border-l-2 border-[var(--accent)] pl-6">
              {w.blurb}
            </p>

            {w.body ? (
              <div className="text-[var(--fg-dim)] space-y-6">
                {w.body.map(renderBlock)}

                {w.keywords && w.keywords.length ? (
                  <div className="mt-16 pt-8 border-t border-[var(--line)]">
                    <p className="eyebrow mb-4">tags</p>
                    <ul className="flex flex-wrap gap-2">
                      {w.keywords.map((k) => (
                        <li
                          key={k}
                          className="font-mono-tight text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] px-2.5 py-1 rounded-full border border-[var(--line)]"
                        >
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-[var(--fg-dim)] leading-[1.75] space-y-6">
                <p className="text-[var(--muted)] font-mono-tight text-[12px] uppercase tracking-[0.18em]">
                  draft · long-form essay in progress
                </p>
                <p>
                  This piece is in the editing queue. The argument is sketched, the
                  evidence is logged, the diagrams are half-finished. When it ships
                  it ships — not before. In the meantime, the headline blurb above
                  captures the thesis.
                </p>
                <p>
                  If you&apos;d like to be notified when it&apos;s published, drop a line
                  via the{" "}
                  <Link href="/#contact" className="text-[var(--accent)] underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-[var(--accent)]">
                    contact section
                  </Link>
                  .
                </p>
              </div>
            )}

            <section className="mt-24 border-t border-[var(--line)] pt-12 flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="eyebrow mb-2">next read</p>
                <Link
                  href={`/writing/${next.slug}`}
                  data-cursor="link"
                  className="font-display text-[clamp(1.2rem,2vw,1.8rem)] leading-tight hover:text-[var(--accent)] transition-colors max-w-md inline-block"
                >
                  {next.title} <span aria-hidden>→</span>
                </Link>
              </div>
              <MagneticButton href="/#writing" variant="ghost">
                All writing
              </MagneticButton>
            </section>
          </div>
        </article>
      </main>
      <Footer />
      <Script
        id={`ld-post-${w.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: w.title,
            description: w.blurb,
            datePublished: `${w.date}-01`,
            dateModified: `${w.date}-01`,
            author: { "@type": "Person", name: site.fullName, url: site.url },
            publisher: { "@type": "Person", name: site.fullName, url: site.url },
            mainEntityOfPage: `${site.url}/writing/${w.slug}`,
            image: `${site.url}/opengraph-image`,
            keywords: w.keywords?.join(", ") ?? w.tag,
            articleSection: w.tag,
            wordCount,
            inLanguage: "en",
          }),
        }}
      />
    </>
  );
}
