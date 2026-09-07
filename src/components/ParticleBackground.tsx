"use client";

import React from "react";
import { BackgroundBoxes } from "@/components/ui/background-boxes";

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-[#f8fafc] dark:bg-[#060913] transition-colors duration-500">
      {/* AttendMetric / Aceternity Interactive Isometric Background Boxes */}
      <BackgroundBoxes />

      {/* Subtle Ambient Radial Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 dark:bg-sky-500/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-[500px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[350px] bg-purple-500/10 dark:bg-purple-600/10 blur-[150px] rounded-full" />
    </div>
  );
}
