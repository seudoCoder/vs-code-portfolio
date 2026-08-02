import type { ReactNode } from "react";
import { useWorkbench } from "./workbench";

export const K = ({ children }: { children: ReactNode }) => <span className="text-syn-keyword">{children}</span>;
export const S = ({ children }: { children: ReactNode }) => <span className="text-syn-string">{children}</span>;
export const C = ({ children }: { children: ReactNode }) => <span className="text-syn-comment italic">{children}</span>;
export const F = ({ children }: { children: ReactNode }) => <span className="text-syn-func">{children}</span>;
export const V = ({ children }: { children: ReactNode }) => <span className="text-syn-var">{children}</span>;
export const N = ({ children }: { children: ReactNode }) => <span className="text-syn-number">{children}</span>;
export const T = ({ children }: { children: ReactNode }) => <span className="text-syn-type">{children}</span>;
export const A = ({ children }: { children: ReactNode }) => <span className="text-syn-attr">{children}</span>;
export const G = ({ children }: { children: ReactNode }) => <span className="text-syn-tag">{children}</span>;
export const P = ({ children }: { children: ReactNode }) => <span className="text-syn-op">{children}</span>;

/** Renders children as numbered editor lines with a minimap strip. */
export function CodeSurface({ lines }: { lines: ReactNode[] }) {
  const { fontSize, showLineNumbers, wordWrap, minimap } = useWorkbench();

  return (
    <div className="relative flex h-full">
      <div
        className="vsc-scroll flex-1 pb-24 pt-2 font-mono"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.65 }}
      >
        <div className="flex min-h-full">
          {showLineNumbers && (
            <div className="select-none pl-4 pr-4 text-right text-line-number" aria-hidden>
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <div className={`min-w-0 flex-1 pr-8 ${wordWrap ? "break-words" : "whitespace-nowrap"}`}>
            {lines.map((line, i) => (
              <div key={i} className="min-h-[1.65em]">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
      {minimap && (
        <div className="hidden w-[72px] shrink-0 select-none overflow-hidden border-l border-chrome-border/60 py-2 pl-2 opacity-45 lg:block" aria-hidden>
          {lines.map((_, i) => (
            <div
              key={i}
              className="mb-[2px] h-[2px] rounded-full bg-editor-fg"
              style={{ width: `${18 + ((i * 37) % 46)}px`, opacity: (i * 13) % 5 === 0 ? 0.2 : 0.6 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Indent({ n = 1 }: { n?: number }) {
  return <span>{"\u00a0".repeat(n * 2)}</span>;
}
