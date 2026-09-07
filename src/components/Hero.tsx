"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Code2,
  Flame,
  Smartphone,
  Layers,
  Bot,
  Sparkles,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { TextFlippingBoard } from "@/components/ui/TextFlippingBoard";
import { DraggableCardContainer, DraggableCardBody } from "@/components/ui/DraggableCard";
import { InfiniteMovingCards, MovingCardItem } from "@/components/ui/infinite-moving-cards";

const FLIP_MESSAGES = [
  "FULL-STACK DEVELOPER\n MERN STACK",
  "MOBILE APP ENGINEER\nREACT NATIVE & EXPO",
  "GENAI & AUTOMATIONS\n N8N WORKFLOWS",
  "LEETCODE 1572 RATING\n450+ PROBLEMS SOLVED",
  "CODECHEF 3-STAR CODER\n1653 CONTEST RATING",
];

const HERO_CARDS = [
  {
    title: "Full-Stack Engineer",
    image: "/assets/1.jpeg",
    className: "top-[5%] left-[5%] rotate-[-6deg]",
  },
  {
    title: "System Architect",
    image: "/assets/about-pic.jpg",
    className: "top-[40%] left-[18%] z-10 rotate-[4deg]",
  },
  {
    title: "Algorithmic Mind",
    image: "/assets/2.jpeg",
    className: "top-[10%] right-[8%] rotate-[8deg]",
  },
  {
    title: "Tech Innovator",
    image: "/assets/3.png",
    className: "top-[48%] right-[10%] rotate-[-5deg]",
  },
];

const MOVING_HIGHLIGHTS: MovingCardItem[] = [
  {
    name: "LeetCode 1572 Rating",
    title: "DSA Problem Solving",
    badge: "450+ Solved",
    quote: "Solved 450+ Data Structures & Algorithms problems across Dynamic Programming, Graphs, Trees, and SQL query optimizations.",
    icon: Flame,
  },
  {
    name: "CodeChef 3★ (1653)",
    title: "Competitive Coder",
    badge: "Active Coder",
    quote: "Active competitive programmer with strong algorithmic speed, accuracy, and optimal memory management under contest constraints.",
    icon: Code2,
  },
  {
    name: "Academic CGPA 8.8",
    title: "PDEU Gandhinagar",
    badge: "B.Tech ICT",
    quote: "Pursuing B.Tech in Information, Communication & Technology with strong core foundations in Distributed Systems and Algorithms.",
    icon: GraduationCap,
  },
  {
    name: "6+ Production Apps",
    title: "Web, Mobile & AI",
    badge: "Live Platforms",
    quote: "Engineered scalable platforms including FirstBookIt, AvatarAI, EventSphere and KARBYNX Carbon MRV infrastructure.",
    icon: Layers,
  },
  {
    name: "Full-Stack Architecture",
    title: "Next.js 14 & MERN Stack",
    badge: "Next.js 14",
    quote: "Building scalable platforms with Next.js App Router, Node.js, Express, MongoDB, PostgreSQL, and Prisma with enterprise RBAC.",
    icon: Layers,
  },
  {
    name: "Cross-Platform Mobile",
    title: "React Native & Expo",
    badge: "iOS & Android",
    quote: "Architected FirstBookIt sports booking app with live GPS run tracking, route flyover playback, and Razorpay bill-splitting.",
    icon: Smartphone,
  },
  {
    name: "GenAI & Automations",
    title: "Gemini AI & n8n Workflows",
    badge: "GenAI Suite",
    quote: "Engineered AvatarAI multi-modal studio with Pinecone vector embeddings for PDF/Excel QA and n8n automated customer chatbot.",
    icon: Bot,
  },
  {
    name: "Enterprise Production",
    title: "Vikartr Technologies LLP",
    badge: "Industry Work",
    quote: "Built Ethicare Financial Services calculators, and KARBYNX satellite MRV platform.",
    icon: Briefcase,
  },
];

export default function Hero() {
  const [msgIdx, setMsgIdx] = useState(0);

  const nextMessage = useCallback(() => {
    setMsgIdx((prev) => (prev + 1) % FLIP_MESSAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextMessage, 3600);
    return () => clearInterval(timer);
  }, [nextMessage]);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 space-y-10">
        {/* ROW 1: Side-by-Side (Flipping Keyboard on Left, 4-Image Draggable Grid on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Flipping Board + Clean Headline & AttendMetric-styled Buttons */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            {/* Flipping Keyboard Board */}
            <div className="w-full flex justify-center lg:justify-start">
              <TextFlippingBoard
                text={FLIP_MESSAGES[msgIdx]}
                className="max-w-[480px] w-full"
              />
            </div>

            {/* Clean Solid Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-900 dark:text-[#f2f2f2] leading-[1.15]">
                Building scalable web, mobile &amp; GenAI applications.
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-[#a1a1aa] max-w-2xl">
                Hi, I&apos;m <span className="font-semibold text-slate-900 dark:text-white">{PERSONAL_INFO.name}</span>. Full-Stack Developer specializing in MERN, Next.js, and React Native with workflow automation (n8n).
              </p>
            </div>

            {/* AttendMetric Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto pt-2">
              <a
                href="#projects"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-slate-900 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-100 shadow-md"
              >
                View Projects <span className="ml-2 font-normal">→</span>
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-slate-100 dark:bg-[#222222] px-6 text-[15px] font-medium text-slate-800 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-[#2a2a2a] border border-slate-200/80 dark:border-slate-800"
              >
                Resume PDF
              </a>

              <a
                href="#contact"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-slate-100 dark:bg-[#222222] px-6 text-[15px] font-medium text-slate-800 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-[#2a2a2a] border border-slate-200/80 dark:border-slate-800"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right Column: 4-Image Interactive Draggable Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative h-[480px] w-full sm:h-[520px] lg:h-[540px] max-w-[560px]">
              <DraggableCardContainer className="relative h-full w-full">
                {HERO_CARDS.map((item) => (
                  <DraggableCardBody key={item.title} className={item.className}>
                    <div className="overflow-hidden rounded-2xl bg-white p-2.5 shadow-2xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="pointer-events-none h-44 w-44 object-cover object-top rounded-xl sm:h-52 sm:w-52"
                      />
                      <h3 className="mt-2.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        {item.title}
                      </h3>
                    </div>
                  </DraggableCardBody>
                ))}
              </DraggableCardContainer>
            </div>
          </div>
        </div>

        {/* ROW 2: Details Section at Bottom (Bio, Socials & Slow Moving Single-Line Highlights) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-[#132337]/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Detailed Bio */}
            <div className="lg:col-span-8 space-y-2">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-[#a1a1aa] leading-relaxed font-normal">
                {PERSONAL_INFO.summary}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {PERSONAL_INFO.secondaryBio}
              </p>
            </div>

            {/* Social Connections */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Quick Connections:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a2638] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-blue-500 text-xs font-medium transition-colors shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a2638] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-[#0077b5] text-xs font-medium transition-colors shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a2638] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-amber-500 text-xs font-medium transition-colors shadow-sm"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>LeetCode (1572)</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1a2638] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-amber-600 text-xs font-medium transition-colors shadow-sm"
                >
                  <Code2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>CodeChef (3★)</span>
                </a>
              </div>
            </div>
          </div>

          {/* 1 Single Line Moving Marquee - Balanced & Leisurely Speed */}
          <div className="pt-2">
            <InfiniteMovingCards items={MOVING_HIGHLIGHTS} direction="left" speed="normal" />
          </div>
        </div>
      </div>
    </section>
  );
}
