export type FileId =
  | "about.md"
  | "experience.json"
  | "education.ts"
  | "projects.tsx"
  | "skills.js"
  | "contact.jsx"
  | "resume.pdf"
  | "settings.json";

export interface FileMeta {
  id: FileId;
  name: string;
  path: string;
  lang: string;
  folder: string;
}

export const FILES: FileMeta[] = [
  { id: "about.md", name: "about.md", path: "portfolio/src/about.md", lang: "Markdown", folder: "src" },
  {
    id: "experience.json",
    name: "experience.json",
    path: "portfolio/src/experience.json",
    lang: "JSON",
    folder: "src",
  },
  { id: "education.ts", name: "education.ts", path: "portfolio/src/education.ts", lang: "TypeScript", folder: "src" },
  { id: "projects.tsx", name: "projects.tsx", path: "portfolio/src/projects.tsx", lang: "TypeScript JSX", folder: "src" },
  { id: "skills.js", name: "skills.js", path: "portfolio/src/skills.js", lang: "JavaScript", folder: "src" },
  { id: "contact.jsx", name: "contact.jsx", path: "portfolio/src/contact.jsx", lang: "JavaScript JSX", folder: "src" },
  { id: "resume.pdf", name: "resume.pdf", path: "portfolio/public/resume.pdf", lang: "PDF", folder: "public" },
  { id: "settings.json", name: "settings.json", path: "portfolio/.vscode/settings.json", lang: "JSON", folder: ".vscode" },
];

export const FOLDERS = [
  { name: ".vscode", files: ["settings.json"] as FileId[] },
  { name: "public", files: ["resume.pdf"] as FileId[] },
  {
    name: "src",
    files: ["about.md", "experience.json", "education.ts", "projects.tsx", "skills.js", "contact.jsx"] as FileId[],
  },
];

export const PROFILE = {
  name: "Your Name",
  role: "Full-Stack Engineer · MERN",
  location: "Bengaluru, India",
  email: "you@example.com",
  github: "github.com/yourhandle",
  linkedin: "linkedin.com/in/yourhandle",
  website: "yourdomain.dev",
  summary:
    "Full-stack engineer who builds fast, accessible products end to end — React on the front, Node/Express and MongoDB on the back. I care about DX, clean data models and shipping.",
  highlights: [
    "4+ years building production MERN applications",
    "Designed MongoDB schemas serving 2M+ documents",
    "Led migration of a monolith to modular Express services",
    "Obsessive about performance budgets and Lighthouse scores",
  ],
};

export interface Job {
  company: string;
  role: string;
  period: string;
  stack: string[];
  points: string[];
}

export const EXPERIENCE: Job[] = [
  {
    company: "Placeholder Labs",
    role: "Senior Full-Stack Engineer",
    period: "2023 — Present",
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "AWS"],
    points: [
      "Rebuilt the customer dashboard in React 19, cutting TTI by 43%.",
      "Modelled a multi-tenant MongoDB aggregation pipeline for analytics.",
      "Owned CI/CD and observability for 12 Express microservices.",
    ],
  },
  {
    company: "Sample Systems",
    role: "Full-Stack Developer",
    period: "2021 — 2023",
    stack: ["Express", "MongoDB", "Redux", "Docker"],
    points: [
      "Shipped a realtime order pipeline with Socket.IO and change streams.",
      "Reduced average API latency from 480ms to 120ms via indexing.",
      "Mentored three junior developers through code review rituals.",
    ],
  },
  {
    company: "Example Studio",
    role: "Frontend Engineer (Intern → FTE)",
    period: "2020 — 2021",
    stack: ["JavaScript", "React", "SCSS"],
    points: [
      "Built a component library adopted across five client projects.",
      "Converted design systems from Figma into accessible React code.",
    ],
  },
];

export interface Degree {
  school: string;
  degree: string;
  period: string;
  detail: string;
  score: string;
}

export const EDUCATION: Degree[] = [
  {
    school: "Placeholder Institute of Technology",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2016 — 2020",
    detail: "Coursework: Distributed Systems, DBMS, Compilers, Machine Learning.",
    score: "GPA 8.7 / 10",
  },
  {
    school: "Sample Senior Secondary School",
    degree: "Higher Secondary, PCM + Computer Science",
    period: "2014 — 2016",
    detail: "School topper in Computer Science. Built first PHP guestbook here.",
    score: "94.2%",
  },
];

export interface Project {
  name: string;
  tagline: string;
  stack: string[];
  repo: string;
  demo: string;
  bullets: string[];
}

export const PROJECTS: Project[] = [
  {
    name: "mern-commerce",
    tagline: "Headless storefront with Stripe checkout",
    stack: ["React", "Express", "MongoDB", "Stripe"],
    repo: "github.com/yourhandle/mern-commerce",
    demo: "demo.example.com",
    bullets: [
      "Cart, inventory reservations and webhooks in one Express API.",
      "MongoDB transactions guarantee no oversold SKUs.",
    ],
  },
  {
    name: "devboard",
    tagline: "Realtime kanban for engineering teams",
    stack: ["React", "Socket.IO", "Node", "MongoDB"],
    repo: "github.com/yourhandle/devboard",
    demo: "devboard.example.com",
    bullets: ["Optimistic drag-and-drop with server reconciliation.", "Presence and cursors over a single socket channel."],
  },
  {
    name: "logpipe",
    tagline: "Log ingestion + query engine",
    stack: ["Node", "MongoDB", "Redis"],
    repo: "github.com/yourhandle/logpipe",
    demo: "logpipe.example.com",
    bullets: ["Ingests 5k events/sec on a single node.", "Time-bucketed aggregation with capped collections."],
  },
  {
    name: "portfolio-vscode",
    tagline: "This very editor, rebuilt in React",
    stack: ["React", "TanStack", "Tailwind"],
    repo: "github.com/yourhandle/portfolio-vscode",
    demo: "yourdomain.dev",
    bullets: ["Command palette, tabs, terminal and theme switching.", "Fully keyboard navigable."],
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "frontend", items: ["React", "TypeScript", "Redux Toolkit", "TanStack Query", "Tailwind CSS", "Vite"] },
  { group: "backend", items: ["Node.js", "Express", "REST", "GraphQL", "Socket.IO", "JWT / OAuth"] },
  { group: "database", items: ["MongoDB", "Mongoose", "Aggregation Pipelines", "Redis", "PostgreSQL"] },
  { group: "tooling", items: ["Docker", "GitHub Actions", "AWS", "Jest", "Playwright", "Nginx"] },
];

export const TERMINAL_INTRO = [
  { kind: "cmd" as const, text: "npm run dev" },
  { kind: "dim" as const, text: "> portfolio@1.0.0 dev" },
  { kind: "dim" as const, text: "> vite dev --host" },
  { kind: "ok" as const, text: "  VITE v8.1.5  ready in 214 ms" },
  { kind: "info" as const, text: "  ➜  Local:   http://localhost:5173/" },
  { kind: "ok" as const, text: "  ➜  MongoDB connected: mongodb://localhost:27017/portfolio" },
  { kind: "dim" as const, text: "Type `help` for available commands." },
];
