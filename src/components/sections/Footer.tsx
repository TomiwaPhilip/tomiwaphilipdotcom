import { site } from "@/lib/site";

const colophon = [
  "Next 16",
  "React 19",
  "TypeScript",
  "Tailwind v4",
  "Motion",
  "R3F + drei",
  "GLSL",
  "Tone.js",
  "Lenis",
  "Vercel",
];

export function Footer() {
  return (
    <footer className="relative px-[var(--gutter)] py-16 border-t border-[var(--line)]">
      <div className="max-w-[var(--max)] mx-auto">
        {/* Marquee strip */}
        <div className="overflow-hidden mb-12 border-y border-[var(--line)] py-3">
          <div className="marquee-track text-[var(--muted)] font-mono-tight text-[12px] uppercase tracking-[0.2em]">
            {Array.from({ length: 2 }).flatMap((_, j) =>
              colophon.map((t, i) => (
                <span
                  key={`${j}-${i}`}
                  className="inline-flex items-center gap-3"
                >
                  <span
                    aria-hidden
                    className="inline-block w-[5px] h-[5px] rounded-full bg-[var(--accent)]"
                  />
                  {t}
                </span>
              )),
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="h-display text-[clamp(2rem,6vw,4rem)] leading-[0.95]">
              {site.name.split(" ")[0]}{" "}
              <span className="font-serif-italic text-[var(--accent)]">
                {site.name.split(" ")[1]}
              </span>
            </div>
            <p className="text-[var(--fg-dim)] mt-3 max-w-md">
              {site.tagline}
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-y-3 gap-x-6 text-[12px] font-mono-tight uppercase tracking-[0.16em]">
            <a
              href={`mailto:${site.email}`}
              data-cursor="link"
              className="text-[var(--fg-dim)] hover:text-[var(--accent)] transition-colors"
            >
              email ↗
            </a>
            <a
              href={site.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-[var(--fg-dim)] hover:text-[var(--accent)] transition-colors"
            >
              x / twitter ↗
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-[var(--fg-dim)] hover:text-[var(--accent)] transition-colors"
            >
              github ↗
            </a>
            <a
              href={site.socials.shakeslabs}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-[var(--fg-dim)] hover:text-[var(--accent)] transition-colors"
            >
              shakes labs ↗
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--line)] flex flex-wrap justify-between gap-4 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-[var(--muted)]">
          <span>© {new Date().getFullYear()} {site.fullName}</span>
          <span>Abuja · NG · UTC+1</span>
          <span>v3.0 — designed and built in the open</span>
        </div>
      </div>
    </footer>
  );
}
