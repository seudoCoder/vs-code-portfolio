import { createFileRoute } from "@tanstack/react-router";
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

const title = `${PROFILE.name} — MERN Developer Portfolio, built as VS Code`;
const description =
  "An interactive VS Code themed portfolio: explorer, tabs, integrated terminal, command palette and light/dark themes. Full-stack MERN work, experience and projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

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

function Index() {
  return (
    <WorkbenchProvider>
      <Workbench />
    </WorkbenchProvider>
  );
}
