"use client";

import React, { useEffect, useRef, useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Configuration ──────────────────────────────────────────────────────
const BOARD_ROWS = 4;
const BOARD_COLS = 20;

const FLAP_CHARS =
  " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:'\",.<>/?•★→←⚡🔥💻🚀🎯✨";

const BASE_STEP_MS = 30;
const BASE_FLIP_S = 0.18;
const BASE_COL_DELAY = 14;
const BASE_ROW_DELAY = 18;

type AccentColor = {
  top: string;
  bottom: string;
  text: string;
};

const ACCENT_COLORS: AccentColor[] = [
  { top: "bg-sky-600", bottom: "bg-sky-700", text: "text-white" },
  { top: "bg-indigo-600", bottom: "bg-indigo-700", text: "text-white" },
  { top: "bg-violet-600", bottom: "bg-violet-700", text: "text-white" },
  { top: "bg-emerald-600", bottom: "bg-emerald-700", text: "text-white" },
  { top: "bg-amber-500", bottom: "bg-amber-600", text: "text-neutral-900" },
  { top: "bg-rose-600", bottom: "bg-rose-700", text: "text-white" },
];

// ── Single Split-Flap Cell ─────────────────────────────────────────────

interface FlapCellProps {
  target: string;
  delay: number;
  stepMs: number;
  flipDuration: number;
}

const FlapCell = memo(function FlapCell({
  target,
  delay,
  stepMs,
  flipDuration,
}: FlapCellProps) {
  const normalized = FLAP_CHARS.includes((target ?? " ").toUpperCase())
    ? (target ?? " ").toUpperCase()
    : " ";

  const [current, setCurrent] = useState(normalized);
  const [prev, setPrev] = useState(normalized);
  const [accent, setAccent] = useState<AccentColor | null>(null);
  const [prevAccent, setPrevAccent] = useState<AccentColor | null>(null);
  const [flipId, setFlipId] = useState(0);

  const curRef = useRef(normalized);
  const tgtRef = useRef(normalized);
  const accentRef = useRef<AccentColor | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      curRef.current = normalized;
      tgtRef.current = normalized;
      return;
    }

    if (tgtRef.current === normalized) return;
    tgtRef.current = normalized;

    if (startTimer.current) clearTimeout(startTimer.current);
    if (stepTimer.current) clearTimeout(stepTimer.current);
    startTimer.current = null;
    stepTimer.current = null;

    if (normalized === " " && curRef.current === " ") return;

    const scrambleCount = normalized === " " ? 2 : 4 + Math.floor(Math.random() * 3);

    const runStep = (i: number) => {
      const isLast = i === scrambleCount;
      const ch = isLast
        ? normalized
        : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))];

      const newAccent = isLast
        ? null
        : Math.random() < 0.2
          ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
          : null;

      setPrev(curRef.current);
      setPrevAccent(accentRef.current);
      curRef.current = ch;
      accentRef.current = newAccent;
      setCurrent(ch);
      setAccent(newAccent);
      setFlipId((n) => n + 1);

      if (!isLast) {
        stepTimer.current = setTimeout(() => runStep(i + 1), stepMs);
      }
    };

    startTimer.current = setTimeout(() => runStep(1), delay);

    return () => {
      if (startTimer.current) clearTimeout(startTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
      startTimer.current = null;
      stepTimer.current = null;
    };
  }, [normalized, delay, stepMs]);

  const isSpace = current === " ";
  const show = isSpace ? "\u00A0" : current;
  const showPrev = prev === " " ? "\u00A0" : prev;

  const textCx =
    "absolute inset-x-0 flex select-none items-center justify-center font-mono font-black tracking-wider uppercase text-[11px] sm:text-xs md:text-sm lg:text-base";

  const topBg = accent?.top ?? (isSpace ? "bg-slate-200/50 dark:bg-[#0e1320]" : "bg-slate-200 dark:bg-[#151c2e]");
  const bottomBg = accent?.bottom ?? (isSpace ? "bg-slate-200/50 dark:bg-[#0e1320]" : "bg-slate-200 dark:bg-[#151c2e]");
  const textColor = accent?.text ?? "text-slate-900 dark:text-white";

  const flapTopBg = prevAccent?.top ?? "bg-slate-300 dark:bg-[#1e263d]";
  const flapTextColor = prevAccent?.text ?? "text-slate-900 dark:text-white";

  const bottomDelay = flipDuration * 0.45;

  return (
    <div className="flex aspect-[1/1.55] flex-col overflow-hidden rounded-[2px] sm:rounded-[3px] border border-slate-300/40 dark:border-white/[0.06] bg-slate-100 dark:bg-[#0a0e18]">
      <div className="relative flex-1 [perspective:800px] [transform-style:preserve-3d]">
        {/* Static top */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden rounded-t-[2px] sm:rounded-t-[3px]",
            topBg
          )}
        >
          <div className={cn(textCx, textColor, "top-0 h-[200%]")}>
            {show}
          </div>
        </div>

        {/* Static bottom */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden rounded-b-[2px] sm:rounded-b-[3px]",
            bottomBg
          )}
        >
          <div className={cn(textCx, textColor, "bottom-0 h-[200%]")}>
            {show}
          </div>
        </div>

        {/* Flipping top flap */}
        {flipId > 0 && (
          <motion.div
            key={`t${flipId}`}
            className={cn(
              "absolute inset-x-0 top-0 z-20 h-[calc(50%-0.5px)] origin-bottom overflow-hidden rounded-t-[2px] sm:rounded-t-[3px] [backface-visibility:hidden] [transform-style:preserve-3d]",
              flapTopBg
            )}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{
              duration: flipDuration * 0.75,
              ease: [0.55, 0.055, 0.675, 0.19],
            }}
          >
            <div className={cn(textCx, flapTextColor, "top-0 h-[200%]")}>
              {showPrev}
            </div>
          </motion.div>
        )}

        {/* Flipping bottom flap */}
        {flipId > 0 && (
          <motion.div
            key={`b${flipId}`}
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden rounded-b-[2px] sm:rounded-b-[3px] [backface-visibility:hidden] [transform-style:preserve-3d]",
              bottomBg
            )}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{
              duration: flipDuration * 0.85,
              delay: bottomDelay,
              ease: [0.33, 1.5, 0.64, 1],
            }}
          >
            <div className={cn(textCx, textColor, "bottom-0 h-[200%]")}>
              {show}
            </div>
          </motion.div>
        )}

        {/* Subtle Center Split Seam (only visible on active characters) */}
        {!isSpace && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 h-px -translate-y-[0.5px] bg-slate-400/40 dark:bg-black/60" />
        )}
      </div>
    </div>
  );
});

