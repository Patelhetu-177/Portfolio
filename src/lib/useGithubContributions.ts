"use client";

import { useEffect, useState } from "react";

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: number; // 0-4
}

export interface GithubContributionStats {
  days: ContributionDay[]; // chronological, up to today
  total: number;
  bestStreak: number;
  currentStreak: number;
  lastYearTotal: number;
}

// Shared across components so the API is only hit once per page load.
let cache: Promise<GithubContributionStats> | null = null;

function load(username: string): Promise<GithubContributionStats> {
  if (!cache) {
    cache = fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=all`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad status"))))
      .then((data: { contributions: ContributionDay[] }) => {
        const today = new Date().toISOString().slice(0, 10);
        const days = data.contributions
          .filter((d) => d.date <= today)
          .sort((a, b) => (a.date < b.date ? -1 : 1));

        const total = days.reduce((sum, d) => sum + d.count, 0);

        let bestStreak = 0;
        let run = 0;
        for (const d of days) {
          if (d.count > 0) {
            run++;
            bestStreak = Math.max(bestStreak, run);
          } else {
            run = 0;
          }
        }

        let i = days.length - 1;
        if (days[i]?.count === 0) i--;
        let currentStreak = 0;
        for (; i >= 0; i--) {
          if (days[i].count > 0) currentStreak++;
          else break;
        }

        const lastYearTotal = days.slice(-365).reduce((s, d) => s + d.count, 0);

        return { days, total, bestStreak, currentStreak, lastYearTotal };
      })
      .catch((err) => {
        cache = null; // allow a retry on next mount
        throw err;
      });
  }
  return cache;
}

export function useGithubContributions(username: string) {
  const [stats, setStats] = useState<GithubContributionStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    load(username)
      .then((s) => !cancelled && setStats(s))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { stats, error };
}
