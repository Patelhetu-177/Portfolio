"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export interface HoverEffectItem {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  link?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: HoverEffectItem[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4",
        className
      )}
    >
      {items.map((item, idx) => {
        const Wrapper = item.link ? "a" : "div";
        return (
          <Wrapper
            href={item.link}
            key={idx}
            className={cn(
              "relative group block p-1.5 h-full w-full",
              item.className
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-blue-500/10 dark:bg-sky-500/15 border border-blue-500/20 dark:border-sky-500/30 block rounded-3xl z-0 pointer-events-none"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.15 },
                  }}
                />
              )}
            </AnimatePresence>

            <Card>
              {item.header && <div className="mb-3.5 flex-1">{item.header}</div>}
              <div className="flex items-center gap-2">
                {item.icon}
                <CardTitle>{item.title}</CardTitle>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Wrapper>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-5 overflow-hidden bg-white dark:bg-[#132337]/80 border border-slate-200/90 dark:border-white/[0.08] group-hover:border-blue-400 dark:group-hover:border-sky-500/60 relative z-10 flex flex-col justify-between transition-colors duration-200",
        className
      )}
    >
      <div className="relative z-20 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-slate-900 dark:text-zinc-100 font-bold tracking-tight text-sm sm:text-base",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1.5 text-slate-600 dark:text-zinc-400 tracking-normal leading-relaxed text-xs",
        className
      )}
    >
      {children}
    </p>
  );
};
