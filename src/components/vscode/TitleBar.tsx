import { ChevronRight, Minus, Search, Square, X } from "lucide-react";
import { useWorkbench } from "./workbench";
import { PROFILE } from "@/lib/portfolio-data";

const MENUS = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

export function TitleBar() {
  const { setPaletteOpen } = useWorkbench();

  return (
    <header className="flex h-9 shrink-0 items-center gap-2 border-b border-chrome-border bg-titlebar px-2 text-titlebar-fg select-none">
      <div className="flex items-center gap-1.5 pl-1">
        <span className="h-3 w-3 rounded-full bg-term-red" />
        <span className="h-3 w-3 rounded-full bg-term-yellow" />
        <span className="h-3 w-3 rounded-full bg-term-green" />
      </div>

      <svg viewBox="0 0 100 100" className="ml-2 h-4 w-4" aria-hidden>
        <path d="M75 10 40 45 20 30 10 36v28l10 6 20-15 35 35 15-7V17z" fill="var(--color-focus)" />
      </svg>

      <nav className="ml-1 hidden items-center md:flex">
        {MENUS.map((m) => (
          <button
            key={m}
            className="rounded-sm px-2 py-0.5 text-[12px] hover:bg-hover"
            onClick={() => setPaletteOpen(true)}
          >
            {m}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setPaletteOpen(true)}
        className="mx-auto hidden h-6 w-[38%] min-w-[220px] items-center justify-center gap-2 rounded-sm border border-chrome-border bg-widget text-[12px] text-line-number hover:border-focus sm:flex"
      >
        <Search className="h-3 w-3" />
        {PROFILE.name.toLowerCase().replace(/\s+/g, "-")}-portfolio
        <ChevronRight className="h-3 w-3 opacity-50" />
      </button>

      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <button className="rounded-sm p-1 hover:bg-hover" aria-label="Minimize">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-sm p-1 hover:bg-hover" aria-label="Maximize">
          <Square className="h-3 w-3" />
        </button>
        <button className="rounded-sm p-1 hover:bg-destructive hover:text-destructive-foreground" aria-label="Close">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
