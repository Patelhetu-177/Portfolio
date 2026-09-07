"use client";

import React from "react";
import { Project } from "@/data/portfolioData";
import { ExternalLink, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { Github } from "@/components/Icons";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/components/ui/animated-modal";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal open={!!project} setOpen={(open) => { if (!open) onClose(); }}>
      <ModalBody className="max-w-3xl sm:max-w-4xl">
        <ModalContent className="space-y-6">
          {/* Header Bar */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-sky-600 dark:text-sky-400 font-semibold mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Full Image Showcase — Perfectly Fits Portrait Mobile & Landscape Desktop */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900/60 dark:bg-[#070c16] flex items-center justify-center p-3 sm:p-5 shadow-xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-auto h-auto max-h-[460px] sm:max-h-[520px] max-w-full object-contain rounded-xl block mx-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>

          {/* Overview Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Project Overview</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Key Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                <span>Architecture &amp; Core Highlights</span>
              </h4>
              <div className="space-y-2 bg-slate-50 dark:bg-[#132337]/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Technologies &amp; Tools
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#152338] text-slate-700 dark:text-slate-300 text-xs font-mono font-medium border border-slate-200 dark:border-slate-700/60"
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
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a2638] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:border-sky-500 transition-colors shadow-xs"
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
