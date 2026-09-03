import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoAbout from "@/components/BentoAbout";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-grid-pattern">
      {/* Dynamic Interactive Particle Constellation */}
      <ParticleBackground />

      {/* Glass Header Navigation */}
      <Navbar />

      {/* Main Page Sections */}
      <div className="relative z-10">
        <Hero />
        <BentoAbout />
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
