"use client";

import React, { useEffect, useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useGithubContributions } from "@/lib/useGithubContributions";

const LOGO = [
  "  ██╗  ██╗██████╗ ",
  "  ██║  ██║██╔══██╗",
  "  ███████║██████╔╝",
  "  ██╔══██║██╔═══╝ ",
  "  ██║  ██║██║     ",
  "  ╚═╝  ╚═╝╚═╝     ",
];

/** neofetch-style summary card for the terminal. */
export default function TerminalNeofetch() {
  const { stats: gh } = useGithubContributions("Patelhetu-177");
  const [solved, setSolved] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => !cancelled && setSolved(j.solved.total))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const rows: [string, string][] = [
    ["Role", "Full Stack Developer"],
    ["Company", "Vikartr Technologies"],
    ["Education", "B.Tech ICT, PDEU (CGPA 8.8)"],
    ["Stack", "MERN · Next.js · React Native"],
    ["Also", "GenAI · n8n · AWS · Docker"],
    ["Location", PERSONAL_INFO.location],
    ["LeetCode", solved !== null ? `${solved} solved` : "loading..."],
    ["GitHub", gh ? `${gh.total} commits · ${gh.bestStreak}d best streak` : "loading..."],
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-x-6 gap-y-3 text-xs font-mono">
      <pre className="text-sky-500 leading-[1.15] select-none overflow-x-auto">
        {LOGO.join("\n")}
      </pre>
      <div className="space-y-0.5">
        <div>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">hetu</span>
          <span className="text-slate-500">@</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">portfolio</span>
        </div>
        <div className="text-slate-400 dark:text-zinc-600">──────────────</div>
        {rows.map(([k, v]) => (
          <div key={k} className="text-slate-700 dark:text-zinc-300">
            <span className="text-sky-600 dark:text-sky-400 font-bold">{k}</span>
            <span className="text-slate-500">: </span>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
