"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Cloud, Code, Terminal, Zap } from "lucide-react";
import { Skill } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
    "Languages": <Code className="w-6 h-6" />,
    "Frameworks & Libraries": <Cpu className="w-6 h-6" />,
    "Cloud & DevOps": <Cloud className="w-6 h-6" />,
    "Databases": <Database className="w-6 h-6" />,
    "AI & Blockchain": <Terminal className="w-6 h-6" />,
};

export default function Skills({ data }: { data: Skill[] }) {
    const skills = data;
    return (
        <section id="skills" className="py-24 relative bg-slate-950/50">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4 inline-flex items-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        TECH ARMORY
                    </h2>
                    <p className="text-slate-400 uppercase tracking-widest text-sm">
                        Stark Industries Level Clearance
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative p-6 bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-all rounded-xl backdrop-blur-sm overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors text-slate-300">
                                    {iconMap[skill.category] || <Cpu />}
                                </div>
                                <h3 className="text-xl font-bold font-orbitron text-slate-200 group-hover:text-cyan-300 transition-colors">
                                    {skill.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2 relative z-10">
                                {skill.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 text-xs font-mono text-cyan-500 bg-cyan-950/30 border border-cyan-900/50 rounded-md group-hover:border-cyan-500/30 transition-colors"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
