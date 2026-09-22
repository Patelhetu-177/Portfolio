"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";


export default function ScrollProgress() {
  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 120, damping: 24, restDelta: 0.0005 });
  const scaleX = useTransform(progress, (v) => v);
  const opacity = useTransform(progress, [0, 0.02], [0, 1]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      raw.set(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Page height shifts as images and live stats load in.
    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [raw]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] bg-zinc-900/[0.04] dark:bg-white/[0.06]"
    >
      <motion.div
        className="relative h-full w-full origin-left bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300"
        style={{ scaleX, opacity }}
      >
        {/* Soft glow riding just ahead of the fill's leading edge */}
        <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-sky-400 blur-[6px] dark:bg-sky-300" />
      </motion.div>
    </div>
  );
}
