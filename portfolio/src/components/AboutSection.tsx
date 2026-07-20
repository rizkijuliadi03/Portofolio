"use client";

import { motion, AnimatePresence } from "framer-motion";
import { profileData, skillsData } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Shield, Server, Code2, Users, ArrowRight } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

const iconMap: Record<string, any> = {
  Shield,
  Server,
  Code2,
  Users
};

type ThemeKey = "blue" | "emerald" | "purple" | "orange";

const themeMap: Record<ThemeKey, { 
  cardGlow: string, 
  cardGradient: string, 
  iconWrapper: string, 
  iconText: string, 
  badgeBg: string, 
  badgeText: string, 
  badgeBorder: string,
  tabBorder: string,
  tabBgActive: string,
  tabTextActive: string
}> = {
  blue: {
    cardGlow: "cyber-glow-blue",
    cardGradient: "from-blue-500/15 via-blue-500/5 to-transparent",
    iconWrapper: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    iconText: "text-blue-400",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-300",
    badgeBorder: "border-blue-500/20",
    tabBorder: "border-blue-500/40",
    tabBgActive: "bg-blue-500/10",
    tabTextActive: "text-blue-400"
  },
  emerald: {
    cardGlow: "cyber-glow-emerald",
    cardGradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    iconWrapper: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
    iconText: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-500/20",
    tabBorder: "border-emerald-500/40",
    tabBgActive: "bg-emerald-500/10",
    tabTextActive: "text-emerald-400"
  },
  purple: {
    cardGlow: "cyber-glow-purple",
    cardGradient: "from-purple-500/15 via-purple-500/5 to-transparent",
    iconWrapper: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    iconText: "text-purple-400",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-300",
    badgeBorder: "border-purple-500/20",
    tabBorder: "border-purple-500/40",
    tabBgActive: "bg-purple-500/10",
    tabTextActive: "text-purple-400"
  },
  orange: {
    cardGlow: "cyber-glow-orange",
    cardGradient: "from-orange-500/15 via-orange-500/5 to-transparent",
    iconWrapper: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    iconText: "text-orange-400",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-300",
    badgeBorder: "border-orange-500/20",
    tabBorder: "border-orange-500/40",
    tabBgActive: "bg-orange-500/10",
    tabTextActive: "text-orange-400"
  }
};

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(skillsData[0].id);

  const activeSkill = skillsData.find(s => s.id === activeTab) || skillsData[0];
  const theme = themeMap[activeSkill.theme as ThemeKey] || themeMap.blue;
  const ActiveIcon = iconMap[activeSkill.icon] || Shield;

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-slate-950">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"
        />
        
        {/* Subtle dot pattern grid */}
        <div className="absolute inset-0 opacity-[0.02] bg-pattern-dot-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* About Text - Editorial Style */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-xs font-semibold tracking-widest uppercase ${inter.className}`}>Introduction</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 ${spaceGrotesk.className}`}
            >
              Who Am I?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`text-base sm:text-lg text-slate-400 leading-relaxed ${inter.className}`}
            >
              {profileData.about}
            </motion.p>
          </div>

          {/* Interactive Skill Tabs Section */}
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Tabs Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {skillsData.map((skillGroup) => {
                const isSelected = skillGroup.id === activeTab;
                const groupTheme = themeMap[skillGroup.theme as ThemeKey] || themeMap.blue;
                const GroupIcon = iconMap[skillGroup.icon] || Shield;

                return (
                  <button
                    key={skillGroup.id}
                    onClick={() => setActiveTab(skillGroup.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? `${groupTheme.tabBgActive} ${groupTheme.tabTextActive} ${groupTheme.tabBorder} shadow-[0_0_20px_rgba(16,185,129,0.05)]`
                        : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <GroupIcon className={`w-4 h-4 ${isSelected ? groupTheme.iconText : "text-slate-400"}`} />
                    <span>{skillGroup.title.split(" & ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panel Content */}
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-slate-800 to-transparent">
              <div className="rounded-3xl bg-slate-950/60 backdrop-blur-xl border border-slate-900 p-8 md:p-12 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                {/* Visual Ambient Glow */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${theme.cardGradient} rounded-full blur-3xl -z-10 opacity-30`} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.iconWrapper} border flex items-center justify-center ${theme.iconText} shadow-lg shadow-black/20`}>
                        <ActiveIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className={`text-2xl sm:text-3xl font-extrabold ${spaceGrotesk.className}`}>{activeSkill.title}</h3>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 pt-4">
                      {activeSkill.groups.map((group, idx) => (
                        <div key={idx} className="space-y-4 bg-slate-900/20 p-6 rounded-2xl border border-slate-900/60">
                          <h4 className={`text-xs font-bold tracking-widest text-slate-500 uppercase flex items-center gap-1.5 ${inter.className}`}>
                            <ArrowRight className={`w-3.5 h-3.5 ${theme.iconText}`} />
                            {group.label}
                          </h4>
                          <div className="flex flex-wrap gap-2.5">
                            {group.items.map((item, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className={`${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} hover:bg-slate-900 transition-all font-semibold tracking-wide py-1 px-3 text-[12px] rounded-lg ${inter.className}`}
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
