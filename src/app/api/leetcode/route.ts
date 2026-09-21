import { NextResponse } from "next/server";

// Cache the upstream response for an hour so we're a good citizen to LeetCode
// and the page stays fast.
export const revalidate = 3600;

const USERNAME = "Hetu_patel_17";

const QUERY = `
query userStats($username: String!) {
  matchedUser(username: $username) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { streak totalActiveDays }
  }
  userContestRanking(username: $username) {
    rating
    attendedContestsCount
    topPercentage
  }
}`;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      next: { revalidate },
    });

    if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);

    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) throw new Error("User not found");

    const counts: Record<string, number> = {};
    for (const row of user.submitStatsGlobal.acSubmissionNum as {
      difficulty: string;
      count: number;
    }[]) {
      counts[row.difficulty] = row.count;
    }

    const contest = json.data.userContestRanking;

    return NextResponse.json({
      username: USERNAME,
      solved: {
        total: counts.All ?? 0,
        easy: counts.Easy ?? 0,
        medium: counts.Medium ?? 0,
        hard: counts.Hard ?? 0,
      },
      ranking: user.profile?.ranking ?? null,
      streak: user.userCalendar?.streak ?? 0,
      activeDays: user.userCalendar?.totalActiveDays ?? 0,
      contest: contest
        ? {
            rating: Math.round(contest.rating),
            attended: contest.attendedContestsCount,
            topPercentage: contest.topPercentage,
          }
        : null,
    });
  } catch {
    return NextResponse.json({ error: "LeetCode data unavailable" }, { status: 502 });
  }
}
