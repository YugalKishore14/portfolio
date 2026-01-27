
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Cpu, Terminal } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "jarvis";
}

const JarvisChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const speak = (text: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel(); // Stop undefined previous speech
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to find a good voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(
                (voice) =>
                    voice.name.includes("Male") ||
                    voice.name.includes("Google US English") ||
                    voice.name.includes("David")
            );
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.pitch = 0.9; // Slightly lower pitch for autority
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        if (messages.length === 0) {
            const greeting = "Hello Sir which resume data you want ?";
            setMessages([{ id: 0, text: greeting, sender: "jarvis" }]);
            speak(greeting);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: query,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
        setIsLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/chatbot/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: userMessage.text }),
            });

            const data = await response.json();

            if (data.response) {
                const botMessage: Message = {
                    id: Date.now() + 1,
                    text: data.response,
                    sender: "jarvis",
                };
                setMessages((prev) => [...prev, botMessage]);
                speak(data.response);
            } else {
                throw new Error("No response from Jarvis");
            }
        } catch (error) {
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Apologies Sir, I am unable to connect to the mainframe at the moment.",
                sender: "jarvis"
            };
            setMessages((prev) => [...prev, errorMessage]);
            speak("Apologies Sir, I am unable to connect to the mainframe at the moment.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <button
                            onClick={handleOpen}
                            className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 border border-cyan-500/50 rounded-full p-4 shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-md transition-all group"
                        >
                            <Cpu className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-black/90 border border-cyan-500/30 w-full max-w-2xl h-[600px] rounded-lg shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col font-mono relative overflow-hidden"
                        >
                            {/* Scanline effect */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

                            {/* Header */}
                            <div className="flex justify-between items-center p-4 border-b border-cyan-500/20 bg-cyan-950/10 z-20">
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Terminal className="w-5 h-5" />
                                    <span className="font-bold tracking-widest text-sm">J.A.R.V.I.S. TERMINAL</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 z-20">
                                {messages.map((msg) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={msg.id}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-lg border ${msg.sender === "user"
                                                    ? "bg-cyan-900/20 border-cyan-500/30 text-cyan-100"
                                                    : "bg-black border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                                                }`}
                                        >
                                            <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-black border border-cyan-500/50 text-cyan-400 p-3 rounded-lg shadow-[0_0_10px_rgba(34,211,238,0.1)] flex gap-2 items-center">
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></span>
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-500/20 bg-cyan-950/5 z-20">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="ENTER COMMAND..."
                                        className="flex-1 bg-black/50 border border-cyan-500/30 rounded px-4 py-3 text-cyan-100 placeholder-cyan-700/50 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded px-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default JarvisChatbot;
