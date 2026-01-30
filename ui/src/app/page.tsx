'use client';

import { useEffect, useState } from 'react';
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
import type { PersonalData, Skill, Experience as ExperienceType, Project, Achievement } from "@/lib/types";

export default function Home() {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [personalDataRes, skillsRes, experienceRes, projectsRes, achievementsRes] = await Promise.all([
          getPersonalData(),
          getSkills(),
          getExperience(),
          getProjects(),
          getAchievements(),
        ]);

        setPersonalData(personalDataRes);
        setSkills(skillsRes);
        setExperience(experienceRes);
        setProjects(projectsRes);
        setAchievements(achievementsRes);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent mb-4"></div>
          <p className="text-lg">Loading portfolio...</p>
        </div>
      </main>
    );
  }

  if (error || !personalData) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Portfolio</h1>
          <p className="text-slate-400">{error || 'Failed to load data'}</p>
        </div>
      </main>
    );
  }

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
