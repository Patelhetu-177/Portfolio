"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Mail,
  Send,
  Copy,
  Check,
  Sparkles,
  Flame,
  Code2,
  MapPin,
  Phone,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import confetti from "canvas-confetti";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    triggerConfetti();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    triggerConfetti();
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      triggerConfetti();
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Have a project, full-time opportunity, or want to discuss full-stack &amp; GenAI development? Reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email & Phone Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md space-y-4">
              {/* Email Block */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    Direct Email
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Active
                  </span>
                </div>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white hover:text-sky-500 transition-colors block break-all mb-2"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-xs hover:border-sky-500 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Email Copied! 🎉</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-sky-500" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Block */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    Phone / WhatsApp
                  </span>
                </div>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-base font-mono font-bold text-slate-900 dark:text-white hover:text-sky-500 transition-colors block mb-2"
                >
                  {PERSONAL_INFO.phoneDisplay}
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-xs hover:border-sky-500 transition-colors"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Phone Copied! 🎉</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-sky-500" />
                      <span>Copy Phone Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Details */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Location</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <MessageSquare className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Availability</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Full-Time Roles &amp; High-Impact Work</div>
                </div>
              </div>
            </div>

            {/* Social Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md flex items-center gap-3 hover:border-[#0077b5] hover:text-[#0077b5] transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-[#0077b5]" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0077b5]">LinkedIn</div>
                  <div className="text-[10px] text-slate-500">Connect &rarr;</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md flex items-center gap-3 hover:border-sky-500 hover:text-sky-500 transition-colors group"
              >
                <Github className="w-5 h-5 text-slate-900 dark:text-white group-hover:text-sky-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-500">GitHub</div>
                  <div className="text-[10px] text-slate-500">Repos &rarr;</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md flex items-center gap-3 hover:border-amber-500 hover:text-amber-500 transition-colors group"
              >
                <Flame className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500">LeetCode</div>
                  <div className="text-[10px] text-slate-500">1572 Rating &rarr;</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.socials.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md flex items-center gap-3 hover:border-amber-700 hover:text-amber-700 transition-colors group"
              >
                <Code2 className="w-5 h-5 text-amber-700" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-700">CodeChef</div>
                  <div className="text-[10px] text-slate-500">3★ (1653) &rarr;</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
              Fill out the form below and I&apos;ll get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-sky-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. john@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. Full-Stack / Mobile Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-sky-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-bold text-sm transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span>Sending Message...</span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Message Sent Successfully! 🎉
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
