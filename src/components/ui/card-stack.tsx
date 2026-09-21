"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ProjectImage from "@/components/ui/ProjectImage";

export interface CardStackItem {
  id: number | string;
  image: string;
  title?: string;
}

export const ProjectImageStack = ({
  images,
  offset = 8,
  scaleFactor = 0.04,
  intervalMs = 3800,
  className,
  onImageClick,
}: {
  images: { image: string; title?: string }[];
  offset?: number;
  scaleFactor?: number;
  intervalMs?: number;
  className?: string;
  onImageClick?: () => void;
}) => {
  const items: CardStackItem[] = images.map((item, idx) => ({
    id: idx,
    image: item.image,
    title: item.title,
  }));

  const [cards, setCards] = useState<CardStackItem[]>(items);

  useEffect(() => {
    setCards(items);
  }, [images.length]);

  const flipNext = useCallback(() => {
    if (cards.length <= 1) return;
    setCards((prevCards) => {
      const newArray = [...prevCards];
      newArray.unshift(newArray.pop()!);
      return newArray;
    });
  }, [cards.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(flipNext, intervalMs);
    return () => clearInterval(timer);
  }, [flipNext, intervalMs, items.length]);

  if (!cards.length) return null;

  return (
    <div
      className={cn("relative w-full h-full cursor-pointer select-none group/stack", className)}
      onClick={() => {
        if (onImageClick) {
          onImageClick();
        } else {
          flipNext();
        }
      }}
    >
      {cards.slice(0, 3).map((card, index) => {
        const isMobilePortrait = card.image.toLowerCase().includes("firstbookit");

        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-zinc-950",
              index === 0
                ? "z-10 shadow-lg"
                : index === 1
                ? "z-[9] opacity-75 border border-white/10"
                : "z-[8] opacity-50 border border-white/5"
            )}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: 10 - index,
            }}
            transition={{
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden">
              {isMobilePortrait ? (
                <>
                  <Image
                    src={card.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 45vw, 480px"
                    className="object-cover blur-md opacity-30 scale-110 pointer-events-none"
                  />
                  <img
                    src={card.image}
                    alt={card.title || "Project screenshot"}
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 h-full w-auto max-w-full object-contain py-1 group-hover/stack:scale-105 transition-transform duration-300"
                  />
                </>
              ) : (
                <ProjectImage
                  src={card.image}
                  alt={card.title || "Project screenshot"}
                  className="w-full h-full object-cover group-hover/stack:scale-105 transition-transform duration-300"
                />
              )}

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-black/10 to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>
        );
      })}

      {/* Stack Count Indicator */}
      {items.length > 1 && (
        <span className="absolute bottom-3 right-3 z-20 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/70 text-white/90 backdrop-blur-md border border-white/10 pointer-events-none">
          {items.findIndex((it) => it.image === cards[0]?.image) + 1} / {items.length}
        </span>
      )}
    </div>
  );
};

// Generic Aceternity CardStack implementation for testimonials or arbitrary content
export type GenericCard = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
}: {
  items: GenericCard[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cards, setCards] = useState<GenericCard[]>(items);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
