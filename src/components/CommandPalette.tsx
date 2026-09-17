"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  GraduationCap,
  Code2,
  Briefcase,
  FolderGit2,
  Terminal as TerminalIcon,
  Mail,
  ExternalLink,
  Sun,
  Moon,
  FileDown,
  CornerDownLeft,
} from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  hint?: string;
  icon: React.ReactNode;
  action: () => void;
  group: "Navigate" | "Links" | "Actions";
}

export default function CommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const openHandler = () => setOpen((v) => !v);

    window.addEventListener("keydown", handler);
    window.addEventListener("toggle-command-palette", openHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("toggle-command-palette", openHandler);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
  }, [open]);

  const goTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const openUrl = (url: string) => () => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const commands: CommandItem[] = useMemo(
    () => [
      { id: "nav-about", label: "Go to About", description: "Education, competitive programming & GitHub activity", icon: <GraduationCap className="w-4 h-4" />, action: goTo("about"), group: "Navigate" },
      { id: "nav-skills", label: "Go to Skills", description: "Languages, frameworks & tools I use", icon: <Code2 className="w-4 h-4" />, action: goTo("skills"), group: "Navigate" },
      { id: "nav-experience", label: "Go to Experience", description: "Work history at Vikartr Technologies", icon: <Briefcase className="w-4 h-4" />, action: goTo("experience"), group: "Navigate" },
      { id: "nav-projects", label: "Go to Projects", description: "FirstBookIt, AvatarAI, EventSphere & more", icon: <FolderGit2 className="w-4 h-4" />, action: goTo("projects"), group: "Navigate" },
      { id: "nav-terminal", label: "Go to Terminal", description: "Interactive dev console — try real commands", icon: <TerminalIcon className="w-4 h-4" />, action: goTo("terminal"), group: "Navigate" },
      { id: "nav-contact", label: "Go to Contact", description: "Email, phone & the message form", icon: <Mail className="w-4 h-4" />, action: goTo("contact"), group: "Navigate" },
      { id: "link-github", label: "Open GitHub", description: "Source code & repositories", hint: "@Patelhetu-177", icon: <Github className="w-4 h-4" />, action: openUrl(PERSONAL_INFO.socials.github), group: "Links" },
      { id: "link-linkedin", label: "Open LinkedIn", description: "Professional profile", icon: <Linkedin className="w-4 h-4" />, action: openUrl(PERSONAL_INFO.socials.linkedin), group: "Links" },
      { id: "link-leetcode", label: "Open LeetCode", description: "500+ problems solved", hint: "1572 rating", icon: <ExternalLink className="w-4 h-4" />, action: openUrl(PERSONAL_INFO.socials.leetcode), group: "Links" },
      { id: "link-codechef", label: "Open CodeChef", description: "Competitive programming profile", hint: "3★ 1653", icon: <ExternalLink className="w-4 h-4" />, action: openUrl(PERSONAL_INFO.socials.codechef), group: "Links" },
      { id: "link-resume", label: "Download Resume", description: "Opens the PDF in a new tab", icon: <FileDown className="w-4 h-4" />, action: openUrl(PERSONAL_INFO.resumeUrl), group: "Links" },
      {
        id: "theme-toggle",
        label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        description: "Changes the site's color theme",
        icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
        action: () => {
          toggleTheme();
          setOpen(false);
        },
        group: "Actions",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const filtered = query.trim()
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const groups: CommandItem["group"][] = ["Navigate", "Links", "Actions"];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.action();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c1624] shadow-2xl"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-white/[0.06] px-4 py-3">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Jump to a section, open a link..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
              />
              <kbd className="hidden sm:inline-block rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Esc
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-slate-400">No matching command.</p>
              )}

              {groups.map((group) => {
                const groupItems = filtered.filter((c) => c.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="mb-1.5 last:mb-0">
                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      const idx = filtered.indexOf(item);
                      const active = idx === activeIndex;
                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={item.action}
                          className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors ${
                            active
                              ? "bg-sky-500/10"
                              : "hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className={active ? "text-sky-500" : "text-slate-400"}>{item.icon}</span>
                          <span className="flex-1 min-w-0">
                            <span
                              className={`block text-sm ${
                                active ? "text-sky-700 dark:text-sky-300" : "text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="block truncate text-[11px] text-slate-400 dark:text-slate-500">
                                {item.description}
                              </span>
                            )}
                          </span>
                          {item.hint && (
                            <span className="shrink-0 text-[11px] text-slate-400 font-mono">{item.hint}</span>
                          )}
                          {active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-sky-500" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
