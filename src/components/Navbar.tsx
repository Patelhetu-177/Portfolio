"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Sun,
  Moon,
  Menu,
  X,
  FileDown,
  Code2,
  Terminal as TerminalIcon,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "About", href: "#about", icon: GraduationCap },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderGit2 },
  { name: "Terminal", href: "#terminal", icon: TerminalIcon },
  { name: "Contact", href: "#contact", icon: Mail },
];

const drawerListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const drawerItemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ["about", "skills", "experience", "projects", "terminal", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Header Container */}
      <div
        className={`navbar-floating pointer-events-none fixed left-0 top-0 z-[100] flex w-full flex-col items-center justify-center ${
          scrolled ? "pt-3 md:pt-4" : "pt-0 md:pt-2"
        }`}
        style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto flex w-full max-w-[1440px] items-center justify-between transition-all ${
            scrolled
              ? "mt-2 md:mt-3 w-[96%] sm:w-[94%] rounded-full border border-slate-200 dark:border-white/[0.1] bg-white/90 dark:bg-[#0b1329]/90 p-2 sm:p-2.5 backdrop-blur-xl shadow-md shadow-slate-200/50 dark:shadow-black/40"
              : "mt-0 w-full border-transparent bg-transparent px-4 py-3 md:px-8 lg:px-12 md:py-6"
          }`}
          style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Typographic Logo */}
          <a
            href="#"
            className="ml-1 flex shrink-0 items-center gap-1.5 md:ml-0 group"
            aria-label="Hetu Patel Home"
          >
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Hetu<span className="text-sky-500">Patel</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden flex-1 items-center justify-center gap-1 lg:gap-2 md:flex">
            {NAV_ITEMS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10 dark:bg-sky-500/15"
                      : "text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 hover:bg-slate-100/60 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="ml-auto mr-1 flex shrink-0 items-center gap-2 md:ml-0 md:mr-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1]"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 px-5 py-2 text-sm font-semibold text-white transition-colors sm:inline-flex"
            >
              <FileDown className="h-4 w-4" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-sky-500/10 dark:bg-white/[0.06] dark:text-slate-300 md:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[110] transition-all duration-500 ease-out md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-out Drawer */}
        <div
          className={`absolute bottom-0 right-0 top-0 flex w-[85%] max-w-[340px] flex-col bg-white dark:bg-[#0b1329] border-l border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/20 transition-all duration-500 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-white/[0.06]">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Hetu<span className="text-sky-500">Patel</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-colors"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 px-5 py-6 flex flex-col justify-between overflow-y-auto">
            <motion.div
              className="grid grid-cols-1 gap-1.5"
              initial="hidden"
              animate={mobileMenuOpen ? "visible" : "hidden"}
              variants={drawerListVariants}
            >
              {NAV_ITEMS.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    variants={drawerItemVariants}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-sky-500" : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                <FileDown className="h-4 w-4" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
