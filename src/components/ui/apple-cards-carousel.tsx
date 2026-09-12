"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type CardType = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  isDesktop?: boolean;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 256 : 384; // (w-64 mobile, md:w-96 desktop)
      const gap = isMobile() ? 16 : 24;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-4 md:py-8 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[10%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10 mt-2">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center disabled:opacity-40 border border-slate-200 dark:border-slate-700 transition-colors"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center disabled:opacity-40 border border-slate-200 dark:border-slate-700 transition-colors"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ArrowRight className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardType;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDesktopApp =
    card.isDesktop !== undefined
      ? card.isDesktop
      : !card.src.toLowerCase().includes("firstbookit");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-is-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-is-open");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-is-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const overlay = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100000] h-full w-full overflow-y-auto overscroll-contain flex justify-center px-4 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="bg-black/75 backdrop-blur-lg fixed inset-0"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            ref={containerRef}
            className="relative z-[100001] my-auto w-full max-w-4xl h-fit bg-white dark:bg-[#0c1624] p-5 sm:p-8 md:p-10 rounded-3xl font-sans border border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            <button
              className="absolute top-4 right-4 ml-auto bg-black dark:bg-white text-white dark:text-black h-8 w-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 z-50"
              onClick={handleClose}
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.p className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider pr-10">
              {card.category}
            </motion.p>
            <motion.h3 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
              {card.title}
            </motion.h3>
            <div className="py-2">{card.content}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {mounted ? createPortal(overlay, document.body) : null}
      <motion.button
        onClick={handleOpen}
        className="rounded-3xl bg-slate-900 h-96 w-64 sm:h-[28rem] sm:w-72 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-between relative z-10 text-left border border-slate-800/80 group shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* Ambient Blurred Background Glow */}
        <Image
          src={card.src}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 384px"
          className="object-cover absolute z-0 inset-0 filter blur-2xl opacity-35 scale-125 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95 z-10 pointer-events-none" />

        {/* Card Header Typography */}
        <div className="relative z-30 p-5 sm:p-6 md:p-8">
          <motion.p
            className="text-sky-400 font-sans text-xs md:text-sm font-semibold uppercase tracking-wider"
          >
            {card.category}
          </motion.p>
          <motion.h3
            className="text-white font-sans text-sm sm:text-base md:text-2xl font-bold max-w-xs text-left [text-wrap:balance] mt-2 group-hover:text-sky-300 transition-colors"
          >
            {card.title}
          </motion.h3>
        </div>

        {/* Adaptive Image Presentation (Desktop Browser Window vs Mobile App Frame) */}
        {isDesktopApp ? (
          <div className="relative z-20 w-[90%] mx-auto mt-auto mb-5 sm:mb-6 md:mb-8 rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500">
            {/* macOS Browser Header */}
            <div className="bg-slate-900/95 px-3 py-2 border-b border-white/10 flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <div className="ml-2 h-3.5 w-24 bg-white/10 rounded-full" />
            </div>
            {/* Full Un-cropped Desktop View */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
              <Image
                src={card.src}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 230px, (max-width: 768px) 260px, 346px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ) : (
          <div className="relative z-20 w-[82%] max-w-[240px] mx-auto mt-auto mb-5 sm:mb-6 md:mb-8 rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-950 shadow-2xl group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500">
            {/* Mobile Portrait View */}
            <div className="relative aspect-[9/18] w-full overflow-hidden bg-slate-900">
              <Image
                src={card.src}
                alt={card.title}
                fill
                sizes="240px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}
      </motion.button>
    </>
  );
};
