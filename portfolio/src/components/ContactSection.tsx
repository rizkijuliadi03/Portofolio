"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profileData } from "@/data/portfolio";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject");
    const body = formData.get("body");

    try {
      const response = await fetch("https://formsubmit.co/ajax/rizkijuliadi03@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: subject || "New message from Portfolio!",
          Subject: subject,
          Message: body,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

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
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]"
        />
        
        {/* Subtle dot pattern grid */}
        <div className="absolute inset-0 opacity-[0.02] bg-pattern-dot-grid" />
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className={`text-xs font-semibold tracking-widest uppercase ${inter.className}`}>Contact</span>
              </div>
              <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-100 ${spaceGrotesk.className}`}>
                Let's Connect
              </h2>
              <p className={`text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl ${inter.className}`}>
                Whether you have a question, want to discuss a potential opportunity, or just want to say hi, my inbox is open!
              </p>
            </motion.div>
            
            <motion.div variants={containerVariants} className="space-y-6 max-w-lg">
              {/* Email Card */}
              <motion.div variants={itemVariants} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent hover:from-blue-500/40 transition-all duration-350">
                <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-slate-900/60">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-md">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 ${inter.className}`}>Secure Channel</div>
                    <a href={`mailto:${profileData.email}`} className={`text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors ${spaceGrotesk.className}`}>
                      {profileData.email}
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* LinkedIn Card */}
              <motion.div variants={itemVariants} className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent hover:from-purple-500/40 transition-all duration-355">
                <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-slate-900/60">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-md">
                    <FaLinkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 ${inter.className}`}>Social Node</div>
                    <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className={`text-lg font-bold text-slate-100 group-hover:text-purple-400 transition-colors ${spaceGrotesk.className}`}>
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
            className="relative p-[1px] rounded-3xl bg-gradient-to-br from-blue-500/25 via-slate-800 to-emerald-500/25"
          >
            {/* Soft backdrop radial glow */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
            
            <div className="bg-slate-950/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-900 relative">
              <div className="mb-8">
                <h3 className={`text-2xl font-extrabold text-slate-100 mb-2 ${spaceGrotesk.className}`}>Send Message</h3>
                <p className={`text-sm text-slate-400 ${inter.className}`}>Submit connection request. Encrypted payload transmission.</p>
              </div>

              <form onSubmit={handleSubmit} className={`space-y-6 ${inter.className}`}>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-slate-400">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Enter message topic..." 
                    required 
                    onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please Fill in This Field')}
                    onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                    className="bg-slate-950/40 border-slate-850/80 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40 text-slate-100 h-12 rounded-xl border font-normal placeholder:text-slate-600 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="body" className="text-xs font-mono uppercase tracking-wider text-slate-400">Message Body</Label>
                  <Textarea 
                    id="body" 
                    name="body" 
                    placeholder="Hello Rizki, let's collaborate on..." 
                    className="min-h-[150px] resize-y bg-slate-950/40 border-slate-855/80 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40 text-slate-100 rounded-xl p-4 placeholder:text-slate-600 transition-all" 
                    required 
                    onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('Please Fill in This Field')}
                    onInput={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('')}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full h-12 gap-2 text-slate-950 font-bold rounded-xl transition-all duration-300 border-0 cursor-pointer ${
                    submitStatus === 'success' 
                      ? 'bg-emerald-400 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : submitStatus === 'error'
                      ? 'bg-rose-500 hover:bg-rose-450 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                      : 'bg-emerald-400 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className={`font-semibold text-[14px] uppercase tracking-wider ${inter.className}`}>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-slate-950" />
                      <span className={`font-semibold text-[14px] uppercase tracking-wider ${inter.className}`}>Message Sent!</span>
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-white" />
                      <span className={`font-semibold text-[14px] uppercase tracking-wider ${inter.className}`}>Failed to Send</span>
                    </>
                  ) : (
                    <>
                      <span className={`font-bold text-[14px] uppercase tracking-wider ${inter.className}`}>Send Message</span>
                      <Send className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
