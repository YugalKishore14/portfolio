"use client";
import React from "react";
import { motion } from "framer-motion";
import { achievements } from "@/lib/data";

export default function Achievements() {
    return (
        <section id="achievements" className="py-24 bg-gradient-to-b from-transparent to-green-900/10">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-black font-orbitron text-center text-white mb-16">
                    <span className="text-green-500">HULK</span> SMASH STATS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", bounce: 0.5, delay: index * 0.2 }}
                            className="text-center p-8 border border-green-900/30 bg-green-950/10 rounded-2xl backdrop-blur-sm hover:border-green-500/50 transition-colors"
                        >
                            <div className="text-6xl md:text-7xl font-black text-green-500 font-orbitron mb-2">
                                {item.metric}
                            </div>
                            <div className="text-xl font-bold text-white uppercase tracking-widest mb-4">
                                {item.label}
                            </div>
                            <p className="text-slate-400">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
