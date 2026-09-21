import ParticleBackground from "@/components/ParticleBackground";
import GrainOverlay from "@/components/GrainOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoAbout from "@/components/BentoAbout";
import LiveStats from "@/components/LiveStats";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" suppressHydrationWarning>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Dynamic Interactive Background Boxes */}
      <ParticleBackground />

      {/* Subtle Film Grain Texture */}
      <GrainOverlay />

      {/* Glass Header Navigation */}
      <Navbar />

      {/* Cmd/Ctrl+K Command Palette */}
      <CommandPalette />

      {/* Hidden Konami-code easter egg */}
      <KonamiEasterEgg />

      {/* Main Page Sections */}
      <div className="relative z-10">
        <Hero />
        <BentoAbout />
        <LiveStats />
        <Skills />
        <Experience />
        <Projects />
        <Terminal />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
