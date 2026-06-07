"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

type ColorKey = "blue" | "green" | "purple" | "orange" | "red";

const colorMap: Record<ColorKey, { text: string; bg: string; border: string; dot: string; shadow: string }> = {
  blue: { text: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-500", shadow: "hover:shadow-blue-500/20" },
  green: { text: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", dot: "bg-green-500", shadow: "hover:shadow-green-500/20" },
  purple: { text: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-500", shadow: "hover:shadow-purple-500/20" },
  orange: { text: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", dot: "bg-orange-500", shadow: "hover:shadow-orange-500/20" },
  red: { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", dot: "bg-red-500", shadow: "hover:shadow-red-500/20" },
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
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"
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
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">Experience Journey</h2>
          <p className="text-muted-foreground text-lg">My professional growth and key milestones.</p>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const theme = colorMap[(exp as any).color as ColorKey] || colorMap.blue;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 ${theme.bg} ${theme.text} shrink-0 shadow-sm z-10`}>
                  <div className={`w-3 h-3 rounded-full ${theme.dot} group-hover:scale-150 transition-transform duration-300`} />
                </div>

                {/* Card */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 p-6 rounded-2xl bg-card border ${theme.border} hover:shadow-xl ${theme.shadow} transition-all duration-300 relative`}
                >
                  {/* Decorative glowing background inside card */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${theme.bg} rounded-bl-[100px] -z-10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className={`w-5 h-5 ${theme.text}`} />
                    <span className={`text-sm font-semibold ${theme.text} px-3 py-1 rounded-full ${theme.bg}`}>
                      {exp.period}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <div className="text-muted-foreground font-medium mb-4">{exp.company}</div>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-muted-foreground/90 relative pl-5 leading-relaxed">
                        <span className={`absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full ${theme.dot} opacity-60`} />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
