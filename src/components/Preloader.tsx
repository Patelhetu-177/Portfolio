"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundBoxes } from "@/components/ui/background-boxes";

const MIN_MS = 1600;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setMounted(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = Math.min(92, (elapsed / MIN_MS) * 92);
      setProgress((prev) => Math.max(prev, eased));

      if (elapsed < MIN_MS || document.readyState !== "complete") {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setExiting(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 750);
    return () => clearTimeout(timer);
  }, [exiting]);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-[#09090b] font-mono text-white"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Same isometric grid as the rest of the site (not a flat, straight
              grid) — the exact BackgroundBoxes component used everywhere else */}
          <BackgroundBoxes />

          {/* Same ambient sky glows + grain as the rest of the site, so the
              handoff into the Hero doesn't feel like a different surface */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/12 blur-[140px]" />
          <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[500px] rounded-full bg-sky-500/8 blur-[160px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[350px] w-[500px] rounded-full bg-sky-600/8 blur-[150px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
            }}
          />

          {/* Progress line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-px w-40 origin-center overflow-hidden bg-white/10 sm:w-64"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </motion.div>

          {/* Status, bottom-left */}
          <div className="absolute bottom-8 left-6 text-[11px] text-white/40 sm:left-10 sm:text-xs">
            booting_portfolio<span className="animate-pulse">_</span>
          </div>

          {/* Name, bottom-center — same wordmark styling as the Navbar/Footer logo, just small */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-black tracking-tight text-white sm:text-base"
          >
            Hetu<span className="text-sky-500">Patel</span>
          </motion.p>

          {/* Big counting percentage, bottom-right */}
          <div className="absolute bottom-6 right-6 flex items-end gap-1 leading-none sm:bottom-8 sm:right-10">
            <span className="font-sans text-5xl font-bold tabular-nums text-white/90 sm:text-7xl">
              {Math.floor(progress)}
            </span>
            <span className="mb-1 font-sans text-xl font-bold text-sky-400 sm:mb-1.5 sm:text-3xl">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
