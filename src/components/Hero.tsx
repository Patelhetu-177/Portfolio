"use client";

import React from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Code2,
  Flame,
  Smartphone,
  Layers,
  Bot,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { DraggableCardContainer, DraggableCardBody } from "@/components/ui/DraggableCard";
import { InfiniteMovingCards, MovingCardItem } from "@/components/ui/infinite-moving-cards";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

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
    badge: "500+ Solved",
    quote: "Solved 500+ Data Structures & Algorithms problems across Dynamic Programming, Graphs, Trees, and SQL query optimizations.",
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
    quote: "Completed B.Tech in Information, Communication & Technology with strong core foundations in Distributed Systems and Algorithms.",
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
    quote: "Building web and mobile platforms with Next.js App Router, Node.js, Express, MongoDB, PostgreSQL, and Prisma, with role-based access control.",
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
    title: "n8n Workflows",
    badge: "GenAI Suite",
    quote: "Engineered AvatarAI multi-modal studio with Pinecone vector embeddings for PDF/Excel QA and n8n automated customer chatbot.",
    icon: Bot,
  },
  {
    name: "Vikartr Internship",
    title: "Vikartr Technologies LLP",
    badge: "Industry Work",
    quote: "Built Ethicare Financial Services calculators, and KARBYNX satellite MRV platform.",
    icon: Briefcase,
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 space-y-10">
        {/* ROW 1: Side-by-Side (Headline on Left, 4-Image Draggable Grid on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clean Headline & AttendMetric-styled Buttons */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
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
              <MovingBorderButton
                as="a"
                href="#projects"
                borderRadius="9999px"
                duration={2800}
                containerClassName="w-full sm:w-auto"
                borderClassName="bg-[radial-gradient(#38bdf8_0%,#0284c7_45%,transparent_75%)]"
                className="bg-slate-900 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-100"
              >
                View Projects <span className="ml-2 font-normal">→</span>
              </MovingBorderButton>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-slate-100 dark:bg-white/[0.06] px-6 text-[15px] font-medium text-slate-800 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-white/[0.1]"
              >
                Resume PDF
              </a>

              <a
                href="#contact"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-slate-100 dark:bg-white/[0.06] px-6 text-[15px] font-medium text-slate-800 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-white/[0.1]"
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
                    <div className="overflow-hidden rounded-2xl bg-white/90 p-2.5 dark:bg-slate-900/90 border border-slate-200/50 dark:border-white/[0.06]">
                      <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          priority
                          sizes="(max-width: 640px) 176px, 208px"
                          className="pointer-events-none object-cover object-top"
                        />
                      </div>
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
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-100/60 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] shadow-sm shadow-slate-200/60 dark:shadow-black/30 backdrop-blur-md space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Detailed Bio */}
            <div className="lg:col-span-8 space-y-2">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-[#a1a1aa] leading-relaxed font-normal">
                I care about owning a feature end-to-end — schema design, API contracts, and the interface people actually touch — and making sure it holds up once real users start relying on it.
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
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 hover:text-blue-500 text-xs font-medium transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 hover:text-[#0077b5] text-xs font-medium transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 hover:text-amber-500 text-xs font-medium transition-colors"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>LeetCode (1572)</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 hover:text-amber-600 text-xs font-medium transition-colors"
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
