"use client";

import { create } from "zustand";

export type ScenePhase =
  | "hero"
  | "about"
  | "work"
  | "timeline"
  | "skills"
  | "writing"
  | "now"
  | "contact";

interface SceneState {
  phase: ScenePhase;
  scrollProgress: number; // 0..1 across the whole page
  audioOn: boolean;
  reducedMotion: boolean;
  terminalOpen: boolean;
  konamiUnlocked: boolean;

  setPhase: (p: ScenePhase) => void;
  setScrollProgress: (n: number) => void;
  toggleAudio: () => void;
  setReducedMotion: (b: boolean) => void;
  setTerminalOpen: (b: boolean) => void;
  unlockKonami: () => void;
}

export const useScene = create<SceneState>((set) => ({
  phase: "hero",
  scrollProgress: 0,
  audioOn: false,
  reducedMotion: false,
  terminalOpen: false,
  konamiUnlocked: false,

  setPhase: (p) => set({ phase: p }),
  setScrollProgress: (n) => set({ scrollProgress: n }),
  toggleAudio: () => set((s) => ({ audioOn: !s.audioOn })),
  setReducedMotion: (b) => set({ reducedMotion: b }),
  setTerminalOpen: (b) => set({ terminalOpen: b }),
  unlockKonami: () => set({ konamiUnlocked: true }),
}));
