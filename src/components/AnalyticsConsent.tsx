"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "portfolio_analytics_consent";

interface AnalyticsConsentProps {
  measurementId?: string;
}

export default function AnalyticsConsent({
  measurementId,
}: AnalyticsConsentProps) {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [mounted, setMounted] = useState(false);

  const gaId =
    measurementId ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    "";

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(CONSENT_KEY) as
        | "granted"
        | "denied"
        | null;
      if (saved) {
        setConsent(saved);
      }
    } catch {
      // Ignore localStorage access restrictions
    }
  }, []);

  const handleChoice = (choice: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Ignore
    }
    setConsent(choice);

    if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag("consent", "update", {
        analytics_storage: choice,
      });
    }
  };

  return (
    <>
      {/* Load Google Analytics only if consent is granted */}
      {gaId && consent === "granted" && (
        <>
          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  send_page_view: true,
                  anonymize_ip: true,
                });
              `,
            }}
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
        </>
      )}

      {/* AttendMetric-styled Bottom Consent Banner */}
      {mounted && consent === null && (
        <div
          role="dialog"
          aria-label="Analytics preferences"
          className="fixed inset-x-0 bottom-0 z-[110] max-h-[60vh] overflow-y-auto border-t border-slate-200 bg-slate-50 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-[#233A57] dark:bg-[#132337] sm:px-6 shadow-2xl backdrop-blur-md transition-all duration-300"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
              <Cookie
                className="mt-0.5 h-5 w-5 shrink-0 text-sky-500 sm:mt-0"
                aria-hidden="true"
              />
              <p className="text-[13px] leading-snug text-slate-600 dark:text-[#92AFD3] sm:text-sm">
                <span className="font-medium text-slate-900 dark:text-[#E2EAF3]">
                  We use Google Analytics to understand how visitors find us.
                </span>{" "}
                It&apos;s optional.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
              <button
                type="button"
                onClick={() => handleChoice("denied")}
                className="h-9 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-[#2D4666] dark:bg-transparent dark:text-[#E2EAF3] dark:hover:bg-[#1C2E45] sm:min-w-[88px] cursor-pointer"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => handleChoice("granted")}
                className="h-9 rounded-lg bg-sky-500 px-4 text-sm font-medium text-white transition-colors hover:bg-sky-600 sm:min-w-[88px] shadow-sm cursor-pointer"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
