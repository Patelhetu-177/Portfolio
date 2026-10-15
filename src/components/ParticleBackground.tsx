"use client";

import React from "react";

/**
 * Page background, in the style of the FirstBookIt site: a hand-drawn developer
 * doodle pattern (very faint, fading out toward the bottom) on a plain base colour.
 *
 * public/assets/bg-doodle.png is a black-ink-on-transparent image used as a MASK, so the
 * same file works in both modes: grey-blue lines in light mode, white lines in dark mode.
 */
const DOODLE_MASK = "url('/assets/bg-doodle.png')";
const FADE_DOWN =
  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0) 100%)";

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden bg-[#f8fafc] dark:bg-[#09090b] transition-colors duration-500">
      <div
        className="absolute inset-x-0 top-0 h-[115vh]"
        style={{ WebkitMaskImage: FADE_DOWN, maskImage: FADE_DOWN }}
      >
        <div
          className="h-full w-full bg-slate-500/[0.13] dark:bg-white/[0.085]"
          style={{
            WebkitMaskImage: DOODLE_MASK,
            maskImage: DOODLE_MASK,
            WebkitMaskSize: "auto 115vh",
            maskSize: "auto 115vh",
            WebkitMaskRepeat: "repeat-x",
            maskRepeat: "repeat-x",
            WebkitMaskPosition: "top center",
            maskPosition: "top center",
          }}
        />
      </div>
    </div>
  );
}
