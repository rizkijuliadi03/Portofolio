"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/portfolio";
import { Briefcase, ShieldAlert, Cpu, Terminal, Network, ShieldCheck } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

type ColorKey = "blue" | "green" | "purple" | "orange" | "red";

const colorMap: Record<ColorKey, { 
  text: string; 
  bg: string; 
  border: string; 
  dot: string; 
  shadow: string;
  glow: string;
}> = {
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20 hover:border-blue-500/50", dot: "bg-blue-400", shadow: "hover:shadow-blue-500/5", glow: "from-blue-500/10 to-transparent" },
  green: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20 hover:border-emerald-500/50", dot: "bg-emerald-400", shadow: "hover:shadow-emerald-500/5", glow: "from-emerald-500/10 to-transparent" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20 hover:border-purple-500/50", dot: "bg-purple-400", shadow: "hover:shadow-purple-500/5", glow: "from-purple-500/10 to-transparent" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20 hover:border-orange-500/50", dot: "bg-orange-400", shadow: "hover:shadow-orange-500/5", glow: "from-orange-500/10 to-transparent" },
  red: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20 hover:border-rose-500/50", dot: "bg-rose-400", shadow: "hover:shadow-rose-500/5", glow: "from-rose-500/10 to-transparent" },
};

const iconMap: Record<number, any> = {
  0: Network,
  1: Cpu,
  2: ShieldAlert,
  3: Terminal,
  4: ShieldCheck
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-slate-950">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-550/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-550/5 rounded-full blur-[120px]"
        />
        
        {/* Subtle dot pattern grid */}
        <div className="absolute inset-0 opacity-[0.02] bg-pattern-dot-grid" />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
            <Network className="w-3.5 h-3.5" />
            <span className={`text-xs font-semibold tracking-widest uppercase ${inter.className}`}>Timeline</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-100 ${spaceGrotesk.className}`}>
            Experience Journey
          </h2>
          <p className={`text-lg text-slate-400 ${inter.className}`}>My professional growth and key milestones in Cybersecurity & IT.</p>
        </motion.div>

        {/* Timeline Path */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/40 before:via-slate-800 before:to-transparent">
          {experienceData.map((exp, index) => {
            const theme = colorMap[exp.color as ColorKey] || colorMap.blue;
            const IconComponent = iconMap[index] || Briefcase;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Timeline Node Icon (Cyber Alert Style) */}
                <div className={`absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-900 ${theme.bg} ${theme.text} shrink-0 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                  <IconComponent className="w-4 h-4" />
                  <span className={`absolute inset-0 rounded-full ${theme.dot} opacity-20 animate-ping`} />
                </div>

                {/* Card Container */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 p-[1px] rounded-2xl bg-gradient-to-b from-slate-800 to-transparent hover:from-slate-700 transition-all duration-300 relative`}
                >
                  <div className={`rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-slate-900/60 p-6 sm:p-8 hover:shadow-2xl ${theme.shadow} ${theme.border} transition-all duration-500 relative overflow-hidden`}>
                    
                    {/* Glowing Mesh Corner Inside Card */}
                    <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${theme.glow} rounded-bl-[100px] -z-10 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                    
                    <div className="mb-4">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.text} px-3 py-1 rounded-full ${theme.bg} border border-white/5`}>
                        {exp.period}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl sm:text-2xl font-bold text-slate-100 mb-1 leading-snug ${spaceGrotesk.className}`}>{exp.role}</h3>
                    <div className={`text-sm font-semibold ${theme.text} mb-6 uppercase tracking-wider ${inter.className}`}>{exp.company}</div>
                    
                    <ul className="space-y-3.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className={`text-sm text-slate-400 relative pl-5 leading-relaxed ${inter.className}`}>
                          <span className={`absolute left-0 top-2 w-1.5 h-1.5 rounded-full ${theme.dot} opacity-70`} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
