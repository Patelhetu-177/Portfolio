"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  /** kept so existing callers still compile; each item now reveals on its own */
  stagger?: number;
  once?: boolean;
}

/**
 * Container for a list/grid of <RevealItem>s.
 *
 * It is deliberately a plain wrapper: the items reveal themselves as each one scrolls into
 * view. (It used to wait until 15% of the WHOLE group was visible, which never happens for a
 * tall one-column grid on a small phone, so the Projects and Skills cards stayed invisible.)
 */
export function RevealGroup({ children, className }: RevealGroupProps) {
  return <div className={cn(className)}>{children}</div>;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/** A single item of a <RevealGroup>; fades in when it scrolls into view. */
export function RevealItem({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      // any part of the item showing is enough; only a small bottom margin, so a short
      // phone screen is never shrunk from the top
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -40px 0px" }}
      variants={itemVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
