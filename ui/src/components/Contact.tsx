"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, Send } from "lucide-react";
import { PersonalData } from "@/lib/types";
import ServiceForm from "./ServiceForm";

export default function Contact({ data }: { data: PersonalData }) {
    const personalData = data;
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Signal Beam Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent blur-sm" />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block p-4 rounded-full bg-cyan-500/10 mb-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <Send className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-orbitron text-white mb-6 uppercase">
                        ASSEMBLE <span className="text-cyan-500">THE TEAM</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Ready to build the next generation of technology? Send the signal or connect through secure channels.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side: Form */}
                    <div className="order-2 lg:order-1">
                        <ServiceForm />
                    </div>

                    {/* Right Side: Links */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            <a href={`mailto:${personalData.contact.email}`} className="group p-8 bg-slate-900/50 border border-slate-700 hover:border-cyan-500 rounded-2xl transition-all hover:bg-slate-800 flex flex-col items-center gap-4 text-center">
                                <Mail className="w-10 h-10 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                <h3 className="text-2xl font-bold text-white font-orbitron uppercase">Email Comms</h3>
                                <p className="text-slate-400 truncate w-full">{personalData.contact.email}</p>
                            </a>

                            <div className="space-y-4">
                                <a href={personalData.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-slate-900/50 border border-slate-700 hover:border-cyan-500 rounded-xl transition-all group">
                                    <span className="flex items-center gap-4">
                                        <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                                        <span className="font-bold text-white uppercase font-orbitron text-sm tracking-widest">LinkedIn Protocol</span>
                                    </span>
                                    <Send className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 -rotate-45" />
                                </a>

                                <a href={personalData.contact.github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-slate-900/50 border border-slate-700 hover:border-cyan-500 rounded-xl transition-all group">
                                    <span className="flex items-center gap-4">
                                        <Github className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                                        <span className="font-bold text-white uppercase font-orbitron text-sm tracking-widest">GitHub Access</span>
                                    </span>
                                    <Send className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 -rotate-45" />
                                </a>

                                {personalData.contact.resumeUrl && (
                                    <a href={personalData.contact.resumeUrl} download className="flex items-center justify-between p-6 bg-gradient-to-r from-cyan-900/20 to-slate-900/50 border border-cyan-900/50 hover:border-cyan-500 rounded-xl transition-all group">
                                        <span className="flex items-center gap-4">
                                            <FileText className="w-6 h-6 text-cyan-500" />
                                            <span className="font-bold text-cyan-100 uppercase font-orbitron text-sm tracking-widest">Download Dossier</span>
                                        </span>
                                        <Send className="w-4 h-4 text-cyan-500 rotate-90" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Additional Info Box */}
                        <div className="p-8 bg-cyan-950/20 border border-cyan-500/20 rounded-2xl">
                            <h4 className="text-cyan-400 font-orbitron font-bold mb-4 uppercase tracking-widest">Response Protocol</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Nance monitors all incoming transmissions 24/7. Standard response time is within 6-12 hours during active operation cycles. Secure encrypted connection established.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
