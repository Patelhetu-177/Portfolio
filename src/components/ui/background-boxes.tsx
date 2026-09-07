"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface BoxCell {
  col: number;
  row: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  decay: number;
}

const HIGHLIGHT_COLORS = [
  "#38bdf8", // Sky blue
  "#818cf8", // Indigo
  "#c084fc", // Purple
  "#34d399", // Emerald
  "#f472b6", // Pink
  "#fb923c", // Orange
  "#60a5fa", // Blue
  "#a78bfa", // Violet
  "#2dd4bf", // Teal
];

export function BackgroundBoxes() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = theme === "dark";

    // Grid sizing
    const cellWidth = 64;
    const cellHeight = 32;

    // Active illuminated cells map: key = `${col}_${row}`
    const activeCells = new Map<string, BoxCell>();

    let lastCol = -1;
    let lastRow = -1;

    // Convert screen coordinates to skewed isometric grid coordinates
    // Matches: skewX(-48deg) skewY(14deg) scale(0.675)
    const radX = (-48 * Math.PI) / 180;
    const radY = (14 * Math.PI) / 180;
    const scale = 0.72;

    const screenToGrid = (sx: number, sy: number) => {
      // Offset from center
      const cx = sx - width * 0.45;
      const cy = sy - height * 0.45;

      // Inverse 2D affine transformation
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);
      const tanX = Math.tan(radX);

      const unscaledX = cx / scale;
      const unscaledY = cy / scale;

      const gy = (unscaledY - unscaledX * Math.tan(radY)) / cosY;
      const gx = unscaledX - gy * tanX;

      const col = Math.floor(gx / cellWidth);
      const row = Math.floor(gy / cellHeight);

      return { col, row };
    };

    const activateCell = (col: number, row: number) => {
      const key = `${col}_${row}`;
      const color =
        HIGHLIGHT_COLORS[Math.floor(Math.random() * HIGHLIGHT_COLORS.length)];

      activeCells.set(key, {
        col,
        row,
        color,
        alpha: 1,
        maxAlpha: isDark ? 0.85 : 0.7,
        decay: 0.015 + Math.random() * 0.01,
      });

      // Also illuminate 1-2 adjacent cells with lower alpha for rich fluid trail
      if (Math.random() < 0.6) {
        const offsetCol = col + (Math.random() > 0.5 ? 1 : -1);
        const offsetKey = `${offsetCol}_${row}`;
        if (!activeCells.has(offsetKey)) {
          activeCells.set(offsetKey, {
            col: offsetCol,
            row,
            color,
            alpha: 0.6,
            maxAlpha: isDark ? 0.55 : 0.45,
            decay: 0.02,
          });
        }
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const { col, row } = screenToGrid(clientX, clientY);

      if (col !== lastCol || row !== lastRow) {
        lastCol = col;
        lastRow = row;
        activateCell(col, row);
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial ambient trigger so the board comes alive
    for (let i = 0; i < 8; i++) {
      const randomCol = Math.floor((Math.random() - 0.5) * 20);
      const randomRow = Math.floor((Math.random() - 0.5) * 20);
      activateCell(randomCol, randomRow);
    }

    // ── Render Loop ──────────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      // Apply AttendMetric / Aceternity 3D isometric matrix
      ctx.translate(width * 0.45, height * 0.45);
      ctx.scale(scale, scale);
      ctx.transform(1, Math.tan(radY), Math.tan(radX), 1, 0, 0);

      const minCol = -35;
      const maxCol = 35;
      const minRow = -35;
      const maxRow = 35;

      // 1. Draw Static Grid Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark ? "rgba(51, 65, 85, 0.45)" : "rgba(203, 213, 225, 0.75)";

      ctx.beginPath();
      for (let c = minCol; c <= maxCol; c++) {
        const x = c * cellWidth;
        ctx.moveTo(x, minRow * cellHeight);
        ctx.lineTo(x, maxRow * cellHeight);
      }
      for (let r = minRow; r <= maxRow; r++) {
        const y = r * cellHeight;
        ctx.moveTo(minCol * cellWidth, y);
        ctx.lineTo(maxCol * cellWidth, y);
      }
      ctx.stroke();

      // 2. Draw Static Corner Crosshair Plus Markers (+)
      ctx.strokeStyle = isDark ? "rgba(71, 85, 105, 0.5)" : "rgba(148, 163, 184, 0.6)";
      ctx.lineWidth = 1;
      const crossSize = 3;

      ctx.beginPath();
      for (let c = minCol; c <= maxCol; c += 2) {
        for (let r = minRow; r <= maxRow; r += 2) {
          const x = c * cellWidth;
          const y = r * cellHeight;
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
        }
      }
      ctx.stroke();

      // 3. Draw Active Illuminated Hover Cells
      activeCells.forEach((cell, key) => {
        cell.alpha -= cell.decay;

        if (cell.alpha <= 0) {
          activeCells.delete(key);
          return;
        }

        const x = cell.col * cellWidth;
        const y = cell.row * cellHeight;
        const currentAlpha = cell.alpha * cell.maxAlpha;

        ctx.fillStyle = cell.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fillRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);

        // Highlight border
        ctx.strokeStyle = cell.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = Math.min(1, currentAlpha * 1.3);
        ctx.strokeRect(x, y, cellWidth, cellHeight);
      });

      ctx.globalAlpha = 1;
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

export const Boxes = BackgroundBoxes;
export default BackgroundBoxes;
