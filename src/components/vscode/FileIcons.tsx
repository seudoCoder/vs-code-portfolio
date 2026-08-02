import type { FileId } from "@/lib/portfolio-data";

/** Seti-style file type icons rendered as small colored glyphs. */
export function FileIcon({ id, className = "" }: { id: FileId; className?: string }) {
  const base = `inline-block h-4 w-4 shrink-0 ${className}`;
  switch (id) {
    case "about.md":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="var(--color-syn-tag)" strokeWidth="1.6" />
          <path d="M6 15V9l3 3 3-3v6M17 9v6m0 0-2-2m2 2 2-2" stroke="var(--color-syn-tag)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "experience.json":
    case "settings.json":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path d="M9 3C6.5 3 7 8 4 8c3 0 2.5 5 5 5" stroke="var(--color-syn-func)" strokeWidth="1.6" strokeLinecap="round" transform="translate(0,3.5)" />
          <path d="M15 3c2.5 0 2 5 5 5-3 0-2.5 5-5 5" stroke="var(--color-syn-func)" strokeWidth="1.6" strokeLinecap="round" transform="translate(0,3.5)" />
        </svg>
      );
    case "education.ts":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <rect x="3" y="3" width="18" height="18" rx="2" fill="var(--color-syn-tag)" />
          <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-editor)">
            TS
          </text>
        </svg>
      );
    case "projects.tsx":
    case "contact.jsx":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none" stroke="var(--color-syn-type)" strokeWidth="1.4">
          <circle cx="12" cy="12" r="2" fill="var(--color-syn-type)" stroke="none" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case "skills.js":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <rect x="3" y="3" width="18" height="18" rx="2" fill="var(--color-syn-func)" />
          <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-editor)">
            JS
          </text>
        </svg>
      );
    case "resume.pdf":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path d="M6 3h8l4 4v14H6z" stroke="var(--color-term-red)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 3v4h4" stroke="var(--color-term-red)" strokeWidth="1.6" strokeLinejoin="round" />
          <text x="12" y="18" textAnchor="middle" fontSize="6" fontWeight="700" fill="var(--color-term-red)">
            PDF
          </text>
        </svg>
      );
    default:
      return <span className={base} />;
  }
}

export function FolderIcon({ open, name }: { open: boolean; name: string }) {
  const color =
    name === ".vscode" ? "var(--color-syn-tag)" : name === "public" ? "var(--color-term-yellow)" : "var(--color-syn-type)";
  return (
    <svg viewBox="0 0 24 24" className="inline-block h-4 w-4 shrink-0" fill="none">
      {open ? (
        <path d="M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v1H6l-2 9H3z" fill={color} opacity="0.85" />
      ) : (
        <path d="M3 6a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" fill={color} opacity="0.85" />
      )}
      {open && <path d="M6 9h15l-3 9H3z" fill={color} opacity="0.55" />}
    </svg>
  );
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}`} fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
