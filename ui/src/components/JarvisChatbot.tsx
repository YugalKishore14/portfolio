"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Cpu, Terminal, Volume2, VolumeX } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "jarvis";
    isStreaming?: boolean;
}

const JarvisChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && !socketRef.current) {
            // Initialize WebSocket connection
            const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws/chat/";
            const ws = new WebSocket(wsUrl);
            socketRef.current = ws;

            ws.onopen = () => {
                console.log("Connected to Jarvis Terminal");
            };


            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === 'start') {
                    setIsLoading(false);
                    const botMessage: Message = {
                        id: Date.now(),
                        text: "",
                        sender: "jarvis",
                        isStreaming: true
                    };
                    setMessages((prev) => [...prev, botMessage]);
                } else if (data.type === 'chunk') {
                    setMessages((prev) => {
                        const lastMsgIndex = prev.length - 1;
                        if (lastMsgIndex >= 0 && prev[lastMsgIndex].sender === 'jarvis') {
                            const updatedMsg = {
                                ...prev[lastMsgIndex],
                                text: prev[lastMsgIndex].text + data.content
                            };
                            return [...prev.slice(0, lastMsgIndex), updatedMsg];
                        }
                        return prev;
                    });
                } else if (data.type === 'end') {
                    setMessages((prev) => {
                        const lastMsgIndex = prev.length - 1;
                        if (lastMsgIndex >= 0) {
                            const updatedMsg = { ...prev[lastMsgIndex], isStreaming: false };
                            const newMessages = [...prev.slice(0, lastMsgIndex), updatedMsg];

                            // Speak only after full message is received
                            if (updatedMsg.sender === 'jarvis') {
                                speak(updatedMsg.text);
                            }
                            return newMessages;
                        }
                        return prev;
                    });
                } else if (data.type === 'error' || data.error) {
                    console.error("Jarvis Error:", data.error);
                    const errorMessage: Message = {
                        id: Date.now(),
                        text: "Error processing request.",
                        sender: "jarvis",
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                    speak("Error processing request.");
                    setIsLoading(false);
                } else if (data.message) {
                    // Fallback for non-streaming messages
                    const botMessage: Message = {
                        id: Date.now(),
                        text: data.message,
                        sender: "jarvis",
                    };
                    setMessages((prev) => [...prev, botMessage]);
                    speak(data.message);
                    setIsLoading(false);
                }
            };


            ws.onerror = (error) => {
                console.error("WebSocket Error:", error);
                const errorMessage: Message = {
                    id: Date.now(),
                    text: "Connection interrupted. Re-establishing uplink...",
                    sender: "jarvis",
                };
                setMessages((prev) => [...prev, errorMessage]);
                speak("Connection interrupted.");
                setIsLoading(false);
            };

            ws.onclose = () => {
                console.log("Disconnected from Jarvis Terminal");
                socketRef.current = null;
            };
        }

        return () => {
            if (!isOpen && socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [isOpen]);


    const speak = (text: string) => {
        if (isMuted) return;

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();

            // Clean markdown formatting before speaking
            const cleanText = text.replace(/[*#`_]/g, '');

            const utterance = new SpeechSynthesisUtterance(cleanText);
            const voices = window.speechSynthesis.getVoices();

            // Prioritize male voices
            const preferredVoice = voices.find(
                (voice) =>
                    voice.name.includes("Male") ||
                    voice.name.includes("David") ||
                    voice.name.includes("Daniel") ||
                    voice.name.includes("Google US English")
            );
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.pitch = 0.8; // Deepen voice slightly
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleMute = () => {
        if (!isMuted) {
            // If we are muting, stop any current speech
            window.speechSynthesis.cancel();
        }
        setIsMuted(!isMuted);
    };



    const [showTooltip, setShowTooltip] = useState(true);
    const [tooltipText, setTooltipText] = useState("");
    const fullTooltipText = "Need info? I'm Nance Agent, Click to chat!";

    useEffect(() => {
        if (showTooltip) {
            let i = 0;
            const interval = setInterval(() => {
                setTooltipText(fullTooltipText.slice(0, i + 1));
                i++;
                if (i > fullTooltipText.length) {
                    clearInterval(interval);
                    // Hide tooltip after a delay (e.g., 10 seconds after typing finishes)
                    setTimeout(() => setShowTooltip(false), 10000);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
        setShowTooltip(false);
        if (messages.length === 0) {
            const greeting = "Nance is online. I'm MR.Verma's personal assistant. How may I assist you, Sir?";
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

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ message: userMessage.text }));
        } else {
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Uplink offline. Unable to transmit.",
                sender: "jarvis"
            };
            setMessages((prev) => [...prev, errorMessage]);
            speak("Uplink offline.");
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button - Always present container for proper fixed positioning */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-2">
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="relative bg-black/80 border border-cyan-500/50 text-cyan-400 px-3 py-2 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)] mb-2 max-w-[180px] md:max-w-[200px]"
                            >
                                <p className="text-xs md:text-sm font-mono typing-cursor">{tooltipText}</p>
                                {/* Arrow pointing down-right */}
                                <div className="absolute -bottom-2 right-4 w-3 h-3 md:w-4 md:h-4 bg-black/80 border-r border-b border-cyan-500/50 transform rotate-45"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={handleOpen}
                        className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 border border-cyan-500/50 rounded-full p-3 md:p-4 shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-md transition-all group"
                    >
                        <Cpu className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-180 transition-transform duration-700" />
                    </motion.button>
                </div>
            )}

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
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={toggleMute}
                                        className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
                                        title={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
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
                                            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                                {msg.text}
                                                {msg.isStreaming && (
                                                    <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
                                                )}
                                            </p>
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
