"use client";
import React from "react";
import { motion } from "framer-motion";
import { personalData } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-blue-900/20 rounded-full border border-blue-500/50">
                                <ShieldCheck className="w-12 h-12 text-blue-500" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black font-orbitron text-white">
                                THE <span className="text-blue-500">MISSION</span>
                            </h2>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-200 mb-6 font-orbitron">
                            {personalData.about.title}
                        </h3>

                        <div className="space-y-4 text-slate-400 text-lg leading-relaxed mb-8">
                            {personalData.about.description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {personalData.about.values.map((value, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-lg">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="font-bold text-slate-300 uppercase tracking-wider text-sm">{value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Cinematic Visual - Shield/Circle concept */}
                <div className="flex-1 flex justify-center relative">
                    <div className="relative w-80 h-80 md:w-96 md:h-96">
                        <div className="absolute inset-0 border-4 border-blue-900/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 border-2 border-dashed border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 opacity-20 blur-xl" />
                            <ShieldCheck className="w-32 h-32 text-blue-500/50 absolute" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
