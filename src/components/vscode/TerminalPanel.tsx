import { useEffect, useRef, useState } from "react";
import { ChevronUp, Plus, Trash2, X } from "lucide-react";
import { useWorkbench } from "./workbench";
import { EXPERIENCE, FILES, PROFILE, PROJECTS, SKILLS, TERMINAL_INTRO, type FileId } from "@/lib/portfolio-data";

type Kind = "cmd" | "out" | "ok" | "err" | "dim" | "info";
interface Line {
  kind: Kind;
  text: string;
}

const TABS = ["TERMINAL", "PROBLEMS", "OUTPUT", "DEBUG CONSOLE", "PORTS"];

const cls: Record<Kind, string> = {
  cmd: "text-editor-fg",
  out: "text-editor-fg",
  ok: "text-term-green",
  err: "text-term-red",
  dim: "text-line-number",
  info: "text-term-cyan",
};

export function TerminalPanel() {
  const { setPanelOpen, openFile, toggleTheme, theme } = useWorkbench();
  const [tab, setTab] = useState("TERMINAL");
  const [lines, setLines] = useState<Line[]>(TERMINAL_INTRO);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const push = (...l: Line[]) => setLines((prev) => [...prev, ...l]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    push({ kind: "cmd", text: `$ ${cmd}` });
    const [name, arg] = cmd.split(/\s+/);
    switch ((name ?? "").toLowerCase()) {
      case "":
        break;
      case "help":
        push(
          { kind: "info", text: "Available commands:" },
          { kind: "out", text: "  whoami        print profile summary" },
          { kind: "out", text: "  ls            list workspace files" },
          { kind: "out", text: "  open <file>   open a file in the editor" },
          { kind: "out", text: "  experience    list roles" },
          { kind: "out", text: "  projects      list projects" },
          { kind: "out", text: "  skills        list stack" },
          { kind: "out", text: "  resume        download resume.pdf" },
          { kind: "out", text: "  theme         toggle light/dark" },
          { kind: "out", text: "  clear         clear the terminal" },
        );
        break;
      case "whoami":
        push(
          { kind: "ok", text: PROFILE.name },
          { kind: "out", text: PROFILE.role },
          { kind: "dim", text: PROFILE.summary },
        );
        break;
      case "ls":
        push({ kind: "out", text: FILES.map((f) => f.name).join("   ") });
        break;
      case "open": {
        const target = FILES.find((f) => f.name === arg || f.id === arg);
        if (target) {
          openFile(target.id as FileId);
          push({ kind: "ok", text: `Opened ${target.path}` });
        } else push({ kind: "err", text: `open: ${arg ?? ""}: no such file` });
        break;
      }
      case "experience":
        EXPERIENCE.forEach((j) => push({ kind: "out", text: `${j.period}  ${j.role} @ ${j.company}` }));
        break;
      case "projects":
        PROJECTS.forEach((p) => push({ kind: "out", text: `${p.name.padEnd(18)} ${p.tagline}` }));
        break;
      case "skills":
        SKILLS.forEach((g) => push({ kind: "out", text: `${g.group.padEnd(10)} ${g.items.join(", ")}` }));
        break;
      case "resume":
        push({ kind: "ok", text: "Downloading resume.pdf ..." });
        openFile("resume.pdf");
        break;
      case "theme":
        toggleTheme();
        push({ kind: "ok", text: `Color theme set to Default ${theme === "dark" ? "Light+" : "Dark+"}` });
        break;
      case "clear":
        setLines([]);
        return;
      default:
        push({ kind: "err", text: `zsh: command not found: ${name}` });
    }
  };

  return (
    <section className="flex h-full flex-col border-t border-chrome-border bg-panel" onClick={() => inputRef.current?.focus()}>
      <div className="flex h-9 shrink-0 items-center gap-4 border-b border-chrome-border px-4 select-none">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={(e) => {
              e.stopPropagation();
              setTab(t);
            }}
            className={`relative py-2 text-[11px] font-medium uppercase tracking-wider ${
              tab === t ? "text-editor-fg" : "text-line-number hover:text-editor-fg"
            }`}
          >
            {t}
            {tab === t && <span className="absolute -bottom-[1px] left-0 h-[1.5px] w-full bg-focus" />}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-line-number">
          <Plus className="h-4 w-4" />
          <Trash2 className="h-4 w-4" />
          <button onClick={() => setPanelOpen(false)} aria-label="Collapse panel">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button onClick={() => setPanelOpen(false)} aria-label="Close panel">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {tab === "TERMINAL" ? (
        <div className="vsc-scroll flex-1 px-4 py-2 font-mono text-[12.5px] leading-relaxed">
          {lines.map((l, idx) => (
            <div key={idx} className={cls[l.kind]}>
              {l.text}
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
              setInput("");
            }}
            className="flex items-center gap-2"
          >
            <span className="text-term-green">➜</span>
            <span className="text-term-cyan">portfolio</span>
            <span className="text-term-magenta">git:(main)</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              aria-label="Terminal input"
              className="flex-1 bg-transparent text-editor-fg outline-none"
            />
          </form>
          <div ref={endRef} />
        </div>
      ) : (
        <div className="flex-1 px-4 py-3 font-mono text-[12.5px] text-line-number">
          {tab === "PROBLEMS" && "No problems have been detected in the workspace."}
          {tab === "OUTPUT" && "[info] MongoDB driver connected · pool size 10"}
          {tab === "DEBUG CONSOLE" && "Debugger listening on ws://127.0.0.1:9229"}
          {tab === "PORTS" && "5173 → vite   ·   5000 → express api   ·   27017 → mongod"}
        </div>
      )}
    </section>
  );
}
