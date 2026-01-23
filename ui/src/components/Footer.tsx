"use client";
import React from "react";

export default function Footer() {
    return (
        <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center relative z-10">
            <div className="container mx-auto px-4">
                <p className="text-slate-500 font-mono text-sm">
                    &copy; {new Date().getFullYear()} Aniket Verma. All Systems Operational.
                </p>
                <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest">
                    Designed with Avengers Initiative Protocol
                </p>
            </div>
        </footer>
    );
}
