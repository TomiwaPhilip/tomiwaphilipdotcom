import { site } from "@/lib/site";

export default function Home() {
  return (
    <main id="main" className="relative">
      <section className="min-h-[100svh] flex items-center justify-center px-[var(--gutter)]">
        <div className="text-center max-w-3xl">
          <p className="eyebrow mb-6">{site.location} · settlement engine v0</p>
          <h1 className="h-display text-[clamp(3rem,10vw,8rem)] mb-6">
            {site.name.split(" ")[0]}{" "}
            <span className="font-serif-italic text-[var(--accent)]">
              {site.name.split(" ")[1]}
            </span>
          </h1>
          <p className="text-[var(--fg-dim)] text-lg max-w-xl mx-auto">
            {site.tagline}
          </p>
        </div>
      </section>
    </main>
  );
}
