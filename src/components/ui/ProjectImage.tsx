"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ProjectImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px",
  priority = false,
}: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <>
      {!loaded && !errored && (
        <div className="absolute inset-0 overflow-hidden bg-slate-200 dark:bg-zinc-800">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
        </div>
      )}

      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500">
          <ImageOff className="w-6 h-6" />
          <span className="text-[11px] font-mono">preview unavailable</span>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`${className} transition-[opacity,transform] duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
