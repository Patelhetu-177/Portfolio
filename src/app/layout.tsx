import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { PERSONAL_INFO } from "@/data/portfolioData";

const SITE_URL = "https://hetupatel.vercel.app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Hetu Patel | Full-Stack Web Developer & Problem Solver",
  description: "Portfolio of Hetu Patel - ICT Engineering graduate of PDEU, Full-Stack Developer (Next.js, React, Node.js, MongoDB, TailwindCSS), and Competitive Programmer with 500+ DSA solutions.",
  keywords: ["Hetu Patel", "Full Stack Developer", "Next.js", "React", "Portfolio", "PDEU", "DSA", "LeetCode", "Vikartr"],
  authors: [{ name: "Hetu Patel", url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Hetu Patel | Full-Stack Web Developer",
    description: "Personal portfolio and showcase of projects, skills, and experience by Hetu Patel.",
    url: SITE_URL,
    siteName: "Hetu Patel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hetu Patel | Full-Stack Web Developer",
    description: "Personal portfolio and showcase of projects, skills, and experience by Hetu Patel.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  jobTitle: "Full Stack Developer",
  url: SITE_URL,
  email: `mailto:${PERSONAL_INFO.email}`,
  sameAs: [
    PERSONAL_INFO.socials.github,
    PERSONAL_INFO.socials.linkedin,
    PERSONAL_INFO.socials.leetcode,
    PERSONAL_INFO.socials.codechef,
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 antialiased selection:bg-sky-500 selection:text-white"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
