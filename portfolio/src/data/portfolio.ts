export const profileData = {
  name: "Rizki Juliadi",
  headline: "Aspiring SOC Analyst | IEEE Published Researcher | AI & SIEM Enthusiast",
  email: "rizkijuliadi03@gmail.com",
  linkedin_url: "https://www.linkedin.com/in/rizki-juliadi-6062961a5/",
  youtube_url: "https://www.youtube.com/@PotensiProduktif",
  resume_file_path: "/RIZKI-JULIADI-CV-2026-New-New.pdf",
  about: `Detail-oriented Informatics graduate from Telkom University with a GPA of 3.75 (Cum Laude) and a strong focus on 
cybersecurity. Published IEEE researcher specializing in Web Penetration Testing using collaborative multi-agents. Proficient in 
vulnerability analysis and technical documentation, with hands-on experience using security tools like Nmap, Burp Suite, and 
OWASP ZAP. Currently advancing technical expertise in Wazuh, Ubuntu Server, and AI-driven security operations to enhance 
threat detection and incident response capabilities in a professional SOC environment.`
};

export const skillsData = [
  {
    id: "cyber",
    title: "Cybersecurity & Security Operations",
    icon: "Shield",
    theme: "blue",
    groups: [
      { label: "Methodologies", items: ["SOC Operations", "Penetration Testing", "Threat Monitoring", "Vulnerability Assessment"] },
      { label: "Tools & SIEM", items: ["Wazuh", "Wireshark", "Burp Suite", "Nmap", "Tenable Nessus", "OWASP ZAP"] }
    ]
  },
  {
    id: "infra",
    title: "Infrastructure & Network",
    icon: "Server",
    theme: "emerald",
    groups: [
      { label: "System Admin", items: ["Linux Server Administration", "Ubuntu Server", "Kali Linux"] },
      { label: "Networking", items: ["Network Configuration", "Computer Network Operations", "Routing & Switching"] }
    ]
  },
  {
    id: "software",
    title: "Software Dev, AI & Automation",
    icon: "Code2",
    theme: "purple",
    groups: [
      { label: "Programming", items: ["Python", "TypeScript", "JavaScript", "Go (Golang)", "C++", "PHP (Laravel)"] },
      { label: "AI & Vision", items: ["Artificial Intelligence", "Deep Reinforcement Learning", "OpenCV", "MediaPipe", "PyAutoGUI"] },
      { label: "Frameworks & Web", items: ["Next.js", "React"] },
      { label: "Databases", items: ["PostgreSQL", "MySQL"] }
    ]
  },
  {
    id: "professional",
    title: "Professional & Interpersonal Skills",
    icon: "Users",
    theme: "orange",
    groups: [
      { label: "Core Skills", items: ["Analytical Thinking", "Teamwork", "Problem Solving", "Mentoring", "Research", "Technical Documentation", "Communication", "Time Management", "Public Speaking"] }
    ]
  }
];

