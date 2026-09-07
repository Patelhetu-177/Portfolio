"use client";

import React from "react";
import { HoverEffect, HoverEffectItem } from "@/components/ui/card-hover-effect";
import {
  GraduationCap,
  Briefcase,
  Layers,
  Bot,
  Award,
  Flame,
  Check,
  ExternalLink,
  BookOpen,
  School,
  Code2,
} from "lucide-react";
import {
  Github,
  PineconeIcon,
  GeminiIcon,
  AwsIcon,
  N8nIcon,
} from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function BentoAbout() {
  const items: HoverEffectItem[] = [
    // 1. Education & Academic Excellence (Span 2)
    {
      title: "Academic Foundation",
      description:
        "B.Tech in ICT at PDEU — CGPA 8.8/10, on a 92% HSC score and ACPC rank 846.",
      header: (
        <div className="flex w-full flex-col gap-3 pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Formal Education &amp; Degrees
              </span>
            </div>
            <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-bold">
              ICT &amp; Science
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* PDEU Card */}
            <div className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.04] flex flex-col justify-between">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>PDEU Gandhinagar</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    B.Tech in ICT
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                  CGPA: 8.8 / 10
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-200/60 dark:border-white/[0.06] flex justify-between">
                <span>DSA • DBMS • OS • Networks</span>
                <span>2022 – Present</span>
              </div>
            </div>

            {/* Uma Higher Secondary Card */}
            <div className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.04] flex flex-col justify-between">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Uma Higher Secondary</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    HSC Science • Visnagar
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                  Score: 92.0%
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-200/60 dark:border-white/[0.06] flex justify-between">
                <span>ACPC Rank 846</span>
                <span>2020 – 2022</span>
              </div>
            </div>
          </div>
        </div>
      ),
      icon: <GraduationCap className="h-4 w-4 text-blue-500 shrink-0" />,
      className: "md:col-span-2",
    },

    // 2. Competitive Programming & Problem Solving (Span 1)
    {
      title: "Competitive Programming",
      description:
        "450+ problems on LeetCode (1572) and CodeChef (3★, 1653) — DP, graphs, and query optimization.",
      header: (
        <div className="flex w-full flex-col gap-3 pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>DSA &amp; Competitive Track</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
              450+ Solved
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <a
              href={PERSONAL_INFO.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.04] hover:bg-amber-500/10 transition-colors block group/link"
              title="View Hetu's LeetCode Profile"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-0.5">
                <span className="text-[10px] font-semibold">LeetCode</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover/link:text-amber-500 transition-colors" />
              </div>
              <span className="text-amber-600 dark:text-amber-400 font-bold text-xs font-mono block">1572 Rating</span>
              <span className="text-[9px] text-slate-400 font-medium">450+ DSA Solved</span>
            </a>

            <a
              href={PERSONAL_INFO.socials.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.04] hover:bg-sky-500/10 transition-colors block group/link"
              title="View Hetu's CodeChef Profile"
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-0.5">
                <span className="text-[10px] font-semibold">CodeChef</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover/link:text-sky-500 transition-colors" />
              </div>
              <span className="text-sky-600 dark:text-sky-400 font-bold text-xs font-mono block">3★ (1653)</span>
              <span className="text-[9px] text-slate-400 font-medium">Division 2 Rank</span>
            </a>
          </div>
        </div>
      ),
      icon: <Flame className="h-4 w-4 text-amber-500 shrink-0" />,
      className: "md:col-span-1",
    },

    // 3. Products Shipped on GitHub (Span 1)
    {
      title: "Products Shipped on GitHub",
      description:
        "FirstBookIt, AvatarAI, and EventSphere — cross-platform products shipped in TypeScript.",
      header: (
        <div className="flex w-full flex-col gap-3 pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group/gh"
              title="View Hetu's GitHub profile"
            >
              <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
              <span>@Patelhetu-177</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover/gh:text-slate-600 dark:group-hover/gh:text-slate-200 transition-colors" />
            </a>
            <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              6+ Projects
            </span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">FirstBookIt</span>
              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold">React Native + Expo</span>
            </div>
            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">AvatarAI</span>
              <span className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold">Next.js 14 + Gemini AI</span>
            </div>
            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">EventSphere</span>
              <span className="text-[9px] text-sky-600 dark:text-sky-400 font-semibold">Next.js + Prisma</span>
            </div>
          </div>
        </div>
      ),
      icon: <Github className="h-4 w-4 text-slate-900 dark:text-white shrink-0" />,
      className: "md:col-span-1",
    },

    // 4. Industry Experience: Vikartr Technologies LLP (Span 2)
    {
      title: "Industry Experience",
      description:
        "Full Stack Developer at Vikartr Technologies since May 2025, after a web-dev internship at Cognifyz Technologies.",
      header: (
        <div className="flex w-full flex-col gap-3 pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-bold">VIKARTR TECHNOLOGIES LLP</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
              May 2025 – Present
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
          

            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.04]">
              <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                <span>Ethicare</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">FinTech</span>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">
                Stamp-duty, loan &amp; interest calculators with User·Agent·Staff dashboards
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.04]">
              <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                <span>KARBYNX</span>
                <span className="text-sky-600 dark:text-sky-400 font-mono font-bold">Carbon MRV</span>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">
                React Native + Expo app syncing IoT sensor &amp; satellite data for automated MRV
              </p>
            </div>
          </div>

          <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>Prev · Cognifyz Technologies — Web Developer Intern</span>
            <span>Jan – Mar 2025</span>
          </div>
        </div>
      ),
      icon: <Briefcase className="h-4 w-4 text-emerald-500 shrink-0" />,
      className: "md:col-span-2",
    },

    // 5. Full Stack Architecture & Cross-Platform Mobile (Span 1)
    {
      title: "Full-Stack & Cross-Platform",
      description:
        "Next.js, React Native, Node/Express, MongoDB, PostgreSQL, and Prisma — with enterprise RBAC.",
      header: (
        <div className="flex w-full flex-col gap-3 pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Full-Stack &amp; Mobile</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
              Production
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Next.js App Router, SSR/SSG</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">REST APIs · JWT auth · middleware</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded shrink-0">
                Web
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">React Native + Expo apps</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">iOS &amp; Android · GPS · maps</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded shrink-0">
                Mobile
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">MongoDB, PostgreSQL, Prisma</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">Schema design · multi-role RBAC</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                Data
              </span>
            </div>
          </div>
        </div>
      ),
      icon: <Code2 className="h-4 w-4 text-blue-500 shrink-0" />,
      className: "md:col-span-1",
    },

    // 6. GenAI, AWS & Workflow Automations (Span 1)
    {
      title: "GenAI & Cloud Automation",
      description:
        "Gemini multi-modal models, Pinecone vector search, n8n webhooks, and AWS (EC2, S3, IAM, Lambda).",
      header: (
        <div className="flex w-full flex-col gap-3 pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <AwsIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>AWS &amp; GenAI Pipelines</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <N8nIcon className="w-2.5 h-2.5 text-rose-500" /> n8n Flows
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <GeminiIcon className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">Gemini multi-modal models</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[9px]">Chat, vision &amp; embeddings</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded shrink-0">
                GenAI
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <PineconeIcon className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">Pinecone vector search</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[9px]">Q&amp;A over PDF &amp; Excel docs</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded shrink-0">
                RAG
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <AwsIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">AWS EC2, S3, IAM, Lambda</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[9px]">n8n webhook automation flows</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                Cloud
              </span>
            </div>
          </div>
        </div>
      ),
      icon: <Bot className="h-4 w-4 text-purple-500 shrink-0" />,
      className: "md:col-span-1",
    },

    // 7. Certifications & Recognition (Span 1)
    {
      title: "Certifications & Recognition",
      description:
        "Certificates from Johns Hopkins and Meta (Coursera), plus a Smart India Hackathon 2024 finalist finish.",
      header: (
        <div className="flex w-full flex-col gap-3 pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Award className="w-3.5 h-3.5 text-blue-500" />
              <span>Verified Credentials</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> Accredited
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">HTML, CSS &amp; JavaScript for Web Developers</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">Johns Hopkins University</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded shrink-0">
                Verified
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Web Apps with Express.js &amp; Node.js</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">Meta (Coursera)</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                Verified
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Smart India Hackathon 2024</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">Cyber Triage Tool · college round</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                Finalist
              </span>
            </div>
          </div>
        </div>
      ),
      icon: <Award className="h-4 w-4 text-blue-500 shrink-0" />,
      className: "md:col-span-1",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-[#f2f2f2]">
            About Me &amp; Core Strengths
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#a1a1aa] mt-2">
            Academic record, competitive programming, shipped products on GitHub, hands-on engineering at Vikartr Technologies and Cognifyz, plus certifications and a hackathon finalist finish.
          </p>
        </div>

        {/* Card Hover Effect Grid */}
        <HoverEffect items={items} className="w-full mx-auto" />
      </div>
    </section>
  );
}
