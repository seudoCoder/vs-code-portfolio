import { Bell, Check, CircleAlert, CircleX, GitBranch, Moon, RefreshCw, Sun, Radio } from "lucide-react";
import { fileMeta, useWorkbench } from "./workbench";

export function StatusBar() {
  const { activeFile, theme, toggleTheme, setPaletteOpen, panelOpen, setPanelOpen } = useWorkbench();
  const meta = fileMeta(activeFile);

  return (
    <footer className="flex h-6 shrink-0 items-center gap-3 bg-statusbar px-2 text-[11px] text-statusbar-fg select-none">
      <button className="flex items-center gap-1 rounded-sm px-1 hover:bg-black/10">
        <GitBranch className="h-3.5 w-3.5" /> main
        <RefreshCw className="ml-1 h-3 w-3" />
      </button>
      <button onClick={() => setPanelOpen(!panelOpen)} className="flex items-center gap-2 rounded-sm px-1 hover:bg-black/10">
        <span className="flex items-center gap-1">
          <CircleX className="h-3.5 w-3.5" /> 0
        </span>
        <span className="flex items-center gap-1">
          <CircleAlert className="h-3.5 w-3.5" /> 0
        </span>
      </button>
      <span className="hidden items-center gap-1 sm:flex">
        <Radio className="h-3.5 w-3.5" /> localhost:8000 · FastAPI
      </span>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden sm:inline">Ln 1, Col 1</span>
        <span className="hidden sm:inline">Spaces: 2</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">LF</span>
        <button onClick={() => setPaletteOpen(true)} className="rounded-sm px-1 hover:bg-black/10">
          {meta.lang}
        </button>
        <button
          onClick={toggleTheme}
          title="Toggle color theme (Ctrl+K)"
          className="flex items-center gap-1 rounded-sm px-1 hover:bg-black/10"
        >
          {theme === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          {theme === "dark" ? "Dark+" : "Light+"}
        </button>
        <span className="flex items-center gap-1">
          <Check className="h-3.5 w-3.5" /> Prettier
        </span>
        <Bell className="h-3.5 w-3.5" />
      </div>
    </footer>
  );
}
