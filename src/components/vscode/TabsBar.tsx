import { ChevronRight, Columns2, Ellipsis, SplitSquareHorizontal, X } from "lucide-react";
import { FileIcon } from "./FileIcons";
import { fileMeta, useWorkbench } from "./workbench";

export function TabsBar() {
  const { openTabs, activeFile, openFile, closeFile } = useWorkbench();
  const meta = fileMeta(activeFile);

  return (
    <div className="shrink-0 select-none border-b border-chrome-border bg-tabbar">
      <div className="flex items-stretch">
        <div className="vsc-scroll flex flex-1 items-stretch overflow-x-auto">
          {openTabs.map((id) => {
            const f = fileMeta(id);
            const active = id === activeFile;
            return (
              <div
                key={id}
                onClick={() => openFile(id)}
                className={`group relative flex h-9 min-w-[130px] cursor-pointer items-center gap-2 border-r border-chrome-border px-3 text-[13px] ${
                  active ? "bg-tab-active text-tab-active-fg" : "bg-tab-inactive text-tab-fg hover:text-tab-active-fg"
                }`}
              >
                {active && <span className="absolute left-0 top-0 h-[1.5px] w-full bg-focus" />}
                <FileIcon id={id} />
                <span className={`truncate ${id === "resume.pdf" ? "italic" : ""}`}>{f.name}</span>
                <button
                  aria-label={`Close ${f.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(id);
                  }}
                  className={`ml-auto rounded-sm p-0.5 hover:bg-hover ${active ? "opacity-80" : "opacity-0 group-hover:opacity-80"}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-1 px-2 text-tab-fg">
          <SplitSquareHorizontal className="h-4 w-4" />
          <Columns2 className="h-4 w-4" />
          <Ellipsis className="h-4 w-4" />
        </div>
      </div>

      {openTabs.length > 0 && (
        <div className="flex h-6 items-center gap-1 bg-tab-active px-3 font-mono text-[11px] text-line-number">
          {meta.path.split("/").map((seg, idx, arr) => (
            <span key={seg + idx} className="flex items-center gap-1">
              {idx > 0 && <ChevronRight className="h-3 w-3" />}
              <span className={idx === arr.length - 1 ? "text-tab-active-fg" : ""}>{seg}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
