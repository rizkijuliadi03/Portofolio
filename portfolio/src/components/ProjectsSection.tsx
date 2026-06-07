"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/portfolio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { FaYoutube, FaGithub } from "react-icons/fa";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

type ThemeKey = "blue" | "emerald" | "purple" | "orange";

const themeMap: Record<ThemeKey, { cardGlow: string, cardGradientHover: string, cardGradient: string, badgeBg: string, badgeText: string, badgeBorder: string, linkText: string, linkHover: string }> = {
  blue: {
    cardGlow: "bg-blue-500/10",
    cardGradientHover: "hover:from-blue-500/30",
    cardGradient: "from-blue-500/10 to-transparent",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/20",
    linkText: "text-blue-500",
    linkHover: "hover:text-blue-400"
  },
  emerald: {
    cardGlow: "bg-emerald-500/10",
    cardGradientHover: "hover:from-emerald-500/30",
    cardGradient: "from-emerald-500/10 to-transparent",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/20",
    linkText: "text-emerald-500",
    linkHover: "hover:text-emerald-400"
  },
  purple: {
    cardGlow: "bg-purple-500/10",
    cardGradientHover: "hover:from-purple-500/30",
    cardGradient: "from-purple-500/10 to-transparent",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
    badgeBorder: "border-purple-500/20",
    linkText: "text-purple-500",
    linkHover: "hover:text-purple-400"
  },
  orange: {
    cardGlow: "bg-orange-500/10",
    cardGradientHover: "hover:from-orange-500/30",
    cardGradient: "from-orange-500/10 to-transparent",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400",
    badgeBorder: "border-orange-500/20",
    linkText: "text-orange-500",
    linkHover: "hover:text-orange-400"
  }
};

export default function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
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
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className={`text-sm font-medium tracking-widest uppercase ${inter.className}`}>Portofolio</span>
          </motion.div>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${spaceGrotesk.className}`}>
            Projects & Publications
          </h2>
          <p className={`text-lg text-muted-foreground ${inter.className}`}>
            A showcase of my recent work, research, and technical initiatives.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project, index) => {
            const theme = themeMap[(project as any).theme as ThemeKey] || themeMap.blue;

            // Bento Grid configuration: 
            // Item 1: Wide (2 cols)
            // Item 2: Square (1 col)
            // Item 3: Square (1 col)
            // Item 4: Wide (2 cols)
            const isWide = index === 0 || index === 3;
            const bentoClass = isWide ? "lg:col-span-2" : "lg:col-span-1";

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative group p-[1px] rounded-3xl bg-gradient-to-b ${theme.cardGradient} ${theme.cardGradientHover} transition-all duration-500 h-full ${bentoClass}`}
              >
                <div className={`absolute inset-0 ${theme.cardGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <Card className="h-full flex flex-col bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className={`${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} ${inter.className}`}>
                        {project.type}
                      </Badge>
                    </div>
                    <CardTitle className={`leading-tight font-bold ${isWide ? 'text-2xl md:text-3xl' : 'text-2xl'} ${spaceGrotesk.className}`}>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className={`text-base leading-relaxed ${inter.className}`}>
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-6 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2 w-full">
                      {project.tech_stack.map((tech) => (
                        <span key={tech} className={`text-xs font-semibold px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText} ${inter.className}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.links && project.links.length > 0 && (
                      <div className="flex flex-wrap gap-4 w-full mt-auto">
                        {project.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 text-sm font-bold ${theme.linkText} ${theme.linkHover} transition-colors ${inter.className}`}
                          >
                            {link.url.includes("youtube") ? (
                              <FaYoutube className="w-4 h-4" />
                            ) : link.url.includes("github") ? (
                              <FaGithub className="w-4 h-4" />
                            ) : (
                              <ExternalLink className="w-4 h-4" />
                            )}
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
