import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import { PERSONAL_INFO } from "@/data/portfolioData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hetupatel.vercel.app";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

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
  title: {
    default: "Hetu Patel | Full-Stack Developer & Software Engineer",
    template: "%s | Hetu Patel",
  },
  description:
    "Official portfolio of Hetu Patel — Full-Stack Developer specializing in Next.js, React Native, Node.js, GenAI, and real-time systems. Competitive Programmer with 500+ LeetCode solutions.",
  keywords: [
    "Hetu Patel",
    "Hetu Patel Portfolio",
    "Hetu Patel Developer",
    "Hetu Patel LeetCode",
    "Hetu Patel GitHub",
    "Hetu Patel LinkedIn",
    "Full Stack Developer",
    "Next.js Developer",
    "React Native Developer",
    "Software Engineer Portfolio",
    "PDEU ICT",
    "MERN Stack Developer",
    "Generative AI Developer",
    "Competitive Programming",
  ],
  authors: [{ name: "Hetu Patel", url: SITE_URL }],
  creator: "Hetu Patel",
  publisher: "Hetu Patel",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Hetu Patel | Full-Stack Developer & Software Engineer",
    description:
      "Explore production-ready web apps, mobile applications, GenAI tools, and competitive programming achievements by Hetu Patel.",
    url: SITE_URL,
    siteName: "Hetu Patel Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hetu Patel — Full-Stack Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hetu Patel | Full-Stack Developer & Software Engineer",
    description:
      "Explore production-ready web apps, mobile applications, GenAI tools, and competitive programming achievements by Hetu Patel.",
    images: ["/opengraph-image"],
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION ||
      "JsXXSGRFfnRHcUObEFbd_ZEwBmeEaW8U4OB5F8LqviY",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSONAL_INFO.name,
      alternateName: ["Hetu", "Patel Hetu"],
      url: SITE_URL,
      image: `${SITE_URL}${PERSONAL_INFO.avatarImage}`,
      jobTitle: "Full-Stack Web & Mobile Developer",
      description: PERSONAL_INFO.summary,
      email: `mailto:${PERSONAL_INFO.email}`,
      telephone: PERSONAL_INFO.phoneDisplay,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Pandit Deendayal Energy University (PDEU)",
        sameAs: "https://www.pdeu.ac.in/",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gandhinagar",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      sameAs: [
        PERSONAL_INFO.socials.github,
        PERSONAL_INFO.socials.linkedin,
        PERSONAL_INFO.socials.leetcode,
        PERSONAL_INFO.socials.codechef,
        ...(PERSONAL_INFO.socials.instagram ? [PERSONAL_INFO.socials.instagram] : []),
      ].filter(Boolean),
      knowsAbout: [
        "Full-Stack Web Development",
        "React.js",
        "Next.js",
        "React Native",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "Generative AI",
        "n8n Workflow Automation",
        "Competitive Programming",
        "Data Structures & Algorithms",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Hetu Patel Portfolio",
      description: "Official portfolio of Hetu Patel, Full Stack Developer & Competitive Programmer",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Hetu Patel | Full-Stack Developer Portfolio",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#person`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} light`}
      suppressHydrationWarning
    >
      <head>
        {/* Light is the default. Apply a saved dark choice before first paint so dark-mode visitors never see a light flash (incl. the preloader) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('portfolio-theme')==='dark'){var r=document.documentElement;r.classList.remove('light');r.classList.add('dark');r.style.colorScheme='dark'}}catch(e){}",
          }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 antialiased selection:bg-sky-500 selection:text-white"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsConsent measurementId={GA_MEASUREMENT_ID} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
