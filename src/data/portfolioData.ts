export interface ProjectGalleryItem {
  image: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Mobile & Web" | "Full Stack" | "GenAI & Tools" | "Real-Time Systems";
  image: string;
  gallery?: ProjectGalleryItem[];
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  highlights: string[];
  metrics?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: string; percent: number; isTop?: boolean }[];
}

export interface ExperienceProject {
  name: string;
  subtitle: string;
  points: string[];
  stack: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  projects: ExperienceProject[];
}

export const PERSONAL_INFO = {
  name: "Hetu Patel",
  phone: "8160463306",
  phoneDisplay: "+91 8160463306",
  email: "hetu.alk.patel@gmail.com",
  location: "Gandhinagar / Gujarat, India",
  summary: "Full Stack Developer specializing in MERN, Next.js, and Mobile Development (React Native/Expo), with a focus on GenAI and workflow automation (n8n). Proven problem-solver with a LeetCode rating of 1572 (500+ solved) and CodeChef 3★ (1653 rating), and hands-on experience shipping cross-platform apps and role-based access systems in a fast-moving team.",
  secondaryBio: "From a cross-platform sports booking app (FirstBookIt) and an AI productivity platform (AvatarAI) to role-based access systems and real-time carbon-market infrastructure — I like building things that actually ship, not just demos.",
  resumeUrl: "/assets/Hetu_Patel.pdf",
  profileImage: "/assets/about-pic.jpg",
  avatarImage: "/assets/profile-pic2.png",
  socials: {
    github: "https://github.com/Patelhetu-177",
    linkedin: "https://www.linkedin.com/in/hetu-patel-61a8b1288/",
    leetcode: "https://leetcode.com/u/Hetu_patel_17/",
    codechef: "https://www.codechef.com/users/hetu_cp17",
  },
  stats: [
    { label: "LeetCode Rating", value: "1572", subtext: "500+ Solved" },
    { label: "CodeChef Rating", value: "3★ (1653)", subtext: "Active Competitive Coder" },
    { label: "Academic CGPA", value: "8.8", subtext: "B.Tech ICT @ PDEU" },
    { label: "Production Platforms", value: "6+", subtext: "Web, Mobile & AI" },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "firstbookit",
    title: "FirstBookIt",
    tagline: "Cross-Platform Sports Venue & Tournament Management Ecosystem",
    description: "Full-scale sports venue discovery, dynamic booking, and live tournament platform built with React Native (Expo) and TypeScript, featuring split payments, GPS run tracking, and real-time tournament scoring.",
    category: "Mobile & Web",
    image: "/assets/firstbookit.PNG",
    gallery: [
      { image: "/assets/FirstBookIt/1.PNG", title: "Sports Venue Discovery", description: "Explore nearby turf, courts, and sporting facilities with live availability." },
      { image: "/assets/FirstBookIt/2.PNG", title: "Turf & Court Slot Selection", description: "Interactive time-slot selector with instant pricing and booking policies." },
      { image: "/assets/FirstBookIt/3.PNG", title: "Dynamic Pricing & Offers", description: "Automatic discount calculation, promo codes, and loyalty reward tiers." },
      { image: "/assets/FirstBookIt/4.PNG", title: "Split Payment Checkout", description: "Razorpay payment gateway integration with multi-player bill splitting." },
      { image: "/assets/FirstBookIt/5.PNG", title: "GPS Live Run Tracking", description: "Expo Location GPS run tracking with live distance, pace, and timer." },
      { image: "/assets/FirstBookIt/6.PNG", title: "Route Flyover Playback", description: "Cinematic GPS route playback with elevation and speed statistics." },
      { image: "/assets/FirstBookIt/7.PNG", title: "Tournament Management", description: "Create cricket and racquet sport tournaments with auto-generated brackets." },
      { image: "/assets/FirstBookIt/8.PNG", title: "Real-Time Match Scoring", description: "Live ball-by-ball and rally scoring engine with instant leaderboard updates." },
      { image: "/assets/FirstBookIt/9.PNG", title: "Manager Dashboard", description: "Manage reservations, slot pricing overrides, and refund requests." },
      { image: "/assets/FirstBookIt/10.PNG", title: "QR Code Check-ins", description: "Fast venue access with QR check-in and booking confirmation passes." },
    ],
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "AWS (EC2, S3)",
      "Razorpay",
      "n8n",
      "React Query",
    ],
    githubUrl: "https://github.com/Patelhetu-177",
    liveUrl: "https://github.com/Patelhetu-177",
    featured: true,
    metrics: "iOS • Android • Web",
    highlights: [
      "Engineered core turf/venue booking flow with court/slot selection, dynamic pricing, coupon codes, and Razorpay checkout with multi-player bill splitting.",
      "Developed Node.js/Express & Prisma/PostgreSQL backend powering owner/manager dashboards, payouts, dynamic pricing, and booking change approvals.",
      "Built GPS running module using Expo Location with live run tracking, route flyover playback, run summaries, and QR-code check-ins.",
      "Developed comprehensive tournament management system for cricket & racquet sports with live ball-by-ball/rally scoring, auto-scheduling, and shareable live match reports.",
      "Deployed frontend and backend on AWS with n8n-powered automated chatbot for customer support.",
    ],
  },
  {
    id: "avatarai",
    title: "AvatarAI Studio",
    tagline: "All-in-One GenAI Platform & Interactive Productivity Suite",
    description: "An advanced multi-modal AI platform built using Next.js 14, Gemini AI, Clerk, and Pinecone Vector Database for AI companion avatars, mock voice interviews, and intelligent PDF/Excel document extraction.",
    category: "GenAI & Tools",
    image: "/assets/avatarai.png",
    gallery: [
      { image: "/assets/avatarAI/1.png", title: "Companion & AI Avatars", description: "Interactive voice and text conversations with domain-specialized AI companion avatars." },
      { image: "/assets/avatarAI/2.png", title: "DocHub Vector Search", description: "Upload PDF and Excel documents with Pinecone Vector DB semantic search and QA." },
      { image: "/assets/avatarAI/3.png", title: "Mock Voice Interview Studio", description: "Real-time AI voice interview practice with automated scorecards and tips." },
    ],
    tags: ["Next.js 14", "Gemini AI", "Clerk", "Pinecone Vector DB", "Cloudinary", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Patelhetu-177/AvatarAI",
    liveUrl: "https://avatar-ai-swart.vercel.app/",
    featured: true,
    metrics: "Next.js 14 • Gemini AI",
    highlights: [
      "Built Companion & SkillWise: chat with custom AI avatars and practice real-time voice interviews with automated clarity/confidence feedback.",
      "Engineered DocHub: upload PDFs or Excel files with Vector Search (Pinecone) to ask questions and extract instant insights from documents.",
      "Integrated AI Resume Analyzer for ATS optimization and Quiz module generating topic-based tests with instant scoring and personalized tips.",
      "Created Image Studio leveraging Cloudinary for automated AI image processing (background removal, enhancement, and optimization).",
    ],
  },
  {
    id: "eventsphere",
    title: "EventSphere",
    tagline: "Full-Stack Event Discovery, Ticketing & Management Platform",
    description: "A full-stack event booking and ticketing system built with Next.js, TypeScript, Prisma, and PostgreSQL, with role-based access for attendees, organizers, and administrators.",
    category: "Full Stack",
    image: "/assets/eventsphere.png",
    gallery: [
      { image: "/assets/EventSphere/1.png", title: "Event Discovery Portal", description: "Browse trending conferences, concerts, and meetups with category filters." },
      { image: "/assets/EventSphere/2.png", title: "Interactive Ticket Booking", description: "Select seat tiers, early-bird passes, and checkout with instant confirmation." },
      { image: "/assets/EventSphere/3.png", title: "Organizer Management Suite", description: "Create and publish events, track ticket sales, and manage attendee lists." },
      { image: "/assets/EventSphere/4.png", title: "Admin RBAC & Oversight", description: "Comprehensive administrator dashboard for platform analytics and audits." },
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "JWT Auth"],
    githubUrl: "https://github.com/Patelhetu-177/EventSphere",
    liveUrl: "https://event-booker-tan.vercel.app/",
    featured: true,
    metrics: "PostgreSQL • Prisma ORM",
    highlights: [
      "Implemented role-based access control (RBAC) for attendees, organizers, and administrators with secure JWT authentication.",
      "Enables users to seamlessly discover, book, and manage event reservations with secure payment processing workflows.",
      "Allows event organizers to create, monitor, and manage ticket tiers and attendee analytics.",
      "Engineered administrative dashboard for system monitoring, user management, and event oversight.",
    ],
  },
  {
    id: "namaste",
    title: "Namaste Chat",
    tagline: "Real-Time WebSocket Instant Messaging Application",
    description: "Secure, ultra-responsive real-time communication platform featuring low-latency peer messaging, live online presence tracking, responsive UI, and authenticated sessions.",
    category: "Real-Time Systems",
    image: "/assets/namaste.png",
    gallery: [
      { image: "/assets/Namaste/1.png", title: "Real-Time Messaging Interface", description: "Instant peer-to-peer and group chat powered by low-latency Socket.io WebSockets." },
      { image: "/assets/Namaste/2.png", title: "Live Online Presence & Status", description: "Real-time active status indicators, typing indicators, and message timestamps." },
      { image: "/assets/Namaste/3.png", title: "Secure Authenticated Sessions", description: "JWT session management with persistent message history stored in MongoDB." },
    ],
    tags: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "TailwindCSS", "JWT"],
    githubUrl: "https://github.com/Patelhetu-177/Namaste",
    liveUrl: "https://namaste-chatapp.onrender.com/",
    featured: false,
    metrics: "Socket.io • WebSockets",
    highlights: [
      "Low-latency real-time bidirectional messaging via WebSockets and Socket.io.",
      "Real-time user online/offline status indicators and message timestamps.",
      "JWT-based authenticated user sessions and end-to-end message persistence in MongoDB.",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Mobile",
    skills: [
      { name: "JavaScript (ES6+)", level: "Advanced", percent: 92, isTop: true },
      { name: "TypeScript", level: "Advanced", percent: 88, isTop: true },
      { name: "React Native & Expo", level: "Advanced", percent: 90, isTop: true },
      { name: "Java", level: "Intermediate", percent: 80 },
      { name: "C / C++", level: "Intermediate", percent: 82 },
    ],
  },
  {
    title: "Frontend Engineering",
    skills: [
      { name: "React.js", level: "Expert", percent: 95, isTop: true },
      { name: "Next.js (App Router)", level: "Advanced", percent: 90, isTop: true },
      { name: "Tailwind CSS", level: "Expert", percent: 95, isTop: true },
      { name: "HTML5 & CSS3", level: "Expert", percent: 96 },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js & Express.js", level: "Advanced", percent: 90, isTop: true },
      { name: "MongoDB & Mongoose", level: "Advanced", percent: 88, isTop: true },
      { name: "PostgreSQL & Prisma", level: "Advanced", percent: 85, isTop: true },
      { name: "REST APIs & Socket.io", level: "Advanced", percent: 90, isTop: true },
    ],
  },
  {
    title: "Cloud, AI & DevOps",
    skills: [
      { name: "AWS (EC2, S3, IAM)", level: "Intermediate", percent: 80, isTop: true },
      { name: "Docker & Containers", level: "Intermediate", percent: 78 },
      { name: "n8n Automations", level: "Advanced", percent: 88, isTop: true },
      { name: "Gemini AI & Pinecone", level: "Advanced", percent: 85, isTop: true },
      { name: "Git, GitHub & CI/CD", level: "Advanced", percent: 92, isTop: true },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Vikartr Technologies LLP",
    role: "Full Stack Developer",
    period: "January 2026 - Present",
    location: "Gujarat, India",
    type: "Internship",
    projects: [
      {
        name: "Ethicare Financial Services",
        subtitle: "Financial Calculators & Multi-Role Dashboards",
        points: [
          "Built full-stack web application with responsive UI, dynamic client portfolio reviews, and financial calculators.",
          "Implemented automated PDF generation for client investment summaries and lead-capture pipelines.",
        ],
        stack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      },
      {
        name: "KARBYNX Carbon MRV Platform",
        subtitle: "Satellite-Powered Carbon Intelligence Infrastructure",
        points: [
          "Contributed to frontend and API layers of carbon Measurement, Reporting & Verification (MRV) platform.",
          "Rendered geo-spatial maps, satellite vegetation health indices, and certified carbon offset metrics.",
        ],
        stack: ["React.js", "REST APIs", "Mapbox", "Tailwind CSS"],
      },
    ],
  },
];

