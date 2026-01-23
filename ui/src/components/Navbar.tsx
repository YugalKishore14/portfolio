"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "Mission", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Impact", href: "#achievements" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-2 shadow-lg shadow-cyan-900/10" : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="#hero" className="flex items-center gap-2 group">
                    <div className="relative">
                        <Shield className="w-8 h-8 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
                        <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-400/30 transition-all" />
                    </div>
                    <span className="font-orbitron font-bold text-xl tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                        AV<span className="text-cyan-500">.hq</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-wider text-xs rounded hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                    >
                        initiate_comms
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-200 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="w-8 h-8" />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-white"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-orbitron font-bold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
