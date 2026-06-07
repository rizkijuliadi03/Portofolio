import { profileData } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 relative overflow-hidden">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer group">
          R<span className="text-emerald-500 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300">.</span>J<span className="text-emerald-500 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300">.</span>
        </div>
        
        <p className="text-sm text-slate-400 text-center md:text-left font-medium">
          &copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href={profileData.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-400 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.6)] transition-all duration-300"
          >
            <FaLinkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={profileData.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-red-500 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] transition-all duration-300"
          >
            <FaYoutube className="w-6 h-6" />
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href="https://github.com/" // GitHub URL was not in PRD, using a generic one
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            <FaGithub className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
