import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getPersonalData, getSkills, getExperience, getProjects, getAchievements } from "@/lib/api";

export default async function Home() {
  const personalData = await getPersonalData();
  const skills = await getSkills();
  const experience = await getExperience();
  const projects = await getProjects();
  const achievements = await getAchievements();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      <Navbar />
      <Hero data={personalData} />
      <Skills data={skills} />
      <Experience data={experience} />
      <Projects data={projects} />
      <Achievements data={achievements} />
      <About data={personalData} />
      <Contact data={personalData} />
      <Footer />
    </main>
  );
}
