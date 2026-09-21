"use client";

import React, { useEffect, useState } from "react";
import { useGithubContributions } from "@/lib/useGithubContributions";

interface LeetCodeStats {
  solved: { total: number; easy: number; medium: number; hard: number };
  streak: number;
  contest: { rating: number; attended: number; topPercentage: number } | null;
}

const bar = (value: number, max: number, width = 20) => {
  const filled = Math.round((value / Math.max(max, 1)) * width);
  return "█".repeat(filled) + "░".repeat(width - filled);
};

/** Terminal-styled readout of live LeetCode + GitHub numbers. */
export default function TerminalStats() {
  const [lc, setLc] = useState<LeetCodeStats | null>(null);
  const [lcError, setLcError] = useState(false);
  const { stats: gh, error: ghError } = useGithubContributions("Patelhetu-177");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => !cancelled && setLc(j))
      .catch(() => !cancelled && setLcError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = (!lc && !lcError) || (!gh && !ghError);

  return (
    <div className="text-xs space-y-3 font-mono">
      {loading && (
        <p className="text-slate-500 dark:text-zinc-400 animate-pulse">
          Fetching live stats...
        </p>
      )}

      {lc && (
        <div>
          <div className="text-amber-600 dark:text-amber-400 font-bold mb-1">
            LeetCode · <span className="text-emerald-600 dark:text-emerald-400">live</span>
          </div>
          <div className="text-slate-700 dark:text-zinc-300 space-y-0.5">
            <div>Solved <span className="font-bold">{lc.solved.total}</span></div>
            <div className="text-emerald-600 dark:text-emerald-400">
              Easy   {bar(lc.solved.easy, lc.solved.total)} {lc.solved.easy}
            </div>
            <div className="text-amber-600 dark:text-amber-400">
              Medium {bar(lc.solved.medium, lc.solved.total)} {lc.solved.medium}
            </div>
            <div className="text-rose-600 dark:text-rose-400">
              Hard   {bar(lc.solved.hard, lc.solved.total)} {lc.solved.hard}
            </div>
            {lc.contest && (
              <div>
                Contest rating <span className="font-bold">{lc.contest.rating}</span> · top{" "}
                {lc.contest.topPercentage.toFixed(1)}% · {lc.contest.attended} contests
              </div>
            )}
            <div>Streak <span className="font-bold">{lc.streak}d</span></div>
          </div>
        </div>
      )}
      {lcError && (
        <p className="text-rose-500 dark:text-rose-400">LeetCode stats unavailable right now.</p>
      )}

      {gh && (
        <div>
          <div className="text-sky-600 dark:text-sky-400 font-bold mb-1">
            GitHub · <span className="text-emerald-600 dark:text-emerald-400">live</span>
          </div>
          <div className="text-slate-700 dark:text-zinc-300 space-y-0.5">
            <div>Total commits <span className="font-bold">{gh.total}</span></div>
            <div>Last 12 months <span className="font-bold">{gh.lastYearTotal}</span></div>
            <div>
              Best streak <span className="font-bold">{gh.bestStreak}d</span> · current{" "}
              <span className="font-bold">{gh.currentStreak}d</span>
            </div>
          </div>
        </div>
      )}
      {ghError && (
        <p className="text-rose-500 dark:text-rose-400">GitHub stats unavailable right now.</p>
      )}

      {!loading && (
        <p className="text-slate-500 dark:text-zinc-400">
          See the full heatmap in the Live Coding Stats section above.
        </p>
      )}
    </div>
  );
}
