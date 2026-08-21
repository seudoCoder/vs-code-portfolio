from fastapi import APIRouter

router = APIRouter(tags=["portfolio"])


PROFILE = {
    "name": "Kirthika S",
    "role": "Software Engineer · AI Developer Tooling",
    "location": "Chennai, India",
    "email": "kirthikasubbu7@gmail.com",
    "phone": "+91 99625 28099",
    "github": "github.com/seudoCoder",
    "linkedin": "linkedin.com/in/kirthikasubramani",
    "website": "seudocoder.onrender.com/",
    "summary": (
        "Curious, fast-learning Software Engineer driven by a passion for "
        "AI-powered developer tooling, automation and full-stack systems. "
        "I thrive on exploring new technologies and turning that curiosity "
        "into clean, scalable engineering solutions."
    ),
}

EXPERIENCE = [
    {
        "company": "Comcast — AgentBuilder",
        "role": "Engineer I",
        "period": "Jun 2026 — Present",
        "stack": ["Python", "LLM Tooling", "Automation", "CI/CD"],
        "points": [
            "Build AI-powered developer tools that apply LLM automation to accelerate internal testing workflows.",
            "Design and maintain automated regression and progression testing scripts, cutting manual QA effort.",
            "Promoted to full-time Engineer I after a 6-month internship (Jan — Jun 2026) on the same team.",
        ],
    },
    {
        "company": "Fidelity Investments",
        "role": "Full-Stack Engineering Intern",
        "period": "May 2025 — Jul 2025",
        "stack": ["Java", "Spring Boot", "JSON-RPC", "JUnit", "Mockito"],
        "points": [
            "Engineered a crypto reconciliation system in Java Spring Boot, cutting manual reconciliation effort by 80%.",
            "Implemented scheduled JSON-RPC integrations to fetch live blockchain data for accurate transaction reporting.",
            "Developed JUnit and Mockito test suites achieving 98% coverage across core reconciliation services.",
        ],
    },
    {
        "company": "White House Business Solutions",
        "role": "Mobile App Development Intern",
        "period": "May 2024",
        "stack": ["Kotlin", "Android", "REST", "Auth"],
        "points": [
            "Launched a real-time Android productivity-tracking app with task workflows and state management.",
            "Shipped secure REST APIs with token-based authentication, reaching 100+ internal downloads.",
        ],
    },
]

EDUCATION = [
    {
        "school": "SASTRA Deemed University",
        "degree": "B.Tech, Computer Science and Business Systems",
        "period": "Aug 2022 — Jun 2026",
        "detail": "Thanjavur, India. GDSC Android Development Lead, CISCO Campus Ambassador, Team 1nf1n1ty CTF core member.",
        "score": "B.Tech CSBS",
    },
    {
        "school": "The Study L'ecole Internationale",
        "degree": "Class XII",
        "period": "2022",
        "detail": "Chennai, India.",
        "score": "94.0%",
    },
]

PROJECTS = [
    {
        "name": "Fintankz",
        "tagline": "Learn the basics of finance, simply",
        "stack": ["React", "FastAPI", "MongoDB"],
        "repo": "instagram.com/fintankz",
        "demo": "fintankz.onrender.com",
        "bullets": [
            "Founded Fintankz — a passion-driven brand that helps people understand the basics of finance.",
            "Built a full-stack web app with a React frontend, FastAPI backend and MongoDB data layer.",
            "Growing an engaged community via Instagram (@fintankz) alongside the live platform.",
        ],
    },
    {
        "name": "cryptowise",
        "tagline": "GPT-4 powered crypto portfolio insights",
        "stack": ["GPT-4 API", "Python", "REST"],
        "repo": "github.com/seudoCoder/cryptowise",
        "demo": "github.com/seudoCoder/cryptowise",
        "bullets": [
            "Connected crypto wallet APIs to fetch real-time token balances and transaction histories.",
            "Aggregated live market data and crypto news via REST APIs, normalizing inputs for downstream use.",
            "Used GPT-4 to generate personalized portfolio insights, risk summaries and trend explanations.",
        ],
    },
    {
        "name": "community-apps",
        "tagline": "Backend services powering campus-wide events",
        "stack": ["REST APIs", "Backend Services", "SQL"],
        "repo": "github.com/seudoCoder/community-apps",
        "demo": "github.com/seudoCoder/community-apps",
        "bullets": [
            "Established role-based admin APIs enabling teams to publish campus-wide events and notifications.",
            "Powered real-time score-update APIs for inter-college sports events with live data ingestion.",
            "Delivered modular services for merchandise, accommodation and logistics using reusable patterns.",
        ],
    },
    {
        "name": "portfolio-vscode",
        "tagline": "This very editor, rebuilt in React",
        "stack": ["React", "FastAPI", "Tailwind"],
        "repo": "github.com/seudoCoder/portfolio-vscode",
        "demo": "kirthika.dev",
        "bullets": [
            "Command palette, tabs, terminal and theme switching.",
            "Fully keyboard navigable.",
        ],
    },
]

SKILLS = [
    {"group": "languages", "items": ["Python", "Java", "JavaScript", "Kotlin", "C++", "SQL", "HTML/CSS"]},
    {"group": "backend", "items": ["FastAPI", "Spring Boot", "Node.js", "JUnit", "Mockito"]},
    {"group": "ai_and_apis", "items": ["Hugging Face Transformers", "GPT-4 API", "LLM Tooling", "REST", "JSON-RPC"]},
    {"group": "databases", "items": ["MySQL", "PostgreSQL"]},
    {"group": "tooling", "items": ["Docker", "Git", "GitHub", "Jenkins (CI/CD)", "Postman", "AWS Console"]},
]


@router.get("/profile")
def get_profile():
    return PROFILE


@router.get("/experience")
def get_experience():
    return EXPERIENCE


@router.get("/education")
def get_education():
    return EDUCATION


@router.get("/projects")
def get_projects():
    return PROJECTS


@router.get("/skills")
def get_skills():
    return SKILLS
