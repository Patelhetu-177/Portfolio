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
      title: "Academic Background & Education",
      description:
        "Consistent academic distinction in Computer Science & ICT at Pandit Deendayal Energy University (CGPA 8.8) and Uma Higher Secondary School (92.0% in HSC Board).",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[7rem] flex-col justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
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
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex flex-col justify-between">
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
                <span>Distributed Systems &amp; Algos</span>
                <span>2022 – Present</span>
              </div>
            </div>

            {/* Uma Higher Secondary Card */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex flex-col justify-between">
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
                <span>Higher Secondary Board</span>
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
      title: "Competitive Programming & Problem Solving",
      description:
        "450+ solved on LeetCode (1572 rating) and CodeChef (3★ 1653 rating), specializing in Dynamic Programming and Graph Theory.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[7rem] flex-col justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
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
              className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] hover:bg-amber-500/10 transition-colors block group/link"
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
              className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] hover:bg-sky-500/10 transition-colors block group/link"
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

    // 3. Industry Experience: Vikartr Technologies LLP (Span 2)
    {
      title: "Industry Work: Vikartr Technologies LLP",
      description:
        "Full Stack Developer building real-world enterprise web and mobile platforms: Hotel PMS (RBAC + MERN), Ethicare Financials, and KARBYNX Carbon Market Infrastructure.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[7rem] flex-col justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
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
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04]">
              <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                <span>Hotel PMS</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">RBAC</span>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">
                Staff, Admin &amp; Reception Workflows
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04]">
              <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                <span>Ethicare</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">FinTech</span>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">
                Financial Calculators &amp; Dashboards
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04]">
              <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                <span>KARBYNX</span>
                <span className="text-sky-600 dark:text-sky-400 font-mono font-bold">Carbon MRV</span>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">
                Satellite &amp; IoT Carbon Infrastructure
              </p>
            </div>
          </div>
        </div>
      ),
      icon: <Briefcase className="h-4 w-4 text-emerald-500 shrink-0" />,
      className: "md:col-span-2",
    },

    // 4. Open Source & Production Platforms (Span 1)
    {
      title: "Active Open Source & Product Builder",
      description:
        "Building production-grade applications with clean code, modular TypeScript architecture, and active public GitHub commits.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6.5rem] flex-col justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
              <span>GitHub Repositories</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              6+ Projects
            </span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">FirstBookIt</span>
              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold">React Native + Expo</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">AvatarAI</span>
              <span className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold">Next.js 14 + Gemini AI</span>
            </div>
          </div>
        </div>
      ),
      icon: <Github className="h-4 w-4 text-slate-900 dark:text-white shrink-0" />,
      className: "md:col-span-1",
    },

    // 5. Full Stack Architecture & Cross-Platform Mobile (Span 1)
    {
      title: "Full-Stack Architecture & MERN",
      description:
        "Building resilient multi-tier web & mobile apps with Next.js 14, React Native (Expo), Node.js, Express, MongoDB, PostgreSQL, and Prisma with enterprise RBAC.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6.5rem] flex-col justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Full-Stack &amp; Mobile</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
              Production
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04]">
              <span className="text-slate-500 dark:text-slate-400 text-[9px] block">Web Stack</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Next.js 14 • MERN</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04]">
              <span className="text-slate-500 dark:text-slate-400 text-[9px] block">Mobile Stack</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">React Native • Expo</span>
            </div>
          </div>
        </div>
      ),
      icon: <Code2 className="h-4 w-4 text-blue-500 shrink-0" />,
      className: "md:col-span-1",
    },

    // 6. GenAI, AWS & Workflow Automations (Span 1)
    {
      title: "GenAI & AWS Cloud Automations",
      description:
        "Architecting production AI pipelines with Gemini Multi-Modal models, Pinecone Vector embeddings, automated n8n webhooks, and AWS Cloud (EC2, S3, IAM).",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6.5rem] flex-col justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <AwsIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>AWS &amp; GenAI Pipelines</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <N8nIcon className="w-2.5 h-2.5 text-rose-500" /> n8n Flows
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[9px] font-mono">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex flex-col items-center justify-center text-center">
              <AwsIcon className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate w-full">AWS Cloud</span>
              <span className="text-[8px] text-slate-400">EC2 • S3</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex flex-col items-center justify-center text-center">
              <PineconeIcon className="w-3.5 h-3.5 text-sky-500 mb-0.5" />
              <span className="font-bold text-sky-600 dark:text-sky-400 truncate w-full">Pinecone</span>
              <span className="text-[8px] text-slate-400">Vector DB</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex flex-col items-center justify-center text-center">
              <GeminiIcon className="w-3.5 h-3.5 text-purple-500 mb-0.5" />
              <span className="font-bold text-purple-600 dark:text-purple-400 truncate w-full">Gemini Pro</span>
              <span className="text-[8px] text-slate-400">Multi-Modal</span>
            </div>
          </div>
        </div>
      ),
      icon: <Bot className="h-4 w-4 text-purple-500 shrink-0" />,
      className: "md:col-span-1",
    },

    // 7. Verified Industry Specializations (Span 1)
    {
      title: "Verified Industry Specializations",
      description:
        "Certified in Modern Web Architecture by Johns Hopkins University and Backend Node.js/Express Web Applications by Meta (Coursera).",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6.5rem] flex-col justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Award className="w-3.5 h-3.5 text-blue-500" />
              <span>Verified Credentials</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> Accredited
            </span>
          </div>

          <div className="space-y-1.5 my-auto">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Single Page Web Apps</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">Johns Hopkins University</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] flex items-center justify-between text-[10px]">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Back-End Apps (Node/Express)</span>
                <span className="text-slate-500 dark:text-slate-400 text-[9px]">Meta (Coursera)</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Verified
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
            Education credentials, competitive coding rankings, industry software engineering at Vikartr Technologies, and open-source contributions.
          </p>
        </div>

        {/* Card Hover Effect Grid */}
        <HoverEffect items={items} className="w-full mx-auto" />
      </div>
    </section>
  );
}
