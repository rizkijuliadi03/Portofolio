"use client";

import { motion } from "framer-motion";
import { profileData } from "@/data/portfolio";
import { Mail, MessageSquare, Send } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function ContactSection() {
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
    <section id="contact" className="py-32 relative overflow-hidden bg-slate-950">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
        />
        
        {/* Subtle dot pattern grid */}
        <div 
          className="absolute inset-0 opacity-[0.02] bg-pattern-dot-grid"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side: Contact Information */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className={`text-sm font-medium tracking-widest uppercase ${inter.className}`}>Contact</span>
              </div>
              <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-100 ${spaceGrotesk.className}`}>
                Let's Connect
              </h2>
              <p className={`text-lg text-slate-400 leading-relaxed ${inter.className}`}>
                Whether you have a question, want to discuss a potential opportunity, or just want to say hi, I'll try my best to get back to you!
              </p>
            </motion.div>
            
            <motion.div variants={containerVariants} className="space-y-6">
              {/* Email Card */}
              <motion.div variants={itemVariants} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent hover:from-blue-500/40 transition-colors">
                <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900/80 backdrop-blur-sm border border-slate-800">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm font-medium text-slate-400 uppercase tracking-wider mb-1 ${inter.className}`}>Email</div>
                    <a href={`mailto:${profileData.email}`} className={`text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors ${spaceGrotesk.className}`}>
                      {profileData.email}
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* LinkedIn Card */}
              <motion.div variants={itemVariants} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent hover:from-purple-500/40 transition-colors">
                <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900/80 backdrop-blur-sm border border-slate-800">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <FaLinkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm font-medium text-slate-400 uppercase tracking-wider mb-1 ${inter.className}`}>Social</div>
                    <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className={`text-lg font-semibold text-slate-100 group-hover:text-purple-400 transition-colors ${spaceGrotesk.className}`}>
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div
            variants={itemVariants}
            className="relative p-[1px] rounded-3xl bg-gradient-to-br from-blue-500/30 via-slate-800 to-purple-500/30"
          >
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
            <div className="bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-800/50 relative">
              <div className="mb-8">
                <h3 className={`text-2xl font-bold text-slate-100 mb-2 ${spaceGrotesk.className}`}>Send me a message</h3>
                <p className={`text-sm text-slate-400 ${inter.className}`}>Fill out the form below and it will open your default mail client.</p>
              </div>

              <form action={`mailto:${profileData.email}`} method="GET" className={`space-y-6 ${inter.className}`}>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-300 font-medium">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="What is this regarding?" 
                    required 
                    onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please Fill in This Field')}
                    onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 text-slate-100 h-12 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="body" className="text-slate-300 font-medium">Message</Label>
                  <Textarea 
                    id="body" 
                    name="body" 
                    placeholder="Hello Rizki, I would like to discuss..." 
                    className="min-h-[150px] resize-y bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 text-slate-100 rounded-xl p-4" 
                    required 
                    onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('Please Fill in This Field')}
                    onInput={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('')}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border-0"
                >
                  <span className={`font-semibold text-[15px] ${inter.className}`}>Send Message</span>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
