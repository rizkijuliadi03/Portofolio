"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/portfolio";
import { ArrowRight, Download, Terminal, ShieldAlert, CheckCircle, Database } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

const TERMINAL_LOGS = [
  { text: "visitor@portfolio:~$ ", type: "prompt", delay: 300 },
  { text: "nmap -sV -sC -T4 rizkijuliadi.dev", type: "command", delay: 800 },
  { text: "Starting Nmap 7.94 ( https://nmap.org ) at 2026-07-20 15:23", type: "info", delay: 400 },
  { text: "Host is up (0.012s latency).", type: "info", delay: 300 },
  { text: "rDNS record for 192.168.1.100 resolved to main.server", type: "info", delay: 300 },
  { text: "PORT    STATE SERVICE  VERSION", type: "header", delay: 400 },
  { text: "80/tcp  open  http     Apache httpd 2.4.41", type: "success", delay: 200 },
  { text: "443/tcp open  ssl/http Apache httpd 2.4.41", type: "success", delay: 200 },
  { text: "CVE-2021-41773: Path Traversal detected on Apache 2.4.41.", type: "warning", delay: 800 },
  { text: "visitor@portfolio:~$ ", type: "prompt", delay: 300 },
  { text: "python3 exploit_agent.py --target web-app", type: "command", delay: 800 },
  { text: "[+] Initializing Multi-Agent collaborative vulnerability assessment...", type: "info", delay: 500 },
  { text: "[+] Agent 1 (Recon): Collecting target metadata.", type: "info", delay: 350 },
  { text: "[+] Agent 2 (Exploitation): Executing safe POC test.", type: "info", delay: 400 },
  { text: "[+] Vulnerability verified. Report generated.", type: "success", delay: 300 },
  { text: "visitor@portfolio:~$ ", type: "prompt", delay: 300 },
  { text: "wazuh-agent --status", type: "command", delay: 600 },
  { text: "Wazuh Agent v4.8.0 is running...", type: "success", delay: 300 },
  { text: "Status: Active | Threats Monitored: 1,421", type: "success", delay: 200 },
  { text: "System State: SECURE", type: "secure", delay: 600 },
];

function TerminalSimulator() {
  const [logs, setLogs] = useState<typeof TERMINAL_LOGS>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= TERMINAL_LOGS.length) {
      const resetTimeout = setTimeout(() => {
        setLogs([]);
        setCurrentIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimeout);
    }

    const timer = setTimeout(() => {
      setLogs((prev) => [...prev, TERMINAL_LOGS[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, TERMINAL_LOGS[currentIndex].delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-lg lg:max-w-xl mx-auto rounded-2xl border border-emerald-500/20 bg-slate-950/80 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.05)] overflow-hidden scanlines scanline-light font-mono text-[11px] sm:text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-emerald-500/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <Database className="w-3.5 h-3.5 text-emerald-500" />
          <span>SOC-Monitor.sh</span>
        </div>
        <div className="w-12 h-1 bg-slate-800 rounded-full" />
      </div>

      {/* Terminal Content */}
      <div 
        ref={containerRef}
        className="p-5 h-[260px] sm:h-[320px] overflow-y-auto space-y-2 text-slate-300 leading-normal scrollbar-none"
      >
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-1">
            {log.type === "prompt" && (
              <span className="text-emerald-500 font-bold shrink-0">{log.text}</span>
            )}
            {log.type === "command" && (
              <span className="text-slate-100 font-semibold">{log.text}</span>
            )}
            {log.type === "info" && (
              <span className="text-slate-400">{log.text}</span>
            )}
            {log.type === "header" && (
              <span className="text-blue-400 font-bold">{log.text}</span>
            )}
            {log.type === "success" && (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 inline text-emerald-500 shrink-0" />
                {log.text}
              </span>
            )}
            {log.type === "warning" && (
              <span className="text-rose-400 flex items-center gap-1.5 font-semibold bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10 w-full">
                <ShieldAlert className="w-3.5 h-3.5 inline text-rose-500 shrink-0" />
                {log.text}
              </span>
            )}
            {log.type === "secure" && (
              <span className="text-emerald-950 bg-emerald-400 px-2 py-0.5 rounded font-bold tracking-widest inline-block animate-pulse">
                {log.text}
              </span>
            )}
          </div>
        ))}
        {currentIndex < TERMINAL_LOGS.length && (
          <span className="inline-block w-1.5 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
        )}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-slate-950">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 60, 0],
            x: [0, -50, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[120px]"
        />
        
        {/* Cyber Grid Pattern */}
        <div className="absolute inset-0 bg-pattern-cyber-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 max-w-3xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 w-fit mx-auto lg:mx-0 px-3.5 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>visitor@portfolio:~$ whoami</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(16,185,129,0.25)]">
                {profileData.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {profileData.headline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href={profileData.resume_file_path}
                download="rizki-juliadi-cv.pdf"
                className={buttonVariants({ size: "lg", className: "w-full sm:w-auto gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] cursor-pointer rounded-xl h-12" })}
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <a
                href="#projects"
                className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto gap-2 border-slate-800 hover:bg-slate-900/50 transition-all duration-300 text-slate-200 cursor-pointer rounded-xl h-12" })}
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Terminal Simulator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <TerminalSimulator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

