"use client";

import React, { useState, useRef, useEffect } from "react";
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from "@/data/portfolioData";
import { Terminal as TerminalIcon, CornerDownLeft, RefreshCw, ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Reveal } from "@/components/ui/Reveal";
import TerminalStats from "@/components/TerminalStats";
import TerminalNeofetch from "@/components/TerminalNeofetch";

interface LogEntry {
  command?: string;
  output: React.ReactNode;
}

const COMMAND_SUGGESTIONS = [
  "help",
  "skills",
  "stats",
  "neofetch",
  "projects",
  "experience",
  "education",
  "contact",
  "cat resume",
  "clear",
];

export default function TerminalSection() {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      output: (
        <div className="space-y-1 text-slate-700 dark:text-zinc-300">
          <p className="text-emerald-600 dark:text-emerald-400 font-bold">
            Welcome to Hetu Patel&apos;s Interactive Dev Console [v1.0.0]
          </p>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Type <span className="text-amber-600 dark:text-amber-400 font-mono font-semibold">help</span> or click any quick command below to inspect skills, projects, experience, or contact data.
          </p>
        </div>
      ),
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [logs]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    let response: React.ReactNode;

    if (lower === "help") {
      response = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-zinc-300">
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">help</span> - Show available commands</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">bio</span> - Read developer summary</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">skills</span> - Full tech stack &amp; capabilities</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">stats</span> - Live LeetCode &amp; GitHub numbers</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">neofetch</span> - System-info style summary</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">projects</span> - FirstBookIt, AvatarAI, EventSphere, etc.</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">experience</span> - Vikartr Technologies production work</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">education</span> - PDEU B.Tech in ICT (CGPA 8.8)</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">contact</span> - Email, phone &amp; profile links</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">theme</span> - Toggle Dark/Light mode</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">cat resume</span> - Resume summary &amp; PDF link</div>
          <div><span className="text-sky-600 dark:text-sky-400 font-mono font-bold">clear</span> - Clear terminal window</div>
        </div>
      );
    } else if (lower === "clear") {
      setLogs([]);
      setInput("");
      return;
    } else if (lower === "bio" || lower === "about") {
      response = (
        <div className="space-y-2 text-xs">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{PERSONAL_INFO.summary}</p>
          <p className="text-slate-600 dark:text-zinc-300">{PERSONAL_INFO.secondaryBio}</p>
        </div>
      );
    } else if (lower === "neofetch") {
      response = <TerminalNeofetch />;
    } else if (lower === "stats") {
      response = <TerminalStats />;
    } else if (lower === "skills") {
      response = (
        <div className="space-y-3 text-xs">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i}>
              <div className="text-purple-600 dark:text-purple-400 font-bold mb-1.5">{cat.title}:</div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-sky-700 dark:text-sky-300 border border-slate-200 dark:border-zinc-700 font-mono text-[11px]"
                  >
                    {s.name} <span className="text-slate-500 dark:text-zinc-400">({s.level})</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === "projects") {
      response = (
        <div className="space-y-2.5 text-xs">
          {PROJECTS.map((p, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
              <div className="flex items-center justify-between font-bold text-sky-600 dark:text-sky-400">
                <span>{p.title}</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/10">[{p.category}]</span>
              </div>
              <p className="text-xs text-sky-700 dark:text-sky-300 font-medium mt-0.5">{p.tagline}</p>
              <p className="text-slate-600 dark:text-zinc-300 text-[11px] mt-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {p.tags.map((t, tIdx) => (
                  <span key={tIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-transparent">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-2.5 text-[11px] font-mono">
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-500 flex items-center gap-1">
                  <span>Live Demo</span> &rarr;
                </a>
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 underline hover:text-sky-500">
                  GitHub Code
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === "experience") {
      response = (
        <div className="space-y-3 text-xs">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{exp.role} @ {exp.company}</span>
                <span className="text-[11px] text-slate-500 dark:text-zinc-400">{exp.period}</span>
              </div>
              <div className="space-y-2 pl-1">
                {exp.projects.map((proj, pIdx) => (
                  <div key={pIdx} className="text-slate-700 dark:text-zinc-300 space-y-1">
                    <div className="font-bold text-sky-700 dark:text-sky-300">• {proj.name} <span className="text-slate-500 dark:text-zinc-400 font-normal">({proj.subtitle})</span></div>
                    <ul className="list-disc list-inside space-y-0.5 pl-2 text-[11px] text-slate-600 dark:text-zinc-300">
                      {proj.points.map((pt, ptIdx) => (
                        <li key={ptIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === "education") {
      response = (
        <div className="space-y-2 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
            <div className="font-bold text-sky-600 dark:text-sky-400 text-sm">Pandit Deendayal Energy University (PDEU)</div>
            <div className="text-slate-700 dark:text-zinc-200 mt-0.5">B.Tech in Information, Communication and Technology (ICT)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">CGPA: 8.8 / 10.0 • Period: Aug 2022 – May 2026</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
            <div className="font-bold text-sky-600 dark:text-sky-400 text-sm">Uma Higher Secondary School, Visnagar</div>
            <div className="text-slate-700 dark:text-zinc-200 mt-0.5">Higher Secondary Certificate (HSC) – Science Stream</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Percentage: 92.0% • Period: 2020 – 2022</div>
          </div>
        </div>
      );
    } else if (lower === "contact") {
      response = (
        <div className="text-xs space-y-1.5 text-slate-700 dark:text-zinc-300 p-3 rounded-xl bg-white dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
          <p>📧 Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-600 dark:text-sky-400 underline font-mono font-semibold">{PERSONAL_INFO.email}</a></p>
          <p>📞 Phone: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sky-600 dark:text-sky-400 underline font-mono font-semibold">{PERSONAL_INFO.phoneDisplay}</a></p>
          <p>💼 LinkedIn: <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 underline">{PERSONAL_INFO.socials.linkedin}</a></p>
          <p>🐙 GitHub: <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 underline">{PERSONAL_INFO.socials.github}</a></p>
          <p>🔥 LeetCode: <a href={PERSONAL_INFO.socials.leetcode} target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 underline">{PERSONAL_INFO.socials.leetcode} (Rating 1572 | 500+ Solved)</a></p>
          <p>⭐ CodeChef: <a href={PERSONAL_INFO.socials.codechef} target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-500 underline">{PERSONAL_INFO.socials.codechef} (3★ | 1653 Rating)</a></p>
        </div>
      );
    } else if (lower === "cat resume" || lower === "resume") {
      response = (
        <div className="text-xs space-y-2 text-slate-700 dark:text-zinc-300 p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
          <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">📄 Hetu Patel — Full Stack &amp; Mobile Developer</p>
          <p className="text-slate-600 dark:text-zinc-300">{PERSONAL_INFO.summary}</p>
          <div className="pt-2 border-t border-slate-200 dark:border-zinc-700">
            <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors">
              <span>Download / View Resume PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      );
    } else if (lower === "theme") {
      toggleTheme();
      response = (
        <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
          Theme switched! Current mode: {theme === "dark" ? "Light" : "Dark"}
        </div>
      );
    } else if (lower.startsWith("echo ")) {
      response = <div className="text-xs text-slate-700 dark:text-zinc-200">{trimmed.substring(5)}</div>;
    } else if (lower === "sudo") {
      response = <div className="text-xs text-rose-500 dark:text-rose-400">Permission denied: you are a guest visitor. Try <span className="font-mono font-bold">sudo hire hetu</span>.</div>;
    } else if (/^sudo\s+hire(\s+hetu)?$/.test(lower)) {
      response = (
        <div className="text-xs space-y-1">
          <p className="text-emerald-600 dark:text-emerald-400 font-bold">[sudo] authenticated as recruiter</p>
          <p className="text-slate-700 dark:text-zinc-300">Access granted. Initiating hiring sequence... <span className="text-emerald-600 dark:text-emerald-400">100%</span></p>
          <p className="text-slate-700 dark:text-zinc-300">Next step: <a href="#contact" className="text-sky-600 dark:text-sky-400 underline font-semibold">send a message</a> or email <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-600 dark:text-sky-400 underline font-mono">{PERSONAL_INFO.email}</a></p>
        </div>
      );
    } else {
      response = (
        <div className="text-xs text-rose-500 dark:text-rose-400">
          Command not found: &ldquo;{trimmed}&rdquo;. Type <span className="text-amber-600 dark:text-amber-300 font-mono font-bold">help</span> or click one of the quick commands above.
        </div>
      );
    }

    setLogs((prev) => [...prev, { command: trimmed, output: response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <section id="terminal" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-[#f2f2f2]">
            Developer Terminal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a1a1aa] mt-2">
            Run shell commands to inspect live skills, projects, experience, and contact data.
          </p>
        </Reveal>

        {/* Terminal Window Container */}
        <Reveal delay={0.1} className="rounded-3xl bg-slate-100/60 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] shadow-sm shadow-slate-200/60 dark:shadow-black/30 text-slate-800 dark:text-zinc-200 overflow-hidden font-mono text-xs sm:text-sm transition-colors duration-300">
          {/* Top Title Bar */}
          <div className="bg-slate-200/40 dark:bg-white/[0.02] px-4 py-3 border-b border-slate-200/40 dark:border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 hover:opacity-80 cursor-pointer" onClick={() => setLogs([])} title="Clear Terminal" />
              <span className="w-3 h-3 rounded-full bg-amber-400 hover:opacity-80 cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 hover:opacity-80 cursor-pointer" />
              <span className="text-slate-600 dark:text-zinc-400 text-xs font-medium ml-2 hidden sm:inline">
                hetu@portfolio:~ (bash)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400">
              <button
                onClick={() => setLogs([])}
                className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-white/80 dark:bg-white/[0.06]"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Quick Command Suggestions Pill Bar */}
          <div className="px-4 py-2.5 bg-slate-100/30 dark:bg-white/[0.01] border-b border-slate-200/40 dark:border-white/[0.04] flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-sans font-semibold shrink-0">
              Quick commands:
            </span>
            {COMMAND_SUGGESTIONS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-[11px] text-slate-700 dark:text-zinc-300 font-mono transition-colors shrink-0"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Screen & Outputs */}
          <div ref={contentRef} className="p-4 sm:p-5 max-h-[380px] min-h-[220px] overflow-y-auto space-y-3.5 bg-transparent transition-colors duration-300">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1.5">
                {log.command && (
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">hetu@dev:~$</span>
                    <span className="font-semibold text-slate-900 dark:text-zinc-100">{log.command}</span>
                  </div>
                )}
                <div className="pl-0 sm:pl-2">{log.output}</div>
              </div>
            ))}
          </div>

          {/* User Input Prompt Footer */}
          <div className="px-4 py-3 bg-slate-200/30 dark:bg-white/[0.02] border-t border-slate-200/40 dark:border-white/[0.04] flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">hetu@dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. skills, projects, experience, contact)..."
              className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-zinc-100 font-mono text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-0"
            />
            <button
              onClick={() => executeCommand(input)}
              className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white shrink-0 transition-colors"
              aria-label="Run command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
