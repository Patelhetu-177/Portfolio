"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "9999px",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 2800,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative inline-flex h-12 sm:h-14 min-w-[190px] overflow-hidden p-[2.5px] transition-transform active:scale-[0.98]",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      {/* Moving Light Beam Background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: borderRadius }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-36 w-36 bg-[radial-gradient(#38bdf8_0%,#2563eb_45%,transparent_75%)] opacity-100 dark:bg-[radial-gradient(#60a5fa_0%,#3b82f6_45%,transparent_75%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      {/* Inner Button Body */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center px-7 text-[15px] font-semibold transition-colors border border-slate-700/40 bg-slate-900 text-white backdrop-blur-xl hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:border-slate-200/80 dark:hover:bg-slate-100",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 2.5px)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2800,
  rx = "30%",
  ry = "30%",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
