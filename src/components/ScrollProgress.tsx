"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SECTIONS = ["about", "stats", "skills", "experience", "projects", "terminal", "contact"];


export default function ScrollProgress() {
  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 140, damping: 26, restDelta: 0.0005 });
  const width = useTransform(progress, (v) => `${v * 100}%`);
  const headLeft = useTransform(progress, (v) => `${v * 100}%`);

  const [ticks, setTicks] = useState<number[]>([]);
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    let positions: number[] = [];

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      positions =
        max > 0
          ? SECTIONS.map((id) => document.getElementById(id))
              .filter((el): el is HTMLElement => !!el)
              .map((el) => Math.min(Math.max((el.offsetTop - 120) / max, 0), 1))
          : [];
      setTicks(positions);
    };

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      raw.set(p);
      setPassed(positions.filter((t) => p >= t).length);
    };

    const onLayout = () => {
      measure();
      update();
    };

    onLayout();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onLayout);
    // Page height shifts as images and live stats load in.
    const ro = new ResizeObserver(onLayout);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onLayout);
      ro.disconnect();
    };
  }, [raw]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-2">
      {/* Hairline track */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-300/60 dark:bg-white/[0.07]" />

      {/* Section ticks */}
      {ticks.map((t, i) => (
        <span
          key={i}
          className={`absolute top-0 h-[5px] w-px transition-colors duration-300 ${
            i < passed ? "bg-sky-400" : "bg-zinc-400/50 dark:bg-white/20"
          }`}
          style={{ left: `${t * 100}%` }}
        />
      ))}

      {/* Beam: fades in from the left, brightest at the head */}
      <motion.div
        className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/80 to-sky-300"
        style={{ width }}
      />

      {/* Glowing head */}
      <motion.div
        className="absolute top-0 h-[2px] w-16 -translate-x-full bg-gradient-to-r from-transparent to-white/90 dark:to-white"
        style={{ left: headLeft }}
      />
      <motion.span
        className="absolute -top-[3px] h-2 w-2 -translate-x-1/2 rounded-full bg-sky-200 shadow-[0_0_10px_3px_rgba(56,189,248,0.8)]"
        style={{ left: headLeft }}
      />
    </div>
  );
}
