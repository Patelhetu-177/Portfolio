import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

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
  title: "Hetu Patel | Full-Stack Web Developer & Problem Solver",
  description: "Portfolio of Hetu Patel - ICT Engineering student at PDEU, Full-Stack Developer (Next.js, React, Node.js, MongoDB, TailwindCSS), and Competitive Programmer with 500+ DSA solutions.",
  keywords: ["Hetu Patel", "Full Stack Developer", "Next.js", "React", "Portfolio", "PDEU", "DSA", "LeetCode", "Vikartr", "Cognifyz"],
  authors: [{ name: "Hetu Patel" }],
  openGraph: {
    title: "Hetu Patel | Full-Stack Web Developer",
    description: "Personal portfolio and showcase of projects, skills, and experience by Hetu Patel.",
    type: "website",
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
        className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#060913] text-slate-900 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
