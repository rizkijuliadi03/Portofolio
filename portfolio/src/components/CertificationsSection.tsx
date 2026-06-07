"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsData } from "@/data/portfolio";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Award, ExternalLink, X, ZoomIn } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function CertificationsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    <section id="certifications" className="py-32 relative overflow-hidden bg-slate-950">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"
        />
        
        {/* Premium Cyber Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)"
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
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20">
            <Award className="w-4 h-4" />
            <span className={`text-sm font-medium tracking-widest uppercase ${inter.className}`}>Professional Credentials</span>
          </motion.div>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-100 ${spaceGrotesk.className}`}>
            Certifications & Training
          </h2>
          <p className={`text-lg text-slate-400 ${inter.className}`}>
            Official credentials validating expertise in Artificial Intelligence, Software Engineering, and Technical Research.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificationsData.map((cert, index) => (
            <motion.div 
              key={cert.id} 
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                {/* Image Container with Lightbox Trigger */}
                <div 
                  className="relative aspect-video w-full overflow-hidden bg-slate-800/50 cursor-pointer group"
                  onClick={() => setSelectedImage(cert.image_src)}
                >
                  {cert.image_src ? (
                    <Image
                      src={cert.image_src}
                      alt={cert.name}
                      fill
                      priority={index < 3}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                      <span className={inter.className}>Image not found</span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white bg-blue-600/90 px-4 py-2 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ZoomIn className="w-4 h-4" />
                      <span className={`text-sm font-semibold ${inter.className}`}>View Certificate</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="pt-6 pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className={`text-xl leading-snug font-bold text-slate-100 ${spaceGrotesk.className}`}>
                      {cert.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className={`text-sm text-slate-400 flex flex-col gap-1 ${inter.className}`}>
                    <span className="font-medium text-slate-300">{cert.issuer}</span>
                    <span>Issued • {cert.date}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-slate-800 mt-auto">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-600/20 hover:border-transparent transition-all duration-300 font-semibold text-sm ${inter.className}`}
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className={`w-full text-center py-2.5 text-sm font-medium text-slate-500 bg-slate-800/30 rounded-xl ${inter.className}`}>
                      Credential Link Unavailable
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing modal
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-950/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt="Certification Certificate Full View"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
