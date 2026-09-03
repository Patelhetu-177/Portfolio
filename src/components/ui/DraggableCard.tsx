"use client";

import React, { createContext, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DraggableCardContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export const DraggableCardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <DraggableCardContext.Provider value={containerRef}>
      <div ref={containerRef} className={cn("relative overflow-hidden select-none", className)}>
        {children}
      </div>
    </DraggableCardContext.Provider>
  );
};

export const DraggableCardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useContext(DraggableCardContext);
  return (
    <motion.div
      drag
      dragConstraints={containerRef || undefined}
      dragElastic={0.2}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      className={cn("absolute cursor-grab active:cursor-grabbing", className)}
    >
      {children}
    </motion.div>
  );
};
