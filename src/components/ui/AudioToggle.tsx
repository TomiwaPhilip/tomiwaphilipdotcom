"use client";

import { useEffect, useRef } from "react";
import { useScene } from "@/lib/store";
import { cn } from "@/lib/cn";

/**
 * Ambient audio toggle. Synthesizes a slow, low-octave drone via Tone.js
 * (no external assets). Persists state to localStorage.
 */
export function AudioToggle({ className }: { className?: string }) {
  const audioOn = useScene((s) => s.audioOn);
  const toggleAudio = useScene((s) => s.toggleAudio);
  const reducedMotion = useScene((s) => s.reducedMotion);
  type ToneNodes = {
    synth: { triggerRelease: () => void; dispose: () => void; toDestination: () => unknown };
    lfo: { stop: () => void; dispose: () => void };
    filter: { dispose: () => void };
    started: boolean;
    chord?: string[];
    triggerAttack?: (notes: string[]) => void;
  };
  const synthRef = useRef<ToneNodes | null>(null);

  // Restore saved preference
  useEffect(() => {
    const v = localStorage.getItem("audioOn");
    if (v === "1" && !audioOn) toggleAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("audioOn", audioOn ? "1" : "0");
  }, [audioOn]);

  useEffect(() => {
    let cancelled = false;

    async function setup() {
      if (!audioOn) return;
      const Tone = await import("tone");
      if (cancelled) return;
      await Tone.start();

      const synth = new Tone.PolySynth(Tone.AMSynth, {
        envelope: { attack: 2.4, decay: 1.4, sustain: 0.7, release: 4 },
        oscillator: { type: "sine" },
        harmonicity: 1.6,
        volume: -12,
      });
      const filter = new Tone.Filter(1400, "lowpass");
      const reverb = new Tone.Reverb({ decay: 7, wet: 0.55 });
      const lfo = new Tone.LFO(0.06, 900, 2200).start();
      lfo.connect(filter.frequency);

      synth.chain(filter, reverb, Tone.getDestination());

      const chord = ["A2", "C3", "E3", "G3"];
      synth.triggerAttack(chord);

      synthRef.current = {
        synth: synth as unknown as ToneNodes["synth"],
        lfo: lfo as unknown as ToneNodes["lfo"],
        filter: filter as unknown as ToneNodes["filter"],
        started: true,
        chord,
      };
    }

    function teardown() {
      const ref = synthRef.current;
      if (!ref) return;
      try {
        ref.synth.triggerRelease();
        ref.lfo.stop();
      } catch {}
      setTimeout(() => {
        try {
          ref.synth.dispose();
          ref.lfo.dispose();
          ref.filter.dispose();
        } catch {}
        synthRef.current = null;
      }, 200);
    }

    if (audioOn) setup();
    else teardown();

    return () => {
      cancelled = true;
      teardown();
    };
  }, [audioOn]);

  if (reducedMotion) return null;

  // Browsers gate AudioContext.resume() behind a user gesture. We unlock it
  // synchronously inside the click handler (before flipping zustand state) so
  // the subsequent setup effect doesn't try to resume a still-suspended context.
  async function handleClick() {
    if (!audioOn) {
      try {
        const Tone = await import("tone");
        await Tone.start();
      } catch {
        /* ignore — effect will retry */
      }
    }
    toggleAudio();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="link"
      aria-pressed={audioOn}
      aria-label={audioOn ? "Mute ambient sound" : "Play ambient sound"}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)]",
        "px-3 py-1.5 text-[11px] font-mono-tight uppercase tracking-[0.16em]",
        "text-[var(--fg-dim)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "relative inline-flex items-center gap-[2px]",
          audioOn ? "text-[var(--accent)]" : "text-[var(--muted)]",
        )}
      >
        <Bar active={audioOn} delay="0ms" />
        <Bar active={audioOn} delay="180ms" tall />
        <Bar active={audioOn} delay="320ms" />
      </span>
      {audioOn ? "sound on" : "sound off"}
    </button>
  );
}

function Bar({ active, delay, tall }: { active: boolean; delay: string; tall?: boolean }) {
  return (
    <span
      style={{
        width: 2,
        height: tall ? 12 : 8,
        background: "currentColor",
        display: "inline-block",
        transformOrigin: "bottom",
        animation: active ? `audiobar 0.9s ease-in-out ${delay} infinite` : "none",
        opacity: active ? 1 : 0.4,
      }}
    >
      <style jsx>{`
        @keyframes audiobar {
          0%, 100% { transform: scaleY(0.5); }
          50%      { transform: scaleY(1); }
        }
      `}</style>
    </span>
  );
}
