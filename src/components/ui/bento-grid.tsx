"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

interface BentoContextType {
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}

const BentoContext = createContext<BentoContextType>({
  hoveredIndex: null,
  setHoveredIndex: () => {},
});

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <BentoContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[19.5rem] md:grid-cols-3",
          className
        )}
      >
        {children}
      </div>
    </BentoContext.Provider>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  index = 0,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  index?: number;
}) => {
  const { hoveredIndex, setHoveredIndex } = useContext(BentoContext);
  const isHovered = hoveredIndex === index;

  return (
    <div
      className={cn("group/bento relative block h-full w-full rounded-2xl", className)}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Gliding animated background pill */}
      <span
        className={cn(
          "absolute -inset-1 rounded-2xl transition-all duration-300 pointer-events-none",
          isHovered
            ? "opacity-100 bg-blue-500/10 dark:bg-blue-500/15 scale-100 ring-1 ring-blue-500/30"
            : "opacity-0 scale-95"
        )}
      />

      {/* Main card content */}
      <div
        className={cn(
          "relative z-10 flex flex-col justify-between space-y-3.5 h-full rounded-2xl border border-slate-200/90 bg-white/90 p-5 backdrop-blur-md transition-colors duration-200 dark:border-white/[0.1] dark:bg-[#161618]/75 hover:border-blue-400 dark:hover:border-blue-500/40",
          className
        )}
      >
        <div className="relative z-20 flex-1">{header}</div>
        <div className="relative z-20 transition-transform duration-200 group-hover/bento:translate-x-1">
          <div className="flex items-center gap-2">
            {icon}
            <div className="font-sans font-bold text-sm sm:text-base text-slate-900 dark:text-[#f2f2f2]">
              {title}
            </div>
          </div>
          <div className="font-sans text-xs font-normal text-slate-600 dark:text-[#a1a1aa] leading-relaxed mt-1">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
