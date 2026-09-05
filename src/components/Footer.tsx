"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-[#060913]/80 backdrop-blur-md py-12">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#" className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
              Hetu<span className="text-sky-500">Patel</span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Full Stack Web Developer &amp; Problem Solver
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#about" className="hover:text-sky-500 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-sky-500 transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-sky-500 transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-sky-500 transition-colors">
              Projects
            </a>
            <a href="#terminal" className="hover:text-sky-500 transition-colors">
              Terminal
            </a>
            <a href="#contact" className="hover:text-sky-500 transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        
      </div>
    </footer>
  );
}
