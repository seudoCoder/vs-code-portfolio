import { Routes, Route, Link } from "react-router-dom";
import { ActivityBar } from "@/components/vscode/ActivityBar";
import { CommandPalette } from "@/components/vscode/CommandPalette";
import { FileView } from "@/components/vscode/FileViews";
import { Sidebar } from "@/components/vscode/Sidebar";
import { StatusBar } from "@/components/vscode/StatusBar";
import { TabsBar } from "@/components/vscode/TabsBar";
import { TerminalPanel } from "@/components/vscode/TerminalPanel";
import { TitleBar } from "@/components/vscode/TitleBar";
import { WorkbenchProvider, useWorkbench } from "@/components/vscode/workbench";
import { PROFILE } from "@/lib/portfolio-data";

function Workbench() {
  const { activeFile, openTabs, panelOpen } = useWorkbench();

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-editor text-editor-fg">
      <TitleBar />
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col">
          <TabsBar />
          <div className="min-h-0 flex-1 bg-editor">
            {openTabs.length ? (
              <FileView id={activeFile} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 font-mono text-[13px] text-line-number">
                <p>Show All Commands — Ctrl + Shift + P</p>
                <p>Open File — Ctrl + P</p>
                <p>Toggle Terminal — Ctrl + `</p>
              </div>
            )}
          </div>
          {panelOpen && (
            <div className="h-[38%] min-h-[180px] shrink-0">
              <TerminalPanel />
            </div>
          )}
        </main>
      </div>
      <StatusBar />
      <CommandPalette />
      <h1 className="sr-only">
        {PROFILE.name} — {PROFILE.role} portfolio
      </h1>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WorkbenchProvider>
            <Workbench />
          </WorkbenchProvider>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
