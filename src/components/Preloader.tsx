"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DoodleLayer } from "@/components/ParticleBackground";

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
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-[#f8fafc] font-mono text-slate-900 transition-colors dark:bg-[#09090b] dark:text-white"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Same hand-drawn doodle background as the rest of the site */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <DoodleLayer />
          </div>

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
            className="relative z-10 h-px w-40 origin-center overflow-hidden bg-slate-900/10 dark:bg-white/10 sm:w-64"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </motion.div>


          {/* Name, bottom-center — same wordmark styling as the Navbar/Footer logo, just small */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-black tracking-tight text-slate-900 dark:text-white sm:text-base"
          >
            Hetu<span className="text-sky-500">Patel</span>
          </motion.p>

          {/* Big counting percentage, bottom-right */}
          <div className="absolute bottom-6 right-6 flex items-end gap-1 leading-none sm:bottom-8 sm:right-10">
            <span className="font-sans text-5xl font-bold tabular-nums text-slate-900/90 dark:text-white/90 sm:text-7xl">
              {Math.floor(progress)}
            </span>
            <span className="mb-1 font-sans text-xl font-bold text-sky-400 sm:mb-1.5 sm:text-3xl">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
