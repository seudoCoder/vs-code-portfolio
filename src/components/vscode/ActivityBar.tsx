import { Blocks, Bug, Files, GitBranch, Search, Settings, User } from "lucide-react";
import { useWorkbench, type ActivityView } from "./workbench";

const TOP: { id: ActivityView; label: string; Icon: typeof Files; badge?: string }[] = [
  { id: "explorer", label: "Explorer  (Ctrl+Shift+E)", Icon: Files },
  { id: "search", label: "Search  (Ctrl+Shift+F)", Icon: Search },
  { id: "source-control", label: "Source Control", Icon: GitBranch, badge: "3" },
  { id: "run", label: "Run and Debug", Icon: Bug },
  { id: "extensions", label: "Extensions", Icon: Blocks },
];

export function ActivityBar() {
  const { activityView, setActivityView, sidebarOpen, setSidebarOpen } = useWorkbench();

  const select = (id: ActivityView) => {
    if (id === activityView && sidebarOpen) setSidebarOpen(false);
    else {
      setActivityView(id);
      setSidebarOpen(true);
    }
  };

  return (
    <nav className="flex w-12 shrink-0 flex-col items-center border-r border-chrome-border bg-activitybar py-1 select-none">
      {TOP.map(({ id, label, Icon, badge }) => {
        const active = activityView === id && sidebarOpen;
        return (
          <button
            key={id}
            title={label}
            aria-label={label}
            onClick={() => select(id)}
            className={`relative flex h-12 w-12 items-center justify-center transition-colors ${
              active ? "text-activitybar-active" : "text-activitybar-fg hover:text-activitybar-active"
            }`}
          >
            {active && <span className="absolute left-0 top-0 h-full w-[2px] bg-activitybar-active" />}
            <Icon className="h-6 w-6" strokeWidth={1.4} />
            {badge && (
              <span className="absolute bottom-2 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-badge px-1 text-[10px] font-semibold text-badge-fg">
                {badge}
              </span>
            )}
          </button>
        );
      })}

      <div className="mt-auto flex flex-col items-center">
        <button
          title="Accounts"
          className="flex h-12 w-12 items-center justify-center text-activitybar-fg hover:text-activitybar-active"
        >
          <User className="h-6 w-6" strokeWidth={1.4} />
        </button>
        <button
          title="Manage  (Settings)"
          aria-label="Settings"
          onClick={() => select("settings")}
          className={`relative flex h-12 w-12 items-center justify-center ${
            activityView === "settings" && sidebarOpen ? "text-activitybar-active" : "text-activitybar-fg hover:text-activitybar-active"
          }`}
        >
          {activityView === "settings" && sidebarOpen && (
            <span className="absolute left-0 top-0 h-full w-[2px] bg-activitybar-active" />
          )}
          <Settings className="h-6 w-6" strokeWidth={1.4} />
        </button>
      </div>
    </nav>
  );
}
