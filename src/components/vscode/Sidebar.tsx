import { useState } from "react";
import { Check, Ellipsis, GitCommitVertical, Play, RefreshCw, Search, Star } from "lucide-react";
import { Chevron, FileIcon, FolderIcon } from "./FileIcons";
import { useWorkbench } from "./workbench";
import { FILES, FOLDERS, PROFILE, PROJECTS, type FileId } from "@/lib/portfolio-data";

function SectionHeader({ title, actions }: { title: string; actions?: React.ReactNode }) {
  return (
    <div className="flex h-9 shrink-0 items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-wider text-sidebar-section">
      <span>{title}</span>
      <span className="flex items-center gap-1.5 opacity-70">{actions}</span>
    </div>
  );
}

function Explorer() {
  const { activeFile, openFile } = useWorkbench();
  const [open, setOpen] = useState<Record<string, boolean>>({ src: true, public: true, ".vscode": false });
  const [rootOpen, setRootOpen] = useState(true);

  return (
    <div className="flex h-full flex-col">
      <SectionHeader title="Explorer" actions={<Ellipsis className="h-4 w-4" />} />
      <div className="vsc-scroll flex-1 pb-4 text-[13px]">
        <button
          onClick={() => setRootOpen((o) => !o)}
          className="flex w-full items-center gap-1 px-2 py-[3px] text-[11px] font-bold uppercase tracking-wide text-sidebar-fg hover:bg-hover"
        >
          <Chevron open={rootOpen} />
          <span className="truncate">{PROFILE.name.toLowerCase().replace(/\s+/g, "-")}-portfolio</span>
        </button>
        {rootOpen &&
          FOLDERS.map((folder) => (
            <div key={folder.name}>
              <button
                onClick={() => setOpen((o) => ({ ...o, [folder.name]: !o[folder.name] }))}
                className="flex w-full items-center gap-1 py-[3px] pl-4 pr-2 text-sidebar-fg hover:bg-hover"
              >
                <Chevron open={!!open[folder.name]} />
                <FolderIcon open={!!open[folder.name]} name={folder.name} />
                <span className="truncate">{folder.name}</span>
              </button>
              {open[folder.name] &&
                folder.files.map((id) => {
                  const f = FILES.find((x) => x.id === id)!;
                  const active = activeFile === id;
                  return (
                    <button
                      key={id}
                      onClick={() => openFile(id)}
                      className={`flex w-full items-center gap-2 py-[3px] pl-11 pr-2 text-left ${
                        active ? "bg-list-active text-sidebar-fg" : "text-sidebar-fg hover:bg-hover"
                      }`}
                    >
                      <FileIcon id={id} />
                      <span className="truncate">{f.name}</span>
                    </button>
                  );
                })}
            </div>
          ))}

        <div className="mt-3 border-t border-chrome-border pt-1">
          <div className="px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-section">Outline</div>
          {["About", "Experience", "Education", "Projects", "Skills", "Contact"].map((s, idx) => (
            <button
              key={s}
              onClick={() => openFile(FILES[idx]!.id)}
              className="flex w-full items-center gap-2 py-[3px] pl-8 pr-2 text-left text-sidebar-fg hover:bg-hover"
            >
              <span className="text-syn-func">§</span>
              <span className="truncate">{s}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchView() {
  const { openFile } = useWorkbench();
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const hits = term
    ? FILES.filter((f) => f.name.toLowerCase().includes(term) || f.lang.toLowerCase().includes(term))
    : [];

  return (
    <div className="flex h-full flex-col">
      <SectionHeader title="Search" />
      <div className="px-3">
        <div className="flex items-center gap-2 rounded-sm border border-chrome-border bg-widget px-2 py-1 focus-within:border-focus">
          <Search className="h-3.5 w-3.5 text-line-number" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search files"
            className="w-full bg-transparent font-mono text-[12px] text-sidebar-fg outline-none placeholder:text-line-number"
          />
        </div>
      </div>
      <div className="vsc-scroll mt-2 flex-1 text-[13px]">
        {term && hits.length === 0 && <p className="px-4 py-2 text-line-number">No results found.</p>}
        {hits.map((f) => (
          <button
            key={f.id}
            onClick={() => openFile(f.id)}
            className="flex w-full items-center gap-2 px-4 py-[3px] text-left text-sidebar-fg hover:bg-hover"
          >
            <FileIcon id={f.id} />
            <span className="truncate">{f.name}</span>
            <span className="ml-auto truncate text-[11px] text-line-number">{f.folder}</span>
          </button>
        ))}
        {!term && <p className="px-4 py-2 text-line-number">Type to search the workspace.</p>}
      </div>
    </div>
  );
}

function SourceControl() {
  const changes = [
    { file: "about.md", tag: "M" },
    { file: "projects.tsx", tag: "M" },
    { file: "resume.pdf", tag: "U" },
  ] as { file: FileId; tag: string }[];
  const { openFile } = useWorkbench();

  return (
    <div className="flex h-full flex-col">
      <SectionHeader title="Source Control" actions={<RefreshCw className="h-3.5 w-3.5" />} />
      <div className="px-3">
        <input
          readOnly
          value="feat: refresh portfolio content"
          className="w-full rounded-sm border border-chrome-border bg-widget px-2 py-1 font-mono text-[12px] text-sidebar-fg outline-none"
        />
        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-sm bg-statusbar px-2 py-1 text-[12px] text-statusbar-fg">
          <Check className="h-3.5 w-3.5" /> Commit
        </button>
      </div>
      <div className="mt-3 text-[13px]">
        <div className="px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-section">
          Changes <span className="ml-1 rounded-full bg-badge px-1.5 text-badge-fg">{changes.length}</span>
        </div>
        {changes.map((c) => (
          <button
            key={c.file}
            onClick={() => openFile(c.file)}
            className="flex w-full items-center gap-2 px-4 py-[3px] text-left text-sidebar-fg hover:bg-hover"
          >
            <FileIcon id={c.file} />
            <span className="truncate">{c.file}</span>
            <span className={`ml-auto font-mono text-[11px] ${c.tag === "M" ? "text-term-yellow" : "text-term-green"}`}>
              {c.tag}
            </span>
          </button>
        ))}
        <div className="mt-4 space-y-1 px-4 text-[12px] text-line-number">
          {["a1c9f02  feat: add command palette", "7b21e4d  chore: bump deps", "3f80ac1  fix: dark theme contrast"].map(
            (c) => (
              <div key={c} className="flex items-center gap-2 font-mono">
                <GitCommitVertical className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{c}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function RunDebug() {
  return (
    <div className="flex h-full flex-col">
      <SectionHeader title="Run and Debug" />
      <div className="px-4 text-[13px] text-sidebar-fg">
        <button className="flex w-full items-center gap-2 rounded-sm border border-chrome-border bg-widget px-2 py-1 hover:border-focus">
          <Play className="h-3.5 w-3.5 text-term-green" /> Launch FastAPI + Vite dev
        </button>
        <p className="mt-3 text-line-number">
          Runs <span className="font-mono text-syn-string">uvicorn app.main:app --reload</span> and{" "}
          <span className="font-mono text-syn-string">vite dev</span> concurrently.
        </p>
        <div className="mt-4 space-y-1 font-mono text-[12px]">
          <div className="text-[11px] uppercase tracking-wider text-sidebar-section">Variables</div>
          <div>
            <span className="text-syn-var">ENV</span>
            <span className="text-syn-op">: </span>
            <span className="text-syn-string">"development"</span>
          </div>
          <div>
            <span className="text-syn-var">DATABASE_URL</span>
            <span className="text-syn-op">: </span>
            <span className="text-syn-string">"postgresql://localhost:5432/portfolio"</span>
          </div>
          <div>
            <span className="text-syn-var">PORT</span>
            <span className="text-syn-op">: </span>
            <span className="text-syn-number">8000</span>
          </div>
        </div>

      </div>
    </div>
  );
}

function Extensions() {
  const exts = [
    { name: "ESLint", pub: "Microsoft", d: "Integrates ESLint into VS Code." },
    { name: "Prettier", pub: "Prettier", d: "Code formatter using prettier." },
    { name: "Python", pub: "Microsoft", d: "IntelliSense, linting and debugging for Python." },
    { name: "Tailwind CSS IntelliSense", pub: "Tailwind Labs", d: "Autocomplete and linting." },
    { name: "GitLens", pub: "GitKraken", d: "Supercharge Git inside the editor." },
  ];
  return (
    <div className="flex h-full flex-col">
      <SectionHeader title="Extensions" />
      <div className="vsc-scroll flex-1 px-3 pb-4">
        {exts.map((e) => (
          <div key={e.name} className="flex gap-3 rounded-sm px-1 py-2 hover:bg-hover">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-chrome-border bg-widget font-mono text-[13px] text-syn-func">
              {e.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[13px] font-medium text-sidebar-fg">{e.name}</span>
                <Star className="h-3 w-3 text-term-yellow" />
              </div>
              <p className="truncate text-[11px] text-line-number">{e.d}</p>
              <p className="text-[11px] text-sidebar-section">{e.pub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (b: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1.5 text-[13px] text-sidebar-fg">
      <span>{label}</span>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`h-4 w-8 shrink-0 rounded-full border border-chrome-border transition-colors ${value ? "bg-statusbar" : "bg-widget"}`}
      >
        <span
          className={`block h-3 w-3 rounded-full bg-sidebar-fg transition-transform ${value ? "translate-x-4" : "translate-x-0.5"}`}
        />
      </button>
    </label>
  );
}

function SettingsPanel() {
  const wb = useWorkbench();
  return (
    <div className="flex h-full flex-col">
      <SectionHeader title="Settings" />
      <div className="vsc-scroll flex-1 px-4 pb-6">
        <div className="text-[11px] uppercase tracking-wider text-sidebar-section">Color Theme</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["dark", "light"] as const).map((t) => (
            <button
              key={t}
              onClick={() => wb.setTheme(t)}
              className={`rounded-sm border px-2 py-2 text-left text-[12px] ${
                wb.theme === t ? "border-focus text-sidebar-fg" : "border-chrome-border text-line-number hover:border-focus"
              }`}
            >
              <span className="block font-mono">{t === "dark" ? "Default Dark+" : "Default Light+"}</span>
              <span className="mt-1 flex gap-1">
                <span className={`h-3 w-3 rounded-sm ${t === "dark" ? "bg-[#1e1e1e]" : "bg-white"} border border-chrome-border`} />
                <span className="h-3 w-3 rounded-sm bg-syn-keyword" />
                <span className="h-3 w-3 rounded-sm bg-syn-string" />
                <span className="h-3 w-3 rounded-sm bg-syn-func" />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 text-[11px] uppercase tracking-wider text-sidebar-section">Editor</div>
        <label className="mt-2 block text-[13px] text-sidebar-fg">
          Font size <span className="font-mono text-line-number">{wb.fontSize}px</span>
          <input
            type="range"
            min={11}
            max={20}
            value={wb.fontSize}
            onChange={(e) => wb.setFontSize(Number(e.target.value))}
            className="mt-1 w-full accent-[var(--color-focus)]"
          />
        </label>
        <Toggle label="Line numbers" value={wb.showLineNumbers} onChange={wb.setShowLineNumbers} />
        <Toggle label="Word wrap" value={wb.wordWrap} onChange={wb.setWordWrap} />
        <Toggle label="Minimap" value={wb.minimap} onChange={wb.setMinimap} />
        <Toggle label="Integrated terminal" value={wb.panelOpen} onChange={wb.setPanelOpen} />

        <div className="mt-5 text-[11px] uppercase tracking-wider text-sidebar-section">Workspace</div>
        <p className="mt-1 font-mono text-[12px] text-line-number">
          {PROJECTS.length} projects · {FILES.length} files · MongoDB + Express + React + Node
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { activityView } = useWorkbench();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-chrome-border bg-sidebar text-sidebar-fg select-none md:flex md:flex-col">
      {activityView === "explorer" && <Explorer />}
      {activityView === "search" && <SearchView />}
      {activityView === "source-control" && <SourceControl />}
      {activityView === "run" && <RunDebug />}
      {activityView === "extensions" && <Extensions />}
      {activityView === "settings" && <SettingsPanel />}
    </aside>
  );
}
