"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Classic Konami code listener. Purely for fun: confetti and a small toast. */
export default function KonamiEasterEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let progress = 0;
    let hideTimer: ReturnType<typeof setTimeout>;

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Don't hijack typing (terminal, contact form, command palette).
      if (target.closest("input, textarea, [contenteditable='true']")) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[progress]) {
        progress++;
        if (progress === SEQUENCE.length) {
          progress = 0;
          setShow(true);
          try {
            confetti({ particleCount: 140, spread: 90, origin: { y: 0.7 } });
          } catch {
            /* decorative only */
          }
          clearTimeout(hideTimer);
          hideTimer = setTimeout(() => setShow(false), 6000);
        }
      } else {
        progress = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          className="fixed bottom-6 left-1/2 z-[350] w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-sky-500/30 bg-white dark:bg-[#111113] px-5 py-4 shadow-2xl"
        >
          <p className="font-mono text-xs font-bold text-sky-500">Konami code accepted</p>
          <p className="mt-1 text-sm text-slate-700 dark:text-zinc-200">
            +30 lives unlocked. Also unlocked: Hetu is open to work.{" "}
            <a
              href="#contact"
              onClick={() => setShow(false)}
              className="font-semibold text-sky-500 underline"
            >
              Say hello
            </a>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
