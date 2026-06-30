"use client";

import { useEffect } from "react";

export function ConsoleSig() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Print once per session to avoid Fast Refresh spam
    const KEY = "__tomiwa_sig__";
    type WithSig = Window & { [KEY]?: boolean };
    const w = window as WithSig;
    if (w[KEY]) return;
    w[KEY] = true;

    const title =
      "%c TOMIWA · PHILIP %c   engines that move trust and value ";
    const titleStyles = [
      "background:#d4ff3a;color:#0a0a0b;font:600 14px/1.6 ui-monospace,monospace;padding:6px 10px;border-radius:4px 0 0 4px;",
      "background:#15151a;color:#f4f4f2;font:400 12px/1.6 ui-monospace,monospace;padding:6px 10px;border-radius:0 4px 4px 0;",
    ];
    console.log(title, ...titleStyles);
    console.log(
      "%cps · hit `~` for the terminal, or try the konami code on the homepage.",
      "color:#7a7a74;font:12px ui-monospace,monospace;padding:4px 0;",
    );
    console.log(
      "%cif you're reading this, you probably care about how things are built. let's talk → tomiwaphilip1100@gmail.com",
      "color:#5b2bff;font:12px ui-monospace,monospace;padding:2px 0 10px;",
    );
  }, []);

  return null;
}
