"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Mail,
  Check,
  FileDown,
} from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { Label } from "@/components/ui/label";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GlobeMarker } from "@/components/ui/3d-globe";
import confetti from "canvas-confetti";

// Dynamic import for 3D Globe to avoid SSR hydration mismatches
const Globe3D = dynamic(() => import("@/components/ui/3d-globe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] sm:h-[380px] w-full items-center justify-center rounded-2xl bg-slate-50 dark:bg-[#0c1322]">
      <span className="text-xs font-mono text-slate-400 animate-pulse">
        Initializing 3D Globe...
      </span>
    </div>
  ),
});

const GLOBE_MARKERS: GlobeMarker[] = [
  {
    lat: 23.0225,
    lng: 72.5714,
    src: "/assets/about-pic.jpg",
    label: "Gujarat, India 🇮🇳",
  },
];

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default function Contact() {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        triggerConfetti();
        setFormState({ firstname: "", lastname: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please reach out directly via email.");
        setTimeout(() => setStatus("idle"), 6000);
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setErrorMessage("Network error. Please email me directly at " + PERSONAL_INFO.email);
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Column: Clean Contact Overview & 3D Globe ───────────── */}
          <div className="lg:col-span-6 space-y-5">
            {/* Top Mail Icon Badge */}
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-sky-500">
              <Mail className="w-4 h-4" />
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Get In Touch
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                Have an engineering opportunity, full-stack or mobile project, or looking to collaborate? Feel free to reach out.
              </p>
            </div>

            {/* Horizontal Links with Dot Separators */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-sky-500 transition-colors text-slate-800 dark:text-slate-300 font-mono text-xs"
              >
                {PERSONAL_INFO.email}
              </a>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="hover:text-sky-500 transition-colors text-slate-800 dark:text-slate-300 font-mono text-xs"
              >
                {PERSONAL_INFO.phoneDisplay}
              </a>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-slate-700 dark:text-slate-400 text-xs">
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Resume & Social Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-gray-50 dark:bg-zinc-900 text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-sky-500 transition-colors overflow-hidden"
              >
                <FileDown className="w-3.5 h-3.5 text-sky-500" />
                <span>Resume PDF</span>
                <BottomGradient />
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-gray-50 dark:bg-zinc-900 text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-sky-500 transition-colors overflow-hidden"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <BottomGradient />
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-gray-50 dark:bg-zinc-900 text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-[#0077b5] transition-colors overflow-hidden"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                <span>LinkedIn</span>
                <BottomGradient />
              </a>
            </div>

            {/* 3D Interactive Globe */}
            <div className="pt-2 relative">
              <Globe3D
                markers={GLOBE_MARKERS}
                config={{
                  radius: 2,
                  atmosphereColor: "#4da6ff",
                  atmosphereIntensity: 0.5,
                  bumpScale: 2.5,
                  autoRotateSpeed: 0.35,
                  showAtmosphere: true,
                }}
              />
            </div>
          </div>

          {/* ── Right Column: Aceternity Clean Form ──────────────────────── */}
          <div className="lg:col-span-6">
            <div className="w-full rounded-2xl bg-white p-5 sm:p-8 dark:bg-black border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Send a Message
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Fill out the form below and I&apos;ll get back to you promptly.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      placeholder="Alex"
                      type="text"
                      required
                      value={formState.firstname}
                      onChange={(e) =>
                        setFormState({ ...formState, firstname: e.target.value })
                      }
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastname"
                      placeholder="Johnson"
                      type="text"
                      value={formState.lastname}
                      onChange={(e) =>
                        setFormState({ ...formState, lastname: e.target.value })
                      }
                    />
                  </LabelInputContainer>
                </div>

                <LabelInputContainer>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="alex@company.com"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="subject">Subject / Project</Label>
                  <Input
                    id="subject"
                    placeholder="Full-Stack Role, Project or Collaboration"
                    type="text"
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project, opportunity, or idea..."
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                  />
                </LabelInputContainer>

                <button
                  className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] transition-colors disabled:opacity-50 text-sm"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <span>Sending message...</span>
                  ) : status === "success" ? (
                    <span className="flex items-center justify-center gap-1.5 text-emerald-400">
                      <Check className="w-4 h-4" /> Message Sent!
                    </span>
                  ) : status === "error" ? (
                    <span className="text-rose-400">Try Again</span>
                  ) : (
                    <span>Send Message &rarr;</span>
                  )}
                  <BottomGradient />
                </button>

                {status === "error" && errorMessage && (
                  <p className="text-xs text-rose-500 dark:text-rose-400 text-center animate-fade-in mt-2">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
