import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { FILES, type FileId } from "@/lib/portfolio-data";

export type ThemeName = "dark" | "light";
export type ActivityView = "explorer" | "search" | "source-control" | "run" | "extensions" | "settings";

interface WorkbenchState {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
  fontSize: number;
  setFontSize: (n: number) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (b: boolean) => void;
  wordWrap: boolean;
  setWordWrap: (b: boolean) => void;
  minimap: boolean;
  setMinimap: (b: boolean) => void;
  openTabs: FileId[];
  activeFile: FileId;
  openFile: (id: FileId) => void;
  closeFile: (id: FileId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (b: boolean) => void;
  activityView: ActivityView;
  setActivityView: (v: ActivityView) => void;
  panelOpen: boolean;
  setPanelOpen: (b: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (b: boolean) => void;
}

const Ctx = createContext<WorkbenchState | null>(null);

export function WorkbenchProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("dark");
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const [minimap, setMinimap] = useState(true);
  const [openTabs, setOpenTabs] = useState<FileId[]>(["about.md", "experience.json", "projects.tsx"]);
  const [activeFile, setActiveFile] = useState<FileId>("about.md");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activityView, setActivityView] = useState<ActivityView>("explorer");
  const [panelOpen, setPanelOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("vsc-theme");
    if (stored === "light" || stored === "dark") setThemeState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("vsc-theme", theme);
  }, [theme]);

  const setTheme = useCallback((t: ThemeName) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), []);

  const openFile = useCallback((id: FileId) => {
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    setActiveFile(id);
  }, []);

  const closeFile = useCallback(
    (id: FileId) => {
      setOpenTabs((tabs) => {
        const next = tabs.filter((t) => t !== id);
        if (id === activeFile && next.length) setActiveFile(next[Math.max(0, tabs.indexOf(id) - 1)] ?? next[0]!);
        return next;
      });
    },
    [activeFile],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (mod && e.key.toLowerCase() === "p" && !e.shiftKey) {
        e.preventDefault();
        setPaletteOpen(true);
      } else if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((o) => !o);
      } else if (mod && e.key === "`") {
        e.preventDefault();
        setPanelOpen((o) => !o);
      } else if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setThemeState((t) => (t === "dark" ? "light" : "dark"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<WorkbenchState>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      fontSize,
      setFontSize,
      showLineNumbers,
      setShowLineNumbers,
      wordWrap,
      setWordWrap,
      minimap,
      setMinimap,
      openTabs,
      activeFile,
      openFile,
      closeFile,
      sidebarOpen,
      setSidebarOpen,
      activityView,
      setActivityView,
      panelOpen,
      setPanelOpen,
      paletteOpen,
      setPaletteOpen,
    }),
    [
      theme,
      setTheme,
      toggleTheme,
      fontSize,
      showLineNumbers,
      wordWrap,
      minimap,
      openTabs,
      activeFile,
      openFile,
      closeFile,
      sidebarOpen,
      activityView,
      panelOpen,
      paletteOpen,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWorkbench() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWorkbench must be used inside WorkbenchProvider");
  return ctx;
}

export const fileMeta = (id: FileId) => FILES.find((f) => f.id === id)!;
