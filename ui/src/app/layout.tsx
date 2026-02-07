import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import JarvisChatbot from "@/components/JarvisChatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Yugal Kishor | Senior Software Engineer",
  description: "Senior Software Engineer Portfolio - AI/ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {children}
        <JarvisChatbot />
      </body>
    </html>
  );
}
