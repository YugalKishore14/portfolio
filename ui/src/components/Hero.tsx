"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PersonalData } from "@/lib/types";

export default function Hero({ data }: { data: PersonalData }) {
    const personalData = data;
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen opacity-50" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto px-4 z-10 relative text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-sm">
                        <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            System Online
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-orbitron mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-slate-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                            {personalData.name}
                        </span>
                    </h1>

                    <h2 className="text-lg md:text-2xl text-cyan-500 font-bold uppercase tracking-[0.3em] mb-8 text-shadow-glow">
                        {personalData.role}
                    </h2>

                    <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-12 border-l-2 border-cyan-500/50 pl-6 text-left md:text-center md:border-l-0">
                        {personalData.mission}
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <a
                            href="#projects"
                            className="group relative px-8 py-4 bg-cyan-600 text-white font-bold uppercase tracking-widest overflow-hidden hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_40px_rgba(8,145,178,0.6)]"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                        >
                            <span className="relative z-10">Initialize Protocol</span>
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-white/20 skew-x-12" />
                        </a>

                        <a
                            href="#contact"
                            className="px-8 py-4 border border-slate-700 text-slate-300 font-bold uppercase tracking-widest hover:border-cyan-500 hover:text-cyan-400 transition-colors backdrop-blur-sm bg-slate-900/50"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                        >
                            Contact HQ
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/50 animate-bounce"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
}
