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
  name: "Kirthika S",
  role: "Software Engineer · AI Developer Tooling",
  location: "Chennai, India",
  email: "kirthikasubbu7@gmail.com",
  phone: "+91 99625 28099",
  github: "github.com/kirthikas",
  linkedin: "linkedin.com/in/kirthikas",
  website: "kirthika.dev",
  summary:
    "Curious, fast-learning Software Engineer driven by a passion for AI-powered developer tooling, automation and full-stack systems. I thrive on exploring new technologies and turning that curiosity into clean, scalable engineering solutions.",
  highlights: [
    "Engineer I at Comcast (AgentBuilder) — LLM automation for internal testing workflows",
    "Built a crypto reconciliation system at Fidelity, cutting manual effort by 80%",
    "98% test coverage with JUnit + Mockito across core reconciliation services",
    "GDSC Android Development Lead · CISCO Campus Ambassador · CTF core team",
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
    company: "Comcast — AgentBuilder",
    role: "Engineer I",
    period: "Jun 2026 — Present",
    stack: ["Python", "LLM Tooling", "Automation", "CI/CD"],
    points: [
      "Build AI-powered developer tools that apply LLM automation to accelerate internal testing workflows.",
      "Design and maintain automated regression and progression testing scripts, cutting manual QA effort.",
      "Promoted to full-time Engineer I after a 6-month internship (Jan — Jun 2026) on the same team.",
    ],
  },
  {
    company: "Fidelity Investments",
    role: "Full-Stack Engineering Intern",
    period: "May 2025 — Jul 2025",
    stack: ["Java", "Spring Boot", "JSON-RPC", "JUnit", "Mockito"],
    points: [
      "Engineered a crypto reconciliation system in Java Spring Boot, cutting manual reconciliation effort by 80%.",
      "Implemented scheduled JSON-RPC integrations to fetch live blockchain data for accurate transaction reporting.",
      "Developed JUnit and Mockito test suites achieving 98% coverage across core reconciliation services.",
    ],
  },
  {
    company: "White House Business Solutions",
    role: "Mobile App Development Intern",
    period: "May 2024",
    stack: ["Kotlin", "Android", "REST", "Auth"],
    points: [
      "Launched a real-time Android productivity-tracking app with task workflows and state management.",
      "Shipped secure REST APIs with token-based authentication, reaching 100+ internal downloads.",
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
    school: "SASTRA Deemed University",
    degree: "B.Tech, Computer Science and Business Systems",
    period: "Aug 2022 — Jun 2026",
    detail: "Thanjavur, India. GDSC Android Development Lead, CISCO Campus Ambassador, Team 1nf1n1ty CTF core member.",
    score: "B.Tech CSBS",
  },
  {
    school: "The Study L'ecole Internationale",
    degree: "Class XII",
    period: "2022",
    detail: "Chennai, India.",
    score: "94.0%",
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
    name: "ai-inference-infra",
    tagline: "FastAPI inference service for transformer models",
    stack: ["FastAPI", "Hugging Face", "Docker"],
    repo: "github.com/kirthikas/ai-inference-infra",
    demo: "github.com/kirthikas/ai-inference-infra",
    bullets: [
      "Architected a FastAPI inference service integrating Hugging Face transformer models for real-time predictions.",
      "Exposed observability and health-check endpoints to monitor latency and readiness in production.",
      "Containerized the pipeline with Docker for scalable, reproducible deployment across environments.",
    ],
  },
  {
    name: "cryptowise",
    tagline: "GPT-4 powered crypto portfolio insights",
    stack: ["GPT-4 API", "Python", "REST"],
    repo: "github.com/kirthikas/cryptowise",
    demo: "github.com/kirthikas/cryptowise",
    bullets: [
      "Connected crypto wallet APIs to fetch real-time token balances and transaction histories.",
      "Aggregated live market data and crypto news via REST APIs, normalizing inputs for downstream use.",
      "Used GPT-4 to generate personalized portfolio insights, risk summaries and trend explanations.",
    ],
  },
  {
    name: "community-apps",
    tagline: "Backend services powering campus-wide events",
    stack: ["REST APIs", "Backend Services", "SQL"],
    repo: "github.com/kirthikas/community-apps",
    demo: "github.com/kirthikas/community-apps",
    bullets: [
      "Established role-based admin APIs enabling teams to publish campus-wide events and notifications.",
      "Powered real-time score-update APIs for inter-college sports events with live data ingestion.",
      "Delivered modular services for merchandise, accommodation and logistics using reusable patterns.",
    ],
  },
  {
    name: "portfolio-vscode",
    tagline: "This very editor, rebuilt in React",
    stack: ["React", "TanStack", "Tailwind"],
    repo: "github.com/kirthikas/portfolio-vscode",
    demo: "kirthika.dev",
    bullets: ["Command palette, tabs, terminal and theme switching.", "Fully keyboard navigable."],
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "languages", items: ["Python", "Java", "JavaScript", "Kotlin", "C++", "SQL", "HTML/CSS"] },
  { group: "backend", items: ["FastAPI", "Spring Boot", "Node.js", "JUnit", "Mockito"] },
  { group: "ai_and_apis", items: ["Hugging Face Transformers", "GPT-4 API", "LLM Tooling", "REST", "JSON-RPC"] },
  { group: "databases", items: ["MySQL", "PostgreSQL"] },
  { group: "tooling", items: ["Docker", "Git", "GitHub", "Jenkins (CI/CD)", "Postman", "AWS Console"] },
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
