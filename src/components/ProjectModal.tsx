"use client";

import React from "react";
import { Project } from "@/data/portfolioData";
import { ExternalLink, CheckCircle2, Sparkles, Layers, Code2 } from "lucide-react";
import { Github } from "@/components/Icons";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/components/ui/animated-modal";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const galleryItems =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [{ image: project.image, title: project.title, description: project.description }];

  const isDesktop = project.id !== "firstbookit";

  const carouselCards = galleryItems.map((item, index) => (
    <Card
      key={item.image + index}
      card={{
        category: `Feature ${index + 1} of ${galleryItems.length}`,
        title: item.title,
        src: item.image,
        isDesktop: isDesktop,
        content: (
          <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-10 rounded-3xl mb-4 border border-slate-200/70 dark:border-neutral-700">
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg font-sans max-w-3xl mx-auto mb-6">
              <span className="font-bold text-neutral-800 dark:text-neutral-100">
                {item.title}.
              </span>{" "}
              {item.description}
            </p>
            {isDesktop ? (
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-neutral-700 bg-slate-950">
                <div className="bg-slate-900/95 px-3 py-2 border-b border-white/10 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <div className="ml-2 h-3.5 w-32 bg-white/10 rounded-full" />
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            ) : (
              <div className="max-w-xs mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            )}
          </div>
        ),
      }}
      index={index}
    />
  ));

  return (
    <Modal open={!!project} setOpen={(open) => { if (!open) onClose(); }}>
      <ModalBody className="max-w-4xl sm:max-w-5xl md:max-w-6xl">
        <ModalContent className="space-y-8 font-sans">
          {/* Header Bar */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                {project.category}
              </span>
              {project.metrics && (
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  • {project.metrics}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-sky-600 dark:text-sky-400 font-semibold mt-1.5">
              {project.tagline}
            </p>
          </div>

          {/* Overview Section */}
          <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-neutral-700">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>Project Overview</span>
            </h4>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Apple Cards Carousel for Project Gallery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pl-1">
              <Layers className="w-4 h-4 text-sky-500" />
              <span>Interactive Screenshot Carousel ({galleryItems.length} Screens)</span>
            </h4>
            <div className="w-full -mx-4 sm:mx-0">
              <Carousel items={carouselCards} />
            </div>
          </div>

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Architecture &amp; Core Highlights</span>
              </h4>
              <div className="space-y-2.5 bg-[#F5F5F7] dark:bg-neutral-800 p-5 md:p-6 rounded-3xl border border-slate-200/80 dark:border-neutral-700">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-sky-500" />
              <span>Technologies &amp; Tools</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium border border-slate-200 dark:border-neutral-700 shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ModalContent>

        {/* Modal Footer Actions */}
        <ModalFooter>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:border-sky-500 transition-colors shadow-xs"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <span>Live Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
