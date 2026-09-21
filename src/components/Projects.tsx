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
import ProjectImage from "@/components/ui/ProjectImage";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { ProjectImageStack } from "@/components/ui/card-stack";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

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
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Recent Projects &amp; Creations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-2">
            Web apps, AI tools, and real-time platforms I've built and shipped.
          </p>
        </Reveal>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-white/[0.1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Projects Grid */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => {
            const projectImages =
              project.gallery && project.gallery.length > 0
                ? project.gallery
                : [{ image: project.image, title: project.title }];

            return (
              <RevealItem key={project.id}>
              <CardContainer className="w-full h-full" containerClassName="w-full py-2">
                <CardBody className="group/card relative rounded-3xl bg-slate-100/60 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] shadow-sm shadow-slate-200/60 dark:shadow-black/30 p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 w-full h-full min-h-[480px]">
                  
                  {/* 3D Project Image Card Stack */}
                  <CardItem translateZ="100" className="w-full relative aspect-video mt-2">
                    <ProjectImageStack
                      images={projectImages}
                      onImageClick={() => setSelectedProject(project)}
                    />

                    {/* Category Pill */}
                    <span className="absolute top-3.5 left-3.5 z-20 text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 pointer-events-none">
                      {project.category}
                    </span>

                    {/* Quick Expand Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 opacity-0 group-hover/card:opacity-100 hover:bg-sky-600 transition-all duration-200"
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
                      className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed line-clamp-3 mb-4 font-normal"
                    >
                      {project.description}
                    </CardItem>
                  </div>

                  {/* 3D Tags */}
                  <CardItem translateZ="50" className="flex flex-wrap gap-1.5 mb-6 w-full">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/80 dark:bg-white/[0.06] text-slate-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardItem>
                </div>

                {/* 3D Bottom Actions */}
                <CardItem
                  translateZ="40"
                  className="pt-4 flex items-center justify-between gap-3 border-t border-slate-200/40 dark:border-white/[0.04] w-full"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-300 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-zinc-200 text-xs font-semibold transition-all"
                    >
                      Details
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </CardItem>

              </CardBody>
            </CardContainer>
            </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
