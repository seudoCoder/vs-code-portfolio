import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Download, FileCode, Moon, PanelBottom, PanelLeft, Sun, Terminal } from "lucide-react";
import { useWorkbench } from "./workbench";
import { FILES } from "@/lib/portfolio-data";

interface Cmd {
  id: string;
  label: string;
  hint?: string;
  Icon: typeof FileCode;
  run: () => void;
}

export function CommandPalette() {
  const wb = useWorkbench();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const fileCmds: Cmd[] = FILES.map((f) => ({
      id: `open-${f.id}`,
      label: `Go to File: ${f.name}`,
      hint: f.path,
      Icon: FileCode,
      run: () => wb.openFile(f.id),
    }));
    return [
      {
        id: "theme",
        label: `Preferences: Color Theme — Default ${wb.theme === "dark" ? "Light+" : "Dark+"}`,
        hint: "Ctrl+K",
        Icon: wb.theme === "dark" ? Sun : Moon,
        run: wb.toggleTheme,
      },
      {
        id: "sidebar",
        label: "View: Toggle Primary Side Bar",
        hint: "Ctrl+B",
        Icon: PanelLeft,
        run: () => wb.setSidebarOpen(!wb.sidebarOpen),
      },
      {
        id: "panel",
        label: "View: Toggle Integrated Terminal",
        hint: "Ctrl+`",
        Icon: Terminal,
        run: () => wb.setPanelOpen(!wb.panelOpen),
      },
      {
        id: "settings",
        label: "Preferences: Open Settings",
        Icon: PanelBottom,
        run: () => {
          wb.setActivityView("settings");
          wb.setSidebarOpen(true);
          wb.openFile("settings.json");
        },
      },
      {
        id: "resume",
        label: "Portfolio: Download Resume",
        Icon: Download,
        run: () => wb.openFile("resume.pdf"),
      },
      ...fileCmds,
    ];
  }, [wb]);

  const results = useMemo(() => {
    const term = q.replace(/^>/, "").trim().toLowerCase();
    if (!term) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(term) || c.hint?.toLowerCase().includes(term));
  }, [q, commands]);

  useEffect(() => {
    if (wb.paletteOpen) {
      setQ("");
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [wb.paletteOpen]);

  if (!wb.paletteOpen) return null;

  const choose = (c?: Cmd) => {
    if (!c) return;
    c.run();
    wb.setPaletteOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-black/25 pt-[52px]"
      onClick={() => wb.setPaletteOpen(false)}
    >
      <div
        role="dialog"
        aria-label="Command Palette"
        onClick={(e) => e.stopPropagation()}
        className="h-fit w-[min(640px,92vw)] overflow-hidden rounded-md border border-chrome-border bg-widget shadow-2xl"
      >
        <div className="p-2">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIdx((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIdx((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                choose(results[idx]);
              } else if (e.key === "Escape") {
                wb.setPaletteOpen(false);
              }
            }}
            placeholder="Type a command or file name…"
            className="w-full rounded-sm border border-focus bg-editor px-2 py-1.5 font-mono text-[13px] text-editor-fg outline-none placeholder:text-line-number"
          />
        </div>
        <ul className="vsc-scroll max-h-[52vh] pb-2">
          {results.length === 0 && (
            <li className="px-4 py-2 font-mono text-[12px] text-line-number">No matching commands</li>
          )}
          {results.map((c, i) => (
            <li key={c.id}>
              <button
                onMouseEnter={() => setIdx(i)}
                onClick={() => choose(c)}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-left font-mono text-[12.5px] ${
                  i === idx ? "bg-list-active text-editor-fg" : "text-editor-fg/85 hover:bg-hover"
                }`}
              >
                <c.Icon className="h-4 w-4 shrink-0 text-syn-attr" />
                <span className="truncate">{c.label}</span>
                {c.hint && <span className="ml-auto shrink-0 truncate pl-3 text-[11px] text-line-number">{c.hint}</span>}
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
