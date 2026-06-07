"use client";

import { motion } from "framer-motion";
import { profileData, skillsData } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Shield, Server, Code2, Users } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

const iconMap: Record<string, any> = {
  Shield,
  Server,
  Code2,
  Users
};

type ThemeKey = "blue" | "emerald" | "purple" | "orange";

const themeMap: Record<ThemeKey, { cardGlow: string, cardGradientHover: string, cardGradient: string, iconWrapper: string, iconText: string, badgeBg: string, badgeText: string, badgeBorder: string, badgeHover: string }> = {
  blue: {
    cardGlow: "bg-blue-500/5",
    cardGradientHover: "hover:from-blue-500/50",
    cardGradient: "from-blue-500/20 to-transparent",
    iconWrapper: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    iconText: "text-blue-500",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/20",
    badgeHover: "hover:bg-blue-500/20"
  },
  emerald: {
    cardGlow: "bg-emerald-500/5",
    cardGradientHover: "hover:from-emerald-500/50",
    cardGradient: "from-emerald-500/20 to-transparent",
    iconWrapper: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
    iconText: "text-emerald-500",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/20",
    badgeHover: "hover:bg-emerald-500/20"
  },
  purple: {
    cardGlow: "bg-purple-500/5",
    cardGradientHover: "hover:from-purple-500/50",
    cardGradient: "from-purple-500/20 to-transparent",
    iconWrapper: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    iconText: "text-purple-500",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
    badgeBorder: "border-purple-500/20",
    badgeHover: "hover:bg-purple-500/20"
  },
  orange: {
    cardGlow: "bg-orange-500/5",
    cardGradientHover: "hover:from-orange-500/50",
    cardGradient: "from-orange-500/20 to-transparent",
    iconWrapper: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    iconText: "text-orange-500",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400",
    badgeBorder: "border-orange-500/20",
    badgeHover: "hover:bg-orange-500/20"
  }
};

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

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
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
        />
        
        {/* Subtle dot pattern grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-24"
        >
          {/* About Text - Editorial Style */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className={`text-sm font-medium tracking-widest uppercase ${inter.className}`}>Introduction</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants} 
              className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 ${spaceGrotesk.className}`}
            >
              Who Am I?
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className={`text-lg text-muted-foreground leading-relaxed ${inter.className}`}
            >
              {profileData.about}
            </motion.p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {skillsData.map((skillGroup) => {
              const theme = themeMap[skillGroup.theme as ThemeKey];
              const IconComponent = iconMap[skillGroup.icon] || Shield;

              return (
                <motion.div 
                  key={skillGroup.id}
                  variants={itemVariants} 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative group p-[1px] rounded-3xl bg-gradient-to-b ${theme.cardGradient} ${theme.cardGradientHover} transition-all duration-500`}
                >
                  <div className={`absolute inset-0 ${theme.cardGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="h-full space-y-6 p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/50">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.iconWrapper} border flex items-center justify-center ${theme.iconText} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className={`text-2xl font-bold ${spaceGrotesk.className}`}>{skillGroup.title}</h3>
                    
                    <div className="space-y-6">
                      {skillGroup.groups.map((group, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className={`text-sm font-semibold tracking-wider text-muted-foreground uppercase ${inter.className}`}>
                            {group.label}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {group.items.map((item, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className={`${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} ${theme.badgeHover} ${inter.className}`}
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
