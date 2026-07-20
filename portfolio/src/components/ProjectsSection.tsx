"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Terminal, Shield, FolderGit2 } from "lucide-react";
import { FaYoutube, FaGithub } from "react-icons/fa";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

type ThemeKey = "blue" | "emerald" | "purple" | "orange";

const themeMap: Record<ThemeKey, { 
  cardGlow: string, 
  cardGradient: string, 
  badgeBg: string, 
  badgeText: string, 
  badgeBorder: string, 
  linkText: string, 
  linkHover: string 
}> = {
  blue: {
    cardGlow: "cyber-glow-blue",
    cardGradient: "from-blue-500/15 via-blue-550/5 to-transparent",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-300",
    badgeBorder: "border-blue-500/20",
    linkText: "text-blue-400",
    linkHover: "hover:text-blue-300"
  },
  emerald: {
    cardGlow: "cyber-glow-emerald",
    cardGradient: "from-emerald-500/15 via-emerald-555/5 to-transparent",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-500/20",
    linkText: "text-emerald-400",
    linkHover: "hover:text-emerald-300"
  },
  purple: {
    cardGlow: "cyber-glow-purple",
    cardGradient: "from-purple-500/15 via-purple-555/5 to-transparent",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-300",
    badgeBorder: "border-purple-500/20",
    linkText: "text-purple-400",
    linkHover: "hover:text-purple-300"
  },
  orange: {
    cardGlow: "cyber-glow-orange",
    cardGradient: "from-orange-500/15 via-orange-555/5 to-transparent",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-300",
    badgeBorder: "border-orange-500/20",
    linkText: "text-orange-400",
    linkHover: "hover:text-orange-300"
  }
};

export default function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } }
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-slate-950">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]"
        />
        
        {/* Subtle dot pattern grid */}
        <div className="absolute inset-0 opacity-[0.02] bg-pattern-dot-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <motion.div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span className={`text-xs font-semibold tracking-widest uppercase ${inter.className}`}>Portofolio</span>
          </motion.div>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-100 ${spaceGrotesk.className}`}>
            Projects & Publications
          </h2>
          <p className={`text-lg text-slate-400 max-w-2xl mx-auto ${inter.className}`}>
            A showcase of my recent work, research, and technical initiatives in AI and Security.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project, index) => {
            const theme = themeMap[project.theme as ThemeKey] || themeMap.blue;

            // Bento Grid configuration: 
            // Item 1: Wide (2 cols)
            // Item 2: Square (1 col)
            // Item 3: Square (1 col)
            // Item 4: Wide (2 cols)
            const isWide = index % 4 === 0 || index % 4 === 3;
            const bentoClass = isWide ? "lg:col-span-2" : "lg:col-span-1";

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`relative group p-[1px] rounded-3xl bg-gradient-to-b from-slate-800 to-transparent hover:from-slate-700 transition-all duration-500 h-full ${bentoClass}`}
              >
                {/* Glow Backdrop */}
                <div className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${theme.cardGlow}`} />
                
                {/* Premium Card Inner */}
                <div className="h-full flex flex-col justify-between bg-slate-950/60 backdrop-blur-xl border border-slate-900/60 rounded-3xl overflow-hidden p-6 sm:p-8 relative">
                  
                  {/* Subtle Grid overlay on hover */}
                  <div className="absolute inset-0 bg-pattern-cyber-grid opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none" />
                  
                  {/* Glowing Corner */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.cardGradient} rounded-bl-[100px] -z-10 blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  
                  {/* Top content */}
                  <div className="space-y-4">
                    <div>
                      <Badge variant="outline" className={`${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} font-mono text-[10px] tracking-wide uppercase px-2.5 py-0.5 rounded-md ${inter.className}`}>
                        {project.type}
                      </Badge>
                    </div>

                    <h3 className={`leading-tight font-extrabold text-slate-100 tracking-tight ${isWide ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} ${spaceGrotesk.className}`}>
                      {project.title}
                    </h3>
                    
                    <p className={`text-sm sm:text-base text-slate-400 leading-relaxed font-normal ${inter.className}`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom contents */}
                  <div className="space-y-6 pt-6 mt-8 border-t border-slate-900/80">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span key={tech} className={`text-xs font-semibold font-mono px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText} border border-white/5`}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {project.links && project.links.length > 0 && (
                      <div className="flex flex-wrap gap-5 mt-auto items-center">
                        {project.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${theme.linkText} ${theme.linkHover} transition-all duration-300 font-mono`}
                          >
                            {link.url.includes("youtube") ? (
                              <FaYoutube className="w-4 h-4 text-rose-500" />
                            ) : link.url.includes("github") ? (
                              <FaGithub className="w-4 h-4 text-slate-300" />
                            ) : (
                              <ExternalLink className="w-4 h-4 text-emerald-500" />
                            )}
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
