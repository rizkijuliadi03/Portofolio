"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profileData } from "@/data/portfolio";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-slate-800/50 shadow-lg shadow-slate-900/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-bold text-2xl tracking-tighter cursor-pointer group">
              R<span className="text-emerald-500 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300">.</span>J<span className="text-emerald-500 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300">.</span>
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors duration-300 group py-2"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </a>
            ))}
            <a
              href={profileData.resume_file_path}
              download="RIZKI JULIADI - CV - 2026 New New.pdf"
              className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500/10 text-emerald-500 border border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] h-10 px-6 py-2"
            >
              Download CV
            </a>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-emerald-400 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl"
        >
          <div className="px-4 pt-2 pb-6 space-y-2 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-lg text-base font-medium text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href={profileData.resume_file_path}
              download="RIZKI JULIADI - CV - 2026 New New.pdf"
              className="block w-full text-center px-3 py-3 mt-6 rounded-full text-base font-semibold transition-all duration-300 bg-emerald-500/10 text-emerald-500 border border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
