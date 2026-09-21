"use client";

import React from "react";
import { EXPERIENCES } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Where I&apos;ve Worked
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-2">
            Full-stack and mobile engineering at Vikartr Technologies, from financial calculators to satellite-powered carbon infrastructure.
          </p>
        </Reveal>

        {/* Timeline Container */}
        <RevealGroup className="relative border-l border-slate-200/60 dark:border-white/[0.08] ml-4 sm:ml-8 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <RevealItem key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[16px] top-1.5 w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 text-sky-500 flex items-center justify-center transition-colors">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-100/60 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] shadow-sm shadow-slate-200/60 dark:shadow-black/30 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200/40 dark:border-white/[0.04]">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-2">
                      {exp.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <h4 className="text-base font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                      {exp.company}
                    </h4>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-zinc-400 gap-1">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-zinc-300">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Projects built during this experience */}
                <div className="space-y-6">
                  {exp.projects.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-5 rounded-2xl bg-white/70 dark:bg-white/[0.07] border border-slate-200/70 dark:border-white/[0.06]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                        <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-500" />
                          {proj.name}
                        </h5>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                          {proj.subtitle}
                        </span>
                      </div>

                      <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
                        {proj.points.map((point, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/40 dark:border-white/[0.04]">
                        {proj.stack.map((st, stIdx) => (
                          <span
                            key={stIdx}
                            className="px-2 py-0.5 rounded-md bg-white dark:bg-white/[0.08] text-slate-700 dark:text-zinc-200 text-[10px] font-semibold"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
