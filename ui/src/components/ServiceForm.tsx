"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ServiceForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
            // Ensure we don't end with double slash
            const cleanBaseUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;

            const response = await fetch(`${cleanBaseUrl}/service-query/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                // Reset to idle after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-xl relative overflow-hidden group"
        >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                        <Send className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white font-orbitron">MISSION ENQUIRY</h3>
                        <p className="text-xs text-cyan-500/70 font-orbitron tracking-widest">START NEW PROJECT</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-orbitron text-slate-500 uppercase tracking-widest ml-1">Agent Name</label>
                            <input
                                required
                                type="text"
                                placeholder="E.g. Tony Stark"
                                className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 rounded-xl p-4 text-white outline-none transition-all placeholder:text-slate-700"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-orbitron text-slate-500 uppercase tracking-widest ml-1">Secure Email</label>
                            <input
                                required
                                type="email"
                                placeholder="stark@avengers.com"
                                className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 rounded-xl p-4 text-white outline-none transition-all placeholder:text-slate-700"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron text-slate-500 uppercase tracking-widest ml-1">Project Classification</label>
                        <input
                            required
                            type="text"
                            placeholder="AI Integration / Web Platform / Mobile App"
                            className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 rounded-xl p-4 text-white outline-none transition-all placeholder:text-slate-700"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron text-slate-500 uppercase tracking-widest ml-1">Mission Briefing</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Describe your vision for the product..."
                            className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 rounded-xl p-4 text-white outline-none transition-all resize-none placeholder:text-slate-700"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <button
                        disabled={status === "loading"}
                        type="submit"
                        className={`w-full font-orbitron font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn ${status === "success"
                                ? "bg-green-500/20 border border-green-500/50 text-green-400"
                                : status === "error"
                                    ? "bg-red-500/20 border border-red-500/50 text-red-500"
                                    : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                            }`}
                    >
                        {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                        {status === "success" && <CheckCircle2 className="w-5 h-5" />}
                        {status === "error" && <AlertCircle className="w-5 h-5" />}

                        <span className="relative z-10">
                            {status === "success"
                                ? "TRANSMISSION SUCCESSFUL"
                                : status === "loading"
                                    ? "ESTABLISHING UPLINK..."
                                    : status === "error"
                                        ? "TRANSMISSION FAILED"
                                        : "INITIATE TRANSMISSION"}
                        </span>

                        {status === "idle" && (
                            <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        )}
                    </button>

                    {status === "success" && (
                        <p className="text-[10px] text-green-500/80 font-orbitron text-center animate-pulse">
                            A COPY OF THIS BRIEF HAS BEEN SENT TO YOUR INBOX.
                        </p>
                    )}
                </form>
            </div>
        </motion.div>
    );
}
