# tomiwaphilip.com

Personal site of Tomiwa Philip — entrepreneur (Shakes Labs), builder, and writer at the intersection of **AI** and **Web3**.

> *"The Settlement Engine"* — a persistent WebGL Trust Core morphs across scroll phases as you move through the work.

Replaces the legacy `tomiwaphilip.rf.gd` site. Designed to rank first for the name *"Tomiwa Philip"* on Google.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI runtime | **React 19** |
| Styles | **Tailwind v4** (`@theme inline` tokens, no config file) |
| Motion | **motion/react** (rebranded Framer Motion) + **Lenis** smooth scroll |
| 3D | **three** + **@react-three/fiber** + **drei** + **postprocessing** |
| State | **zustand** (`useScene`) |
| Audio | **Tone.js** (lazy-loaded on enable) |
| Type | **TypeScript** strict, ESLint flat config |
| Fonts | Inter (sans), JetBrains Mono (mono), Fraunces SOFT/WONK (display), Instrument Serif Italic (serif) |

Palette: `bg #0a0a0b` · `fg #f4f4f2` · `muted #7a7a74` · `chartreuse #d4ff3a` (AI axis) · `violet #5b2bff` (Web3 axis).

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000  (Turbopack)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

Prefers Node 20+.

If port 3000 is busy:

```bash
lsof -ti:3000 -ti:3001 | sort -u | xargs -r kill -9
```

---

## Project layout

```
src/
├─ app/
│  ├─ layout.tsx              # root, metadata, JSON-LD, font + provider wiring
│  ├─ page.tsx                # homepage composition
│  ├─ globals.css             # design tokens + utilities (Tailwind v4)
│  ├─ opengraph-image.tsx     # OG image generator
│  ├─ robots.ts / sitemap.ts  # search-engine surfaces
│  ├─ work/[slug]/page.tsx    # case studies (static, generateMetadata + Article JSON-LD)
│  ├─ writing/[slug]/page.tsx # long-form placeholders
│  └─ lab/page.tsx            # konami-unlocked playground (v1.1)
├─ components/
│  ├─ ClientChrome.tsx        # client-only wrapper for SceneRoot, Cursor, easter eggs
│  ├─ three/                  # SceneRoot, TrustCore, shaders
│  ├─ sections/               # Hero, About, Missions, Timeline, SkillsCloud, Writing, Now, Contact, Footer
│  ├─ ui/                     # primitives (Counter, MagneticButton, ScrambleText, …)
│  └─ easter/                 # TerminalOverlay, KonamiProvider, ConsoleSig
├─ content/                   # missions, writing, timeline (typed data)
└─ lib/                       # store, lenis, motion
```

### Key design notes

- The 3D Trust Core lives **inside** `<body>` at `z-index: -10`. The body must stay transparent; the page background is set on `html` only. (Painting bg on the body hides the canvas.)
- `next/dynamic({ ssr: false })` is used for the Canvas wrapper, terminal overlay, and konami provider — they must never SSR.
- Reduced motion is honored everywhere: Lenis bails, the scene falls back to a static gradient, counters skip animation.
- React 19 dropped the dynamic JSX namespace shortcut, so `ScrambleText` uses `createElement(as, …)` instead of `<Tag>`.

---

## Easter eggs

| Trigger | Effect |
| --- | --- |
| `~` or `⌘K` / `Ctrl+K` | Open terminal overlay — `help`, `about`, `work`, `contact`, `cv`, `theme`, `sound` |
| `↑ ↑ ↓ ↓ ← → ← → b a` | Unlock the lab — redirects to `/lab` |
| Open DevTools console | Console signature greeting |

---

## SEO

- `metadata` set per route with canonical URL, OG, Twitter card.
- `<Person>` + `<WebSite>` JSON-LD in the root layout.
- `<Article>` JSON-LD on each case study.
- `robots.txt`, `sitemap.xml`, and a generated `opengraph-image` are first-class routes.
- All dynamic routes are statically prerendered (`generateStaticParams`) — 15 routes total.

### Post-launch checklist

1. **Google Search Console** — verify ownership via `metadata.verification.google` on the root layout, then submit `https://www.tomiwaphilip.com/sitemap.xml`.
2. **Bing Webmaster Tools** — submit the same sitemap.
3. **301 redirect** from `tomiwaphilip.rf.gd` if the host allows it — preserves any existing link equity.
4. Validate JSON-LD with [Google's Rich Results Test](https://search.google.com/test/rich-results).
5. Preview OG image with [opengraph.xyz](https://www.opengraph.xyz/) and [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator).
6. Run Lighthouse against production — target Performance ≥ 90, SEO 100, A11y ≥ 95.

---

## Deployment

### Vercel (recommended)

```bash
npx vercel link        # connect to an existing project
npx vercel --prod      # ship
```

Or push to GitHub and connect the repo in the Vercel dashboard — Next.js 16 is auto-detected, no `vercel.json` required.

### Custom domain — `tomiwaphilip.com`

1. In the Vercel project: **Settings → Domains → Add** `tomiwaphilip.com` and `www.tomiwaphilip.com`.
2. At your DNS provider, point the apex `@` to Vercel:
   - **A** record → `76.76.21.21`
3. Point `www` to Vercel:
   - **CNAME** record → `cname.vercel-dns.com`
4. Set `www` as the redirect target (or vice versa) so one canonical host stays.
5. Vercel issues an SSL certificate automatically once DNS propagates.

After DNS resolves, update `NEXT_PUBLIC_SITE_URL` (if you wire it) or confirm `src/app/sitemap.ts` and `src/app/layout.tsx` use the production origin.

---

## Roadmap

- v1.0 — this build: homepage, case studies, writing placeholders, easter eggs.
- v1.1 — open the lab: RAG eval harness, trust-graph visualization, shader studies.
- v1.2 — long-form essays graduate from "draft" to publish.

---

## License

Content © Tomiwa Philip. Code is for reference — feel free to learn from it, please don't redeploy it as-is.
