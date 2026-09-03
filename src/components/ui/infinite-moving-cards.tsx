"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

export interface MovingCardItem {
  quote: string;
  name: string;
  title: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: MovingCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current && !start) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }

      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "55s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "85s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }

      setStart(true);
    }
  }, [direction, speed, start]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-2",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[320px] sm:w-[350px] min-h-[125px] flex flex-col justify-between flex-shrink-0 rounded-2xl border border-slate-200/70 bg-white/90 p-4 transition-colors duration-200 hover:border-sky-500/60 dark:border-white/[0.06] dark:bg-[#0f172a]/80 dark:hover:border-sky-500/50"
            key={`${item.name}-${idx}`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20">
                  {item.icon && <item.icon className="h-4 w-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                    {item.title}
                  </p>
                </div>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#0c1624] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                  {item.badge}
                </span>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
              {item.quote}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
