"use client";

import React from "react";
import { EXPERIENCES } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Work Experience &amp; Industry Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Production full-stack and mobile engineering at scale, architecting enterprise systems and real-time platforms.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-500 flex items-center justify-center text-sky-500 transition-colors">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md hover:border-sky-500/40 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
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

                  <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 gap-1">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
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
                      className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                        <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-500" />
                          {proj.name}
                        </h5>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {proj.subtitle}
                        </span>
                      </div>

                      <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {proj.points.map((point, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                        {proj.stack.map((st, stIdx) => (
                          <span
                            key={stIdx}
                            className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-600/60 text-[10px] font-semibold"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