export const projectsData = [
  {
    id: "ieee-pub",
    theme: "blue",
    title: "Web Penetration Testing Using Collaborative Multi-Agents and Integrated Reporting",
    type: "IEEE Research Publication",
    description: "An academic research paper focusing on automated vulnerability detection and real-time security intelligence integration using multi-agent systems.",
    tech_stack: ["Cybersecurity", "Penetration Testing", "Multi-Agent Systems"],
    links: [
      { text: "Read on IEEE Xplore", url: "https://ieeexplore.ieee.org/document/10933244" }
    ]
  },
  {
    id: "virtual-mouse",
    theme: "emerald",
    title: "Virtual Mouse System (Eye & Hand Tracking)",
    type: "Computer Vision Automation",
    description: "An automation system that allows users to control the computer cursor completely hands-free using eye and hand tracking algorithms.",
    tech_stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: [
      { text: "Eye Tracking", url: "https://github.com/rizkijuliadi03/EyeVirtualMouse.git" },
      { text: "Hand Tracking", url: "https://github.com/rizkijuliadi03/HandVirtualMouse.git" }
    ]
  },
  {
    id: "sahabat-ai",
    theme: "purple",
    title: "Sahabat AI Chatbot",
    type: "AI API Integration",
    description: "An intelligent chatbot application leveraging Google AI APIs to provide seamless, automated conversational experiences.",
    tech_stack: ["JavaScript", "Google AI API", "Chatbot"],
    links: [
      { text: "View on GitHub", url: "https://github.com/rizkijuliadi03/sahabat-ai-chatbot.git" }
    ]
  },
  {
    id: "potensi-produktif",
    theme: "orange",
    title: "Potensi Produktif",
    type: "Content Creation & Education",
    description: "A YouTube channel dedicated to human productivity, applied psychology, and self-development, breaking down complex ideas into accessible steps.",
    tech_stack: ["Public Speaking", "Video Production", "Mentoring"],
    links: [
      { text: "Visit Channel", url: "https://www.youtube.com/@PsikologiNProduktif" }
    ]
  },
  {
    id: "specforge-ai",
    theme: "emerald",
    title: "SpecForge AI",
    type: "SaaS AI Product Requirements Document",
    description: "A web-based SaaS platform acting as a Single Source of Truth to transform casual app ideas into professional PRDs dynamically using an AI-Guided Questionnaire and Token Streaming.",
    tech_stack: ["Next.js", "Vercel AI SDK", "Drizzle ORM", "NextAuth"],
    links: [
      { text: "View on GitHub", url: "https://github.com/rizkijuliadi03/SPECFORGE-AI" }
    ]
  },
  {
    id: "ai-hybrid-trader",
    theme: "blue",
    title: "AI Hybrid Trader IDX V3",
    type: "Web-Based AI Trading Platform",
    description: "An AI-powered web-based algorithmic trading platform built for the Indonesian Stock Exchange (IDX), integrating algorithmic trading logic and real-time market data analysis.",
    tech_stack: ["Next.js", "TypeScript", "Python"],
    links: [
      { text: "View on GitHub", url: "https://github.com/rizkijuliadi03/AI-HYBRID-TRADER-IDX-V3-Web-Based-" }
    ]
  }
];

export const certificationsData = [
  {
    id: "hacktiv8-api",
    name: "AI Productivity and AI API Integration for Developers",
    issuer: "Hacktiv8 & Maju Bareng AI",
    date: "2026",
    link: "https://www.linkedin.com/posts/rizki-juliadi-6062961a5_generativeai-geminiapi-hacktiv8-ugcPost-7468281608291123201-Kksk/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC_q7OYBVusWffOdpAr3MJphO4r_fGCnOqw",
    image_src: "/certiv/AI-Productivity.png"
  },
  {
    id: "google-ai",
    name: "AI for Work & Career Readiness with Google AI Products",
    issuer: "Hacktiv8 & Maju Bareng AI",
    date: "2026",
    link: "https://www.linkedin.com/posts/rizki-juliadi-6062961a5_majubarengai-hacktiv8-artificialintelligence-ugcPost-7461251850768498688-rK3E/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC_q7OYBVusWffOdpAr3MJphO4r_fGCnOqw",
    image_src: "/certiv/AI-for-Work.png"
  },
  {
    id: "gemini-data-scientist",
    name: "LLM-Based Tools: Gemini API Integration for Data Scientists",
    issuer: "Hacktiv8 & Maju Bareng AI",
    date: "2026",
    link: "",
    image_src: "/certiv/LLM-Based-Tools-Gemini-API.png"
  },
  {
    id: "icadeis",
    name: "Conference Presenter - ICADEIS 2025",
    issuer: "International Conference on Advancement in Data Science, E-learning and Information System",
    date: "2025",
    link: "https://ieeexplore.ieee.org/document/10933244",
    image_src: "/certiv/Conference.png"
  }
];

