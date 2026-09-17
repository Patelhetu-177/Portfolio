"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState, MouseEvent as ReactMouseEvent } from "react";

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
          <motion.div
            key={idx}
            className={item.className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
          <Wrapper
            href={item.link}
            className="relative group block p-1.5 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-slate-200/40 dark:bg-white/[0.05] block rounded-3xl z-0 pointer-events-none"
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
          </motion.div>
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-5 overflow-hidden bg-slate-100/60 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] shadow-sm shadow-slate-200/60 dark:shadow-black/30 relative z-10 flex flex-col justify-between transition-colors duration-200",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Cursor-follow spotlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[15] rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(56,189,248,0.14), rgba(129,140,248,0.07) 40%, transparent 70%)`,
        }}
      />
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
