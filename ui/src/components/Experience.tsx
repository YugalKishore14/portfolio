"use client";
import React from "react";
import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import { Experience as ExperienceType } from "@/lib/types";

export default function Experience({ data }: { data: ExperienceType[] }) {
    const experience = data;
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex items-center gap-4"
                >
                    <Hammer className="w-10 h-10 text-red-500" />
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black font-orbitron text-white">
                            HEROIC JOURNEY
                        </h2>
                        <p className="text-red-500 uppercase tracking-widest text-sm font-bold">
                            Battle History & Conquests
                        </p>
                    </div>
                </motion.div>

                <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12">
                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Timeline Node */}
                            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-white group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

                            <div className="flex flex-col md:flex-row gap-2 md:items-baseline mb-2">
                                <h3 className="text-2xl font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">
                                    {job.role}
                                </h3>
                                <span className="text-slate-500 font-mono text-sm">@ {job.company}</span>
                                <span className="md:ml-auto text-cyan-500 text-sm font-bold uppercase tracking-wider bg-cyan-950/30 px-3 py-1 rounded">
                                    {job.period}
                                </span>
                            </div>

                            <p className="text-slate-400 mb-4 max-w-3xl leading-relaxed">
                                {job.description}
                            </p>

                            <ul className="space-y-2">
                                {job.achievements.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
