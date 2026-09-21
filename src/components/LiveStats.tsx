"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Flame } from "lucide-react";
import { Github } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { useGithubContributions } from "@/lib/useGithubContributions";

interface LeetCodeStats {
  username: string;
  solved: { total: number; easy: number; medium: number; hard: number };
  ranking: number | null;
  streak: number;
  activeDays: number;
  contest: { rating: number; attended: number; topPercentage: number } | null;
}

const CARD_CLASS =
  "p-5 sm:p-6 rounded-3xl bg-slate-100/60 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] shadow-sm shadow-slate-200/60 dark:shadow-black/30";

const LEVEL_CLASS = [
  "bg-slate-200/70 dark:bg-white/[0.06]",
  "bg-sky-300/60 dark:bg-sky-500/25",
  "bg-sky-400/80 dark:bg-sky-500/50",
  "bg-sky-500 dark:bg-sky-400/75",
  "bg-sky-600 dark:bg-sky-300",
];

function LiveDot() {
  return (
    <span
      className="relative flex h-2 w-2"
      title="Live data"
      aria-label="Live data"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function Tile({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/70 dark:bg-white/[0.07] border border-slate-200/70 dark:border-white/[0.06] px-3.5 py-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-300">
        {label}
      </div>
      <div className="mt-1 text-lg font-bold font-mono text-slate-900 dark:text-white">
        {children}
      </div>
    </div>
  );
}

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/70 dark:bg-white/[0.06] ${className}`}
    />
  );
}

/* ── LeetCode donut ────────────────────────────────────────────────── */

function Donut({ solved }: { solved: LeetCodeStats["solved"] }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const total = Math.max(solved.total, 1);
  const segments = [
    { key: "easy", value: solved.easy, color: "#10b981" },
    { key: "medium", value: solved.medium, color: "#f59e0b" },
    { key: "hard", value: solved.hard, color: "#f43f5e" },
  ];

  let offset = 0;
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          strokeWidth="10"
          className="stroke-slate-200 dark:stroke-white/[0.08]"
        />
        {segments.map((s) => {
          const len = (s.value / total) * c;
          const gap = 3;
          const el = (
            <circle
              key={s.key}
              cx="64"
              cy="64"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${Math.max(len - gap, 0)} ${c}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black font-mono text-slate-900 dark:text-white">
          <CountUp value={solved.total} />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-300">
          Solved
        </span>
      </div>
    </div>
  );
}

function LeetCodePanel() {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((json: LeetCodeStats) => !cancelled && setData(json))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={CARD_CLASS}>
      <div className="flex items-center justify-between mb-5">
        <a
          href={PERSONAL_INFO.socials.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="group/lc flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"
        >
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Flame className="h-4 w-4" />
          </span>
          LeetCode
          <ExternalLink className="h-3 w-3 text-slate-400 group-hover/lc:text-amber-500 transition-colors" />
        </a>
        {data && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-slate-500 dark:text-zinc-300">
            <LiveDot /> LIVE
          </span>
        )}
      </div>

      {error && (
        <p className="py-10 text-center text-sm text-slate-500 dark:text-zinc-400">
          Live LeetCode stats are unavailable right now.{" "}
          <a
            href={PERSONAL_INFO.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 underline"
          >
            View profile
          </a>
        </p>
      )}

      {!error && !data && (
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <SkeletonBlock className="h-36 w-36 !rounded-full" />
            <div className="flex-1 space-y-3">
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SkeletonBlock className="h-16" />
            <SkeletonBlock className="h-16" />
          </div>
        </div>
      )}

      {data && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Donut solved={data.solved} />
            <ul className="w-full space-y-3">
              {[
                { label: "Easy", value: data.solved.easy, color: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
                { label: "Medium", value: data.solved.medium, color: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
                { label: "Hard", value: data.solved.hard, color: "bg-rose-500", text: "text-rose-600 dark:text-rose-400" },
              ].map((row) => (
                <li key={row.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-semibold ${row.text}`}>{row.label}</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-zinc-200">
                      <CountUp value={row.value} />
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/[0.08] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color}`}
                      style={{ width: `${(row.value / Math.max(data.solved.total, 1)) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Tile label="Contest rating">
              {data.contest ? <CountUp value={data.contest.rating} /> : "—"}
            </Tile>
            <Tile label="Top %">
              {data.contest ? (
                <>
                  <CountUp value={data.contest.topPercentage} decimals={1} />%
                </>
              ) : (
                "—"
              )}
            </Tile>
            <Tile label="Contests">
              {data.contest ? <CountUp value={data.contest.attended} /> : "—"}
            </Tile>
            <Tile label="Streak">
              <CountUp value={data.streak} />d
            </Tile>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── GitHub heatmap ────────────────────────────────────────────────── */

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function Heatmap({
  days,
}: {
  days: { date: string; count: number; level: number }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const weeks = useMemo(() => {
    const byDate = new Map(days.map((d) => [d.date, d]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - today.getDay() - 52 * 7); // Sunday, 52 weeks back

    const cols: ({ date: string; count: number; level: number } | null)[][] = [];
    for (let w = 0; w < 53; w++) {
      const col: ({ date: string; count: number; level: number } | null)[] = [];
      for (let d = 0; d < 7; d++) {
        const cell = new Date(start);
        cell.setDate(start.getDate() + w * 7 + d);
        if (cell > today) {
          col.push(null);
        } else {
          const key = fmt(cell);
          col.push(byDate.get(key) ?? { date: key, count: 0, level: 0 });
        }
      }
      cols.push(col);
    }
    return cols;
  }, [days]);

  // Start scrolled to the most recent weeks (matters on small screens).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  return (
    <div>
      <div ref={scrollRef} className="overflow-x-auto pb-2">
        <div className="flex gap-[3px] w-max">
          {weeks.map((col, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {col.map((cell, di) =>
                cell ? (
                  <div
                    key={di}
                    title={`${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${new Date(
                      cell.date + "T00:00:00"
                    ).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}`}
                    className={`h-[11px] w-[11px] rounded-[3px] ${LEVEL_CLASS[Math.min(cell.level, 4)]}`}
                  />
                ) : (
                  <div key={di} className="h-[11px] w-[11px]" />
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-slate-500 dark:text-zinc-300">
        Less
        {LEVEL_CLASS.map((c, i) => (
          <span key={i} className={`h-[10px] w-[10px] rounded-[3px] ${c}`} />
        ))}
        More
      </div>
    </div>
  );
}

function GithubPanel() {
  const { stats, error } = useGithubContributions("Patelhetu-177");

  return (
    <div className={CARD_CLASS}>
      <div className="flex items-center justify-between mb-5">
        <a
          href={PERSONAL_INFO.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/gh flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"
        >
          <span className="p-1.5 rounded-lg bg-slate-500/10 text-slate-700 dark:text-zinc-200">
            <Github className="h-4 w-4" />
          </span>
          GitHub
          <ExternalLink className="h-3 w-3 text-slate-400 group-hover/gh:text-sky-500 transition-colors" />
        </a>
        {stats && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-slate-500 dark:text-zinc-300">
            <LiveDot /> LIVE
          </span>
        )}
      </div>

      {error && (
        <p className="py-10 text-center text-sm text-slate-500 dark:text-zinc-400">
          Live GitHub stats are unavailable right now.{" "}
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 underline"
          >
            View profile
          </a>
        </p>
      )}

      {!error && !stats && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonBlock key={i} className="h-16" />
            ))}
          </div>
          <SkeletonBlock className="h-28 w-full" />
        </div>
      )}

      {stats && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Tile label="Total commits">
              <CountUp value={stats.total} />
            </Tile>
            <Tile label="Last 12 months">
              <CountUp value={stats.lastYearTotal} />
            </Tile>
            <Tile label="Best streak">
              <CountUp value={stats.bestStreak} />d
            </Tile>
            <Tile label="Current streak">
              <CountUp value={stats.currentStreak} />d
            </Tile>
          </div>
          <Heatmap days={stats.days} />
        </div>
      )}
    </div>
  );
}

export default function LiveStats() {
  return (
    <section id="stats" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-[#f2f2f2]">
            Live Coding Stats
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#a1a1aa] mt-2">
            Pulled straight from LeetCode and GitHub — not typed in by hand.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <LeetCodePanel />
          </Reveal>
          <Reveal delay={0.1}>
            <GithubPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
