"use client";

import React, { useState, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}

/**
 * Wraps content in a relative container and adds a soft radial glow that
 * follows the cursor on hover — a subtle "spotlight" effect for cards.
 * Purely additive: doesn't affect layout of the wrapped children.
 */
export function CardSpotlight({ children, className, radius = 260 }: CardSpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group/spotlight relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          opacity: isHovering ? 1 : 0,
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(56,189,248,0.15), rgba(129,140,248,0.08) 40%, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