export const experienceData = [
  {
    id: "oop-assistant",
    role: "Practicum Assistant for Object-Oriented Programming",
    company: "Informatics Laboratory Telkom University",
    period: "September 2024 - January 2025",
    color: "blue",
    achievements: [
      "Assisted in practicum sessions for the Object-Oriented Programming (OOP) course.",
      "Supported students in coding exercises, code debugging, and understanding fundamental OOP concepts.",
      "Guided students in completing assignments from instructors without providing direct answers.",
      "Assisted instructors in reviewing student assignments and grading them based on structured rubrics.",
      "Organized interactive Q&A and response sessions to assist students facing difficulties with the practicum, both inside and outside of regular study hours.",
      "Monitored lab safety and overall performance.",
      "Developed communication and leadership skills within a structured academic environment."
    ]
  },
  {
    id: "fks-it-support",
    role: "Information Technology Support Specialist",
    company: "Tene Group (PT Permata Dunia Sukses Utama (PDSU))",
    period: "July 2024 - August 2024",
    color: "green",
    achievements: [
      "Developed and deployed a web-based attendance system using Laravel and PostgreSQL, integrated with fingerprint biometrics and RFID hardware.",
      "Explored computer vision and automation scripts by learning OpenCV, MediaPipe, and PyAutoGUI, successfully developing a Virtual Mouse system.",
      "Studied and implemented basic Programmable Logic Controller (PLC) systems within industrial production automation."
    ]
  },
  {
    id: "puti-cyber-intern",
    role: "Cybersecurity Intern - MBKM Program",
    company: "Direktorat Pusat Teknologi Informasi (PuTi) Telkom University",
    period: "February 2024 - June 2024",
    color: "purple",
    achievements: [
      "Conducted in-depth research and practical implementation of penetration testing using multi-agent systems.",
      "Learned core ethical hacking concepts, including Red Team and Blue Team methodologies.",
      "Utilized various enterprise-grade security testing tools, including Nmap, Nikto, Wapiti, Burp Suite, OWASP ZAP, and Nessus Essentials.",
      "Operated within Linux-based virtual machine environments to simulate real-world cyber attack and defense scenarios.",
      "Completed weekly penetration testing projects and generated technical security reports, strengthening practical skills in vulnerability analysis and documentation.",
      "Received active mentoring for the final project, which was successfully accepted as a research paper in the IEEE Xplore digital library and presented at ICADEIS 2025.",
      "Actively engaged in webinars and team discussions to enhance knowledge and collaboration in the cybersecurity domain."
    ]
  },
  {
    id: "comm-net-assistant",
    role: "Practicum Assistant for Communication Network",
    company: "Informatics Laboratory Telkom University",
    period: "January 2024 - June 2024",
    color: "orange",
    achievements: [
      "Facilitated practical lab sessions focused on Enterprise Communication Networks.",
      "Supported laboratory activities related to network architectures, routing, and switching.",
      "Guided students in completing practical tasks without providing direct solutions.",
      "Evaluated student assignments and assisted instructors in grading based on established rubrics.",
      "Conducted dedicated problem-solving response sessions to help students resolve complex networking tasks.",
      "Monitored overall laboratory compliance and network safety standards.",
      "Enhanced technical mentoring, communication, and leadership skills."
    ]
  },
  {
    id: "pertamina-it-support",
    role: "Information Technology Support Specialist",
    company: "PT PERTAMINA (Persero)",
    period: "January 2020 - March 2020",
    color: "red",
    achievements: [
      "Assisted in maintaining and troubleshooting company IT infrastructure, encompassing hardware, software, and network connectivity.",
      "Supported internal users with system issues, device configurations, and application-level support to ensure business continuity.",
      "Observed and learned about secure network setups and firewall configurations to maintain reliable and secure inter-departmental communication.",
      "Documented technical issues and their resolutions to improve support team efficiency and incident response.",
      "Gained foundational exposure to cybersecurity principles by observing secure access controls and internal IT policies."
    ]
  }
];
