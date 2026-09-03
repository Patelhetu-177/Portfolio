export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Mobile & Web" | "Full Stack" | "GenAI & Tools" | "Real-Time Systems";
  image: string;
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

export interface Education {
  institution: string;
  degree: string;
  period: string;
  score: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  topics: string;
  credentialUrl?: string;
  badge: string;
}

export const PERSONAL_INFO = {
  name: "Hetu Patel",
  title: "Full Stack & Mobile Developer | GenAI & Automations",
  roles: [
    "Full-Stack Developer (MERN & Next.js)",
    "Mobile Developer (React Native & Expo)",
    "GenAI & Workflow Automation (n8n)",
    "Competitive Programmer (LeetCode 1572 | CodeChef 3★)",
  ],
  phone: "8160463306",
  phoneDisplay: "+91 8160463306",
  email: "hetu.alk.patel@gmail.com",
  location: "Gandhinagar / Gujarat, India",
  summary: "Full Stack Developer specializing in MERN, Next.js, and Mobile Development (React Native/Expo) with a focus on GenAI and workflow automation (n8n). Proven problem-solver with a LeetCode rating of 1572 (450+ solved) and CodeChef 3★ (1653 rating). Experienced in building high-performance, cross-platform applications and secure enterprise-grade infrastructures while collaborating effectively in agile environments.",
  bio: "Full Stack Developer specializing in MERN, Next.js, and Mobile Development (React Native/Expo) with a strong focus on GenAI and workflow automation (n8n). Proven problem-solver with deep competitive programming foundations and real-world production engineering experience.",
  secondaryBio: "From building cross-platform sports booking apps (FirstBookIt) and AI productivity platforms (AvatarAI) to architecting enterprise role-based access control and real-time carbon market infrastructure, I create scalable, resilient, and engaging digital solutions.",
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
    { label: "LeetCode Rating", value: "1572", subtext: "450+ Solved" },
    { label: "CodeChef Rating", value: "3★ (1653)", subtext: "Active Competitive Coder" },
    { label: "Academic CGPA", value: "8.8", subtext: "B.Tech ICT @ PDEU" },
    { label: "Production Platforms", value: "6+", subtext: "Web, Mobile & AI" },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "firstbookit",
    title: "FirstBookIt: iOS | Android | Web",
    tagline: "Cross-Platform Sports Venue & Tournament Management Ecosystem",
    description: "Full-scale sports venue discovery, dynamic booking, and live tournament platform built with React Native (Expo) and TypeScript, featuring split payments, GPS run tracking, and real-time tournament scoring.",
    category: "Mobile & Web",
    image: "/assets/firstbookit.png",
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
    metrics: "Production Ready • Cross-Platform",
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
    title: "AvatarAI",
    tagline: "All-in-One GenAI Platform & Interactive Productivity Suite",
    description: "An advanced multi-modal AI platform built using Next.js 14, Gemini AI, Clerk, and Pinecone Vector Database for AI companion avatars, mock voice interviews, and intelligent PDF/Excel document extraction.",
    category: "GenAI & Tools",
    image: "/assets/avatarai.png",
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
    description: "Enterprise event booking and ticketing system built with Next.js, TypeScript, Prisma, and PostgreSQL with role-based access for attendees, organizers, and administrators.",
    category: "Full Stack",
    image: "/assets/eventsphere.png",
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
      { name: "PostgreSQL & Prisma ORM", level: "Advanced", percent: 88, isTop: true },
      { name: "MySQL", level: "Intermediate", percent: 82 },
      { name: "WebSockets / Socket.io", level: "Advanced", percent: 85 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3, IAM, Lambda)", level: "Intermediate", percent: 82, isTop: true },
      { name: "Docker", level: "Intermediate", percent: 78 },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "VIKARTR TECHNOLOGIES LLP",
    role: "Full Stack Developer (Internship)",
    period: "January 2026 – Present",
    location: "Remote / Hybrid",
    type: "Industry Internship + Part-time",
    projects: [
     
      {
        name: "Ethicare Financial Services",
        subtitle: "Financial Calculation & Multi-Role Client Portal",
        points: [
          "Created multiple calculators (Stamp Duty, Loan Repayment, Interest) to support accurate financial decision-making.",
          "Implemented secure multi-role support for User, Agent, and Staff with role-specific dashboards and permissions.",
          "Built a responsive, high-performance frontend and seamlessly connected it to a scalable MongoDB backend.",
          "Enhanced usability with dynamic forms, real-time calculations, and intuitive navigation for financial service workflows.",
        ],
        stack: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Financial APIs"],
      },
      {
        name: "KARBYNX – Digital Carbon Market Infrastructure",
        subtitle: "Institutional Carbon Credit & Satellite MRV Platform",
        points: [
          "Developed a high-performance cross-platform mobile application using React Native and Expo, providing a seamless user experience for institutional carbon credit management.",
          "Implemented a complex Role-Based Access Control (RBAC) system to manage permissions for Sellers, Buyers, Admins, and Auditors, ensuring secure data handling.",
          "Integrated enterprise-grade REST APIs to synchronize real-time data from IoT sensors and satellite imagery for automated monitoring and verification (MRV).",
        ],
        stack: ["React Native", "Expo", "REST APIs", "IoT & Satellite MRV", "RBAC"],
      },
    ],
  },
];

export const EDUCATIONS: Education[] = [
  {
    institution: "Pandit Deendayal Energy University (PDEU)",
    degree: "B.Tech in Information, Communication and Technology (ICT)",
    period: "Aug 2022 – Present",
    score: "CGPA: 8.8 / 10.0",
    highlights: [
      "Specializing in Distributed Systems, Full-Stack Architecture, Algorithms, and Cloud Infrastructure.",
      "Active participant in technical hackathons, algorithmic coding competitions, and system design projects.",
    ],
  },
  {
    institution: "Uma Higher Secondary School, Visnagar",
    degree: "Higher Secondary Certificate (HSC) – Science Stream",
    period: "2020 – 2022",
    score: "Percentage: 92.0%",
    highlights: [
      "Secured 92.0% in Higher Secondary Board Examination with strong foundation in Mathematics and Sciences.",
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "HTML, CSS, and Javascript for Web Developers",
    issuer: "Johns Hopkins University",
    topics: "Modern Responsive Web Design, Core JavaScript, Asynchronous Patterns & Web App Architecture",
    credentialUrl: "/assets/Certificate.jpg",
    badge: "Johns Hopkins",
  },
  {
    title: "Build Web Applications using Express.js and Node.js",
    issuer: "Meta (Coursera)",
    topics: "Backend Architecture, Middleware, REST APIs, Security, MongoDB & Server Performance",
    credentialUrl: "/assets/Certificate.jpg",
    badge: "Meta Specialization",
  },
];
