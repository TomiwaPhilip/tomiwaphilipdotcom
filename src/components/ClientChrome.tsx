"use client";

import dynamic from "next/dynamic";

// SceneRoot uses three.js + R3F — keep it strictly client-side and code-split.
export const SceneRootDynamic = dynamic(
  () => import("@/components/three/SceneRoot").then((m) => m.SceneRoot),
  { ssr: false },
);

// Cursor: needs window — also client-only.
export const CursorDynamic = dynamic(
  () => import("@/components/ui/Cursor").then((m) => m.Cursor),
  { ssr: false },
);

// Terminal overlay — opened with `~` or ⌘/Ctrl+K. Lazy so it stays cheap until used.
export const TerminalOverlayDynamic = dynamic(
  () => import("@/components/easter/TerminalOverlay").then((m) => m.TerminalOverlay),
  { ssr: false },
);

// Konami listener — tiny but needs window.
export const KonamiProviderDynamic = dynamic(
  () => import("@/components/easter/KonamiProvider").then((m) => m.KonamiProvider),
  { ssr: false },
);

// Console signature — printed once per tab.
export const ConsoleSigDynamic = dynamic(
  () => import("@/components/easter/ConsoleSig").then((m) => m.ConsoleSig),
  { ssr: false },
);

