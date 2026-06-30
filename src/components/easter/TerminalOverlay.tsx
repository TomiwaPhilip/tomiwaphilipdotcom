"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useScene } from "@/lib/store";
import { site } from "@/lib/site";

type Line = { kind: "in" | "out" | "ok" | "err"; text: string };

const HELP = `Available commands:
  about        — quick bio
  work         — list case studies
  open <slug>  — open a case study (e.g. open vouchify)
  contact      — show email + socials
  cv           — open the printable resume
  sound on|off — toggle ambient audio
  theme        — print active palette
  lab          — open the lab
  clear        — clear the terminal
  exit         — close (or hit \`~\` again)
  help         — this message`;

const WORK = [
  "vouchify     · Trust-as-a-Service settlement engine",
  "zet-money    · Crypto-native payment gateway",
  "mileston     · Enterprise wallet infra",
  "veridaq      · AI-powered product engineering",
];

export function TerminalOverlay() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const setAudio = useScene((s) => s.setAudio);
  const audioOn = useScene((s) => s.audioOn);
  const reducedMotion = useScene((s) => s.reducedMotion);

  const push = useCallback((line: Line) => {
    setHistory((h) => [...h, line]);
  }, []);

  const closeAndReset = useCallback(() => {
    setOpen(false);
  }, []);

  // Initial banner
  useEffect(() => {
    if (open && history.length === 0) {
      setHistory([
        { kind: "ok", text: `tomiwa@settlement-engine · ${new Date().toISOString().slice(0, 10)}` },
        { kind: "out", text: `welcome. type 'help' to begin. esc / \`~\` to exit.` },
      ]);
    }
  }, [open, history.length]);

  // Toggle hotkeys: ~ or ⌘/Ctrl + K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!isTyping && e.key === "`") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        closeAndReset();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeAndReset]);

  // Focus + autoscroll
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [history]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    push({ kind: "in", text: cmd });

    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").trim().toLowerCase();

    switch (head.toLowerCase()) {
      case "help":
        push({ kind: "out", text: HELP });
        break;
      case "about":
        push({
          kind: "out",
          text: `${site.fullName} · ${site.role}\nAbuja, NG · 9+ years\nBuilding: Shakes Labs · Vouchify settlement engine`,
        });
        break;
      case "work":
        push({ kind: "out", text: WORK.join("\n") });
        push({ kind: "out", text: `→ open <slug> to dive in` });
        break;
      case "open": {
        const valid = ["vouchify", "zet-money", "mileston", "veridaq"];
        if (!arg) {
          push({ kind: "err", text: "open needs a slug. try: open vouchify" });
          break;
        }
        if (!valid.includes(arg)) {
          push({ kind: "err", text: `unknown slug '${arg}'. try one of: ${valid.join(", ")}` });
          break;
        }
        push({ kind: "ok", text: `→ /work/${arg}` });
        closeAndReset();
        router.push(`/work/${arg}`);
        break;
      }
      case "contact":
        push({
          kind: "out",
          text: `email   · ${site.email}\nx       · ${site.socials.x}\ngithub  · ${site.socials.github}\nstudio  · ${site.socials.shakeslabs}`,
        });
        break;
      case "cv":
        push({ kind: "ok", text: "opening printable resume in new tab…" });
        window.open("/?print=cv", "_blank", "noopener");
        break;
      case "sound": {
        if (arg === "on") {
          setAudio(true);
          push({ kind: "ok", text: "ambient drone · on" });
        } else if (arg === "off") {
          setAudio(false);
          push({ kind: "ok", text: "ambient drone · off" });
        } else {
          push({ kind: "out", text: `sound is currently ${audioOn ? "on" : "off"}. usage: sound on|off` });
        }
        break;
      }
      case "theme":
        push({
          kind: "out",
          text: `bg       · #0a0a0b\nfg       · #f4f4f2\naccent   · #d4ff3a · chartreuse (ai)\naccent-2 · #5b2bff · violet     (web3)`,
        });
        break;
      case "lab":
        push({ kind: "ok", text: "→ /lab" });
        closeAndReset();
        router.push("/lab");
        break;
      case "clear":
        setHistory([]);
        break;
      case "exit":
      case "quit":
      case "close":
        closeAndReset();
        break;
      default:
        push({ kind: "err", text: `command not found: ${head}. type 'help'.` });
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeAndReset();
          }}
        >
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="surface w-full max-w-[760px] h-[min(70vh,560px)] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Command terminal"
          >
            <div className="flex items-center justify-between text-[11px] font-mono-tight uppercase tracking-[0.18em] text-[var(--muted)] px-5 py-3 border-b border-[var(--line)]">
              <div className="flex items-center gap-2">
                <span aria-hidden className="w-[7px] h-[7px] rounded-full bg-[var(--accent)] pulse-dot" />
                <span className="text-[var(--accent)]">tomiwa@settlement-engine</span>
                <span>:</span>
                <span>~</span>
              </div>
              <button
                onClick={closeAndReset}
                className="hover:text-[var(--fg)] transition-colors"
                aria-label="Close terminal"
              >
                esc
              </button>
            </div>

            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto px-5 py-4 font-mono-tight text-[13px] leading-[1.55]"
            >
              {history.map((line, i) => (
                <pre
                  key={i}
                  className={
                    line.kind === "in"
                      ? "text-[var(--fg)] whitespace-pre-wrap break-words"
                      : line.kind === "err"
                        ? "text-[#ff7a6c] whitespace-pre-wrap break-words"
                        : line.kind === "ok"
                          ? "text-[var(--accent)] whitespace-pre-wrap break-words"
                          : "text-[var(--fg-dim)] whitespace-pre-wrap break-words"
                  }
                >
                  {line.kind === "in" ? `$ ${line.text}` : line.text}
                </pre>
              ))}
            </div>

            <form
              className="flex items-center gap-2 px-5 py-3 border-t border-[var(--line)] font-mono-tight text-[13px]"
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
            >
              <span className="text-[var(--accent)]">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[var(--fg)] caret-[var(--accent)]"
                placeholder="type a command — 'help' to see all"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
