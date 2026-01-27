"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";

export default function Projects({ data }: { data: Project[] }) {
    const projects = data;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="py-24 bg-slate-900/20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black font-orbitron text-white mb-4">
                        <span className="text-red-600">MULTIVERSE</span> OF WORK
                    </h2>
                    <p className="text-slate-400">Select a dimension to explore</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            layoutId={`project-${index}`}
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ y: -10 }}
                            className="cursor-pointer group relative h-80 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-red-500/50 transition-colors"
                        >
                            {/* Card Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                                <span className="text-red-500 font-mono text-xs mb-2 tracking-widest uppercase">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold font-orbitron text-white mb-2 group-hover:text-red-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 line-clamp-2 text-sm">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Stack Hints */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {project.tech.slice(0, 2).map(t => (
                                    <span key={t} className="bg-red-900/80 text-white/90 text-xs px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal / Expanded View */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            layoutId={`project-${projects.indexOf(selectedProject)}`}
                            className="bg-slate-900 w-full max-w-2xl rounded-2xl overflow-hidden border border-slate-700 relative shadow-2xl shadow-red-900/20"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-red-600 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <Globe className="text-red-500" />
                                    <span className="text-red-500 font-bold tracking-widest uppercase text-sm">{selectedProject.category}</span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black font-orbitron text-white mb-6">
                                    {selectedProject.title}
                                </h3>

                                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                                    {selectedProject.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-3">Tech Stacks</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="px-3 py-1 bg-slate-800 text-slate-200 rounded border border-slate-700 text-sm font-mono">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <a href={selectedProject.link} className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-colors">
                                        <ExternalLink size={18} /> Experience
                                    </a>
                                    {/* Github Placeholder if available in data */}
                                    <a href="#" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded hover:bg-slate-700 transition-colors">
                                        <Github size={18} /> Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                        <div className="absolute inset-0 -z-10" onClick={() => setSelectedProject(null)} />
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
