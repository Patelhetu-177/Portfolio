"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolioData";
import {
  FolderGit2,
  ExternalLink,
  Maximize2,
  ArrowUpRight,
} from "lucide-react";
import { Github } from "@/components/Icons";
import ProjectModal from "./ProjectModal";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Mobile & Web", "GenAI & Tools", "Full Stack", "Real-Time Systems"];

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Recent Projects &amp; Creations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            A showcase of production-ready web apps, AI tools, and real-time platforms.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <CardContainer key={project.id} className="w-full h-full" containerClassName="w-full py-2">
              <CardBody className="group/card relative rounded-3xl bg-white dark:bg-[#132337]/80 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between hover:shadow-2xl hover:shadow-sky-500/[0.1] hover:border-sky-500/60 transition-all duration-300 w-full h-full min-h-[480px]">
                
                {/* 3D Project Image */}
                <CardItem translateZ="100" className="w-full relative aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-md">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />

                  {/* Category Pill */}
                  <span className="absolute top-3.5 left-3.5 text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15">
                    {project.category}
                  </span>

                  {/* Quick Expand Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 opacity-0 group-hover/card:opacity-100 hover:bg-sky-600 transition-all duration-200"
                    title="Quick Details"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </CardItem>

                {/* 3D Project Title & Tagline */}
                <div className="mt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <CardItem
                      translateZ="50"
                      className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover/card:text-sky-500 transition-colors flex items-center justify-between w-full"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover/card:opacity-100 transition-opacity text-sky-500" />
                    </CardItem>

                    <CardItem
                      as="p"
                      translateZ="40"
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-1 mb-2.5"
                    >
                      {project.tagline}
                    </CardItem>

                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4 font-normal"
                    >
                      {project.description}
                    </CardItem>
                  </div>

                  {/* 3D Tags */}
                  <CardItem translateZ="50" className="flex flex-wrap gap-1.5 mb-6 w-full">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#0c1624] text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardItem>
                </div>

                {/* 3D Bottom Actions */}
                <CardItem
                  translateZ="40"
                  className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80 w-full"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1a2638] hover:bg-slate-200 dark:hover:bg-[#22334a] text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700"
                    >
                      Details
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </CardItem>

              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
