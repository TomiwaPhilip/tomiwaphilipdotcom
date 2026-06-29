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
