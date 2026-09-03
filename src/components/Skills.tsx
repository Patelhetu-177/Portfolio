"use client";

import React, { useState } from "react";
import {
  Code2,
  Binary,
  Smartphone,
  Cpu,
  Terminal,
  FileCode,
  Layers,
  Globe,
  Palette,
  Layout,
  Server,
  Database,
  HardDrive,
  Radio,
  Cloud,
  Box,
  Sparkles,
  Zap,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: "Languages & Mobile" | "Frontend Engineering" | "Backend & Databases" | "Cloud & DevOps";
  level: "Expert" | "Advanced" | "Intermediate" | "Basic" | string;
  subtitle: string;
  icon: React.ElementType;
  accent: "blue" | "sky" | "emerald" | "purple" | "amber" | "indigo" | "rose" | "teal" | "orange";
  badge: string;
}

const ALL_SKILLS: SkillItem[] = [
  // Languages & Mobile
  {
    name: "JavaScript (ES6+)",
    category: "Languages & Mobile",
    level: "Advanced",
    subtitle: "Async/Await, Closures, DOM, ESNext features",
    icon: Code2,
    accent: "amber",
    badge: "Core Language",
  },
  {
    name: "TypeScript",
    category: "Languages & Mobile",
    level: "Advanced",
    subtitle: "Static Typing, Generics, Complex Interfaces",
    icon: Binary,
    accent: "blue",
    badge: "Type Safety",
  },
  {
    name: "React Native & Expo",
    category: "Languages & Mobile",
    level: "Advanced",
    subtitle: "Cross-Platform iOS/Android, GPS & Maps",
    icon: Smartphone,
    accent: "indigo",
    badge: "Mobile Stack",
  },
  {
    name: "Java",
    category: "Languages & Mobile",
    level: "Intermediate",
    subtitle: "OOP Principles, Collections, Concurrency",
    icon: Cpu,
    accent: "orange",
    badge: "Backend & OOP",
  },
  {
    name: "C / C++",
    category: "Languages & Mobile",
    level: "Intermediate",
    subtitle: "Memory Management, Pointers, Algorithms",
    icon: Terminal,
    accent: "purple",
    badge: "Low-Level & CP",
  },

  // Frontend Engineering
  {
    name: "React.js",
    category: "Frontend Engineering",
    level: "Expert",
    subtitle: "Custom Hooks, Context API, Virtual DOM, SPA",
    icon: Layers,
    accent: "sky",
    badge: "Frontend Core",
  },
  {
    name: "Next.js",
    category: "Frontend Engineering",
    level: "Advanced",
    subtitle: "Server Components, SSR/SSG, Route Handlers",
    icon: Globe,
    accent: "blue",
    badge: "Full Stack Core",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend Engineering",
    level: "Expert",
    subtitle: "Utility-First, Responsive Systems, Dark Mode",
    icon: Palette,
    accent: "teal",
    badge: "Design System",
  },
  {
    name: "HTML5 & CSS3",
    category: "Frontend Engineering",
    level: "Expert",
    subtitle: "Semantic Markup, Flexbox, Grid, Animations",
    icon: Layout,
    accent: "orange",
    badge: "Web Standards",
  },

  // Backend & Databases
  {
    name: "Node.js & Express.js",
    category: "Backend & Databases",
    level: "Advanced",
    subtitle: "REST APIs, Middleware, JWT Auth, Microservices",
    icon: Server,
    accent: "emerald",
    badge: "API Runtime",
  },
  {
    name: "MongoDB & Mongoose",
    category: "Backend & Databases",
    level: "Advanced",
    subtitle: "Aggregation Pipelines, Indexing, Document Models",
    icon: Database,
    accent: "emerald",
    badge: "NoSQL DB",
  },
  {
    name: "PostgreSQL & Prisma ORM",
    category: "Backend & Databases",
    level: "Advanced",
    subtitle: "Relational Schemas, Migrations, ACID Tx",
    icon: Database,
    accent: "sky",
    badge: "SQL & ORM",
  },
  {
    name: "MySQL",
    category: "Backend & Databases",
    level: "Intermediate",
    subtitle: "Relational Tables, Joins, Query Optimization",
    icon: HardDrive,
    accent: "amber",
    badge: "Relational DB",
  },
  {
    name: "WebSockets / Socket.io",
    category: "Backend & Databases",
    level: "Advanced",
    subtitle: "Real-Time Event Streaming & Low-Latency Sync",
    icon: Radio,
    accent: "purple",
    badge: "Real-Time Comms",
  },

  // Cloud & DevOps
  {
    name: "AWS (EC2, S3, IAM, Lambda)",
    category: "Cloud & DevOps",
    level: "Intermediate",
    subtitle: "Cloud Hosting, S3 Storage & IAM Permissions",
    icon: Cloud,
    accent: "amber",
    badge: "Cloud Infra",
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    level: "Intermediate",
    subtitle: "Containerization, Multi-Stage Builds, Compose",
    icon: Box,
    accent: "blue",
    badge: "Containers",
  },
];

const CATEGORIES = [
  "All",
  "Languages & Mobile",
  "Frontend Engineering",
  "Backend & Databases",
  "Cloud & DevOps",
] as const;

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills =
    activeCategory === "All"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === activeCategory);

  const getAccentStyles = (accent: SkillItem["accent"]) => {
    switch (accent) {
      case "sky":
        return {
          iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
          badgeBg: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
          cardBorder: "hover:border-sky-500/50",
          dotColor: "bg-sky-500",
        };
      case "blue":
        return {
          iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
          cardBorder: "hover:border-blue-500/50",
          dotColor: "bg-blue-500",
        };
      case "emerald":
        return {
          iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
          cardBorder: "hover:border-emerald-500/50",
          dotColor: "bg-emerald-500",
        };
      case "purple":
        return {
          iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
          badgeBg: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
          cardBorder: "hover:border-purple-500/50",
          dotColor: "bg-purple-500",
        };
      case "amber":
        return {
          iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          badgeBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
          cardBorder: "hover:border-amber-500/50",
          dotColor: "bg-amber-500",
        };
      case "indigo":
        return {
          iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
          badgeBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
          cardBorder: "hover:border-indigo-500/50",
          dotColor: "bg-indigo-500",
        };
      case "teal":
        return {
          iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
          badgeBg: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30",
          cardBorder: "hover:border-teal-500/50",
          dotColor: "bg-teal-500",
        };
      case "orange":
        return {
          iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
          badgeBg: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30",
          cardBorder: "hover:border-orange-500/50",
          dotColor: "bg-orange-500",
        };
      case "rose":
      default:
        return {
          iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
          badgeBg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
          cardBorder: "hover:border-rose-500/50",
          dotColor: "bg-rose-500",
        };
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-[#f2f2f2]">
            Core Technical Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#a1a1aa] mt-2">
            Languages, frameworks, databases, and tools I use to build scalable products.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 border ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                  : "bg-white dark:bg-[#132337]/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, idx) => {
            const styles = getAccentStyles(skill.accent);
            const Icon = skill.icon;

            return (
              <div
                key={idx}
                className={`group relative p-4 rounded-2xl bg-white dark:bg-[#132337]/70 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-md transition-colors duration-200 ${styles.cardBorder}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl border ${styles.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${styles.badgeBg}`}>
                    {skill.badge}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor}`} />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-[#f2f2f2]">
                      {skill.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {skill.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Proficiency:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                    {skill.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
