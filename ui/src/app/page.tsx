import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