// ── Centered Multi-Row Text Layout ────────────────────────────────────

function centerText(rawText: string, rows: number, cols: number): string[][] {
  const lines = (rawText || "")
    .split("\n")
    .map((l) => l.trim().toUpperCase())
    .filter(Boolean);

  const grid: string[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => " ")
  );

  const startRow = Math.max(0, Math.floor((rows - lines.length) / 2));

  lines.forEach((line, i) => {
    const row = startRow + i;
    if (row >= rows) return;

    const startCol = Math.max(0, Math.floor((cols - line.length) / 2));
    for (let c = 0; c < line.length && startCol + c < cols; c++) {
      grid[row][startCol + c] = line[c];
    }
  });

  return grid;
}

// ── Main TextFlippingBoard Component ──────────────────────────────────

export interface TextFlippingBoardProps {
  text?: string;
  className?: string;
}

export function TextFlippingBoard({
  text = "",
  className,
}: TextFlippingBoardProps) {
  const grid = useMemo(
    () => centerText(text, BOARD_ROWS, BOARD_COLS),
    [text]
  );

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-xl rounded-2xl bg-slate-200/50 p-2.5 sm:p-4 shadow-xl backdrop-blur-xl md:rounded-3xl border border-slate-300/60 dark:bg-[#070b14]/90 dark:border-white/[0.08] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div
        className="grid gap-[2px] sm:gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${BOARD_ROWS}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, r) =>
          row.map((ch, c) => (
            <FlapCell
              key={`${r}-${c}`}
              target={ch}
              delay={c * BASE_COL_DELAY + r * BASE_ROW_DELAY}
              stepMs={BASE_STEP_MS}
              flipDuration={BASE_FLIP_S}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TextFlippingBoard;
