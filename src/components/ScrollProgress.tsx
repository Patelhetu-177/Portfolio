"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400"
      style={{ scaleX }}
    />
  );
}
