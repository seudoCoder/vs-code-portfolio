import { Download, ExternalLink, Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { A, C, CodeSurface, F, G, Indent, K, N, P, S, T, V } from "./CodeSurface";
import { useWorkbench } from "./workbench";
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS, type FileId } from "@/lib/portfolio-data";

const i = (n: number) => <Indent n={n} />;

/* ---------------------------------- about.md --------------------------------- */
function AboutView() {
  const lines: ReactNode[] = [
    <span className="text-syn-tag font-bold"># {PROFILE.name}</span>,
    <span className="text-syn-comment">## {PROFILE.role}</span>,
    <></>,
    <span className="text-editor-fg">{PROFILE.summary}</span>,
    <></>,
    <span className="text-syn-tag font-bold">## Highlights</span>,
    ...PROFILE.highlights.map((h) => (
      <span className="text-editor-fg">
        <P>- </P>
        {h}
      </span>
    )),
    <></>,
    <span className="text-syn-tag font-bold">## Contact</span>,
    <span>
      <P>- </P>
      <span className="inline-flex items-center gap-1.5 align-middle">
        <MapPin className="h-3.5 w-3.5 text-syn-attr" /> {PROFILE.location}
      </span>
    </span>,
    <span>
      <P>- </P>
      <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1.5 align-middle text-syn-string underline-offset-4 hover:underline">
        <Mail className="h-3.5 w-3.5" /> {PROFILE.email}
      </a>
    </span>,
    <span>
      <P>- </P>
      <a href={`https://${PROFILE.github}`} className="inline-flex items-center gap-1.5 align-middle text-syn-string underline-offset-4 hover:underline">
        <Github className="h-3.5 w-3.5" /> {PROFILE.github}
      </a>
    </span>,
    <span>
      <P>- </P>
      <a href={`https://${PROFILE.linkedin}`} className="inline-flex items-center gap-1.5 align-middle text-syn-string underline-offset-4 hover:underline">
        <Linkedin className="h-3.5 w-3.5" /> {PROFILE.linkedin}
      </a>
    </span>,
    <></>,
    <span className="text-syn-comment">&lt;!-- Placeholder content. Swap in your real details. --&gt;</span>,
  ];
  return <CodeSurface lines={lines} />;
}

/* ------------------------------ experience.json ------------------------------ */
function ExperienceView() {
  const lines: ReactNode[] = [<P>{"{"}</P>, <span>{i(1)}<A>"experience"</A><P>: [</P></span>];
  EXPERIENCE.forEach((job, idx) => {
    lines.push(<span>{i(2)}<P>{"{"}</P></span>);
    lines.push(<span>{i(3)}<A>"company"</A><P>: </P><S>"{job.company}"</S><P>,</P></span>);
    lines.push(<span>{i(3)}<A>"role"</A><P>: </P><S>"{job.role}"</S><P>,</P></span>);
    lines.push(<span>{i(3)}<A>"period"</A><P>: </P><S>"{job.period}"</S><P>,</P></span>);
    lines.push(
      <span>
        {i(3)}<A>"stack"</A><P>: [</P>
        {job.stack.map((s, k) => (
          <span key={s}>
            <S>"{s}"</S>
            {k < job.stack.length - 1 && <P>, </P>}
          </span>
        ))}
        <P>],</P>
      </span>,
    );
    lines.push(<span>{i(3)}<A>"impact"</A><P>: [</P></span>);
    job.points.forEach((p, k) => {
      lines.push(
        <span>
          {i(4)}<S>"{p}"</S>
          {k < job.points.length - 1 && <P>,</P>}
        </span>,
      );
    });
    lines.push(<span>{i(3)}<P>]</P></span>);
    lines.push(<span>{i(2)}<P>{"}"}</P>{idx < EXPERIENCE.length - 1 && <P>,</P>}</span>);
  });
  lines.push(<span>{i(1)}<P>]</P></span>);
  lines.push(<P>{"}"}</P>);
  return <CodeSurface lines={lines} />;
}

/* ------------------------------- education.ts -------------------------------- */
function EducationView() {
  const lines: ReactNode[] = [
    <span><C>// Academic history — placeholder records</C></span>,
    <span><K>export</K> <K>interface</K> <T>Degree</T> <P>{"{"}</P></span>,
    <span>{i(1)}<V>school</V><P>: </P><T>string</T><P>;</P> {i(1)}<V>degree</V><P>: </P><T>string</T><P>;</P></span>,
    <span>{i(1)}<V>period</V><P>: </P><T>string</T><P>;</P> {i(1)}<V>score</V><P>: </P><T>string</T><P>;</P></span>,
    <P>{"}"}</P>,
    <></>,
    <span><K>export</K> <K>const</K> <V>education</V><P>: </P><T>Degree</T><P>[] = [</P></span>,
  ];
  EDUCATION.forEach((d, idx) => {
    lines.push(<span>{i(1)}<P>{"{"}</P></span>);
    lines.push(<span>{i(2)}<V>school</V><P>: </P><S>"{d.school}"</S><P>,</P></span>);
    lines.push(<span>{i(2)}<V>degree</V><P>: </P><S>"{d.degree}"</S><P>,</P></span>);
    lines.push(<span>{i(2)}<V>period</V><P>: </P><S>"{d.period}"</S><P>,</P></span>);
    lines.push(<span>{i(2)}<V>score</V><P>: </P><S>"{d.score}"</S><P>,</P></span>);
    lines.push(<span>{i(2)}<C>// {d.detail}</C></span>);
    lines.push(<span>{i(1)}<P>{"}"}</P>{idx < EDUCATION.length - 1 && <P>,</P>}</span>);
  });
  lines.push(<P>];</P>);
  return <CodeSurface lines={lines} />;
}

/* -------------------------------- projects.tsx -------------------------------- */
function ProjectsView() {
  const { fontSize } = useWorkbench();
  return (
    <div className="vsc-scroll h-full">
      <div className="mx-auto max-w-5xl px-6 py-6 font-mono" style={{ fontSize }}>
        <p className="text-syn-comment">{"// export default function Projects() {"}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="group rounded-md border border-chrome-border bg-widget p-4 transition-colors hover:border-focus"
            >
              <header className="flex items-baseline justify-between gap-2">
                <h3 className="text-syn-func font-semibold">&lt;{p.name} /&gt;</h3>
                <span className="text-line-number text-[11px]">v1.0.0</span>
              </header>
              <p className="mt-1.5 text-syn-string">"{p.tagline}"</p>
              <ul className="mt-3 space-y-1 text-editor-fg/80">
                {p.bullets.map((b) => (
                  <li key={b} className="text-[0.92em]">
                    <span className="text-syn-op">— </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-sm border border-chrome-border px-1.5 py-0.5 text-[11px] text-syn-attr">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-4 text-[12px]">
                <a href={`https://${p.repo}`} className="inline-flex items-center gap-1 text-syn-tag hover:underline">
                  <Github className="h-3.5 w-3.5" /> repo
                </a>
                <a href={`https://${p.demo}`} className="inline-flex items-center gap-1 text-syn-tag hover:underline">
                  <ExternalLink className="h-3.5 w-3.5" /> demo
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-syn-comment">{"// }"}</p>
      </div>
    </div>
  );
}

/* --------------------------------- skills.js ---------------------------------- */
function SkillsView() {
  const lines: ReactNode[] = [
    <span><C>/** Stack I reach for, grouped by layer. */</C></span>,
    <span><K>const</K> <V>skills</V> <P>= </P><P>{"{"}</P></span>,
  ];
  SKILLS.forEach((g, idx) => {
    lines.push(
      <span>
        {i(1)}<A>{g.group}</A><P>: [</P>
        {g.items.map((s, k) => (
          <span key={s}>
            <S>"{s}"</S>
            {k < g.items.length - 1 && <P>, </P>}
          </span>
        ))}
        <P>]</P>
        {idx < SKILLS.length - 1 && <P>,</P>}
      </span>,
    );
  });
  lines.push(<span><P>{"};"}</P></span>);
  lines.push(<></>);
  lines.push(<span><F>module</F><P>.</P><V>exports</V> <P>= </P><V>skills</V><P>;</P></span>);
  return <CodeSurface lines={lines} />;
}

/* --------------------------------- contact.jsx -------------------------------- */
function ContactView() {
  const lines: ReactNode[] = [
    <span><K>import</K> <P>{"{ "}</P><V>Mail</V><P>, </P><V>Github</V><P>, </P><V>Linkedin</V><P>{" }"}</P> <K>from</K> <S>"lucide-react"</S><P>;</P></span>,
    <></>,
    <span><K>export</K> <K>default</K> <K>function</K> <F>Contact</F><P>() {"{"}</P></span>,
    <span>{i(1)}<K>return</K> <P>(</P></span>,
    <span>{i(2)}<P>&lt;</P><G>section</G> <A>id</A><P>=</P><S>"contact"</S><P>&gt;</P></span>,
    <span>
      {i(3)}<P>&lt;</P><G>a</G> <A>href</A><P>=</P>
      <S>
        "mailto:
        <a href={`mailto:${PROFILE.email}`} className="underline-offset-4 hover:underline">
          {PROFILE.email}
        </a>
        "
      </S>
      <P>&gt;</P>Email me<P>&lt;/</P><G>a</G><P>&gt;</P>
    </span>,
    <span>
      {i(3)}<P>&lt;</P><G>a</G> <A>href</A><P>=</P>
      <S>
        "
        <a href={`https://${PROFILE.github}`} className="underline-offset-4 hover:underline">
          https://{PROFILE.github}
        </a>
        "
      </S>
      <P>&gt;</P>GitHub<P>&lt;/</P><G>a</G><P>&gt;</P>
    </span>,
    <span>
      {i(3)}<P>&lt;</P><G>a</G> <A>href</A><P>=</P>
      <S>
        "
        <a href={`https://${PROFILE.linkedin}`} className="underline-offset-4 hover:underline">
          https://{PROFILE.linkedin}
        </a>
        "
      </S>
      <P>&gt;</P>LinkedIn<P>&lt;/</P><G>a</G><P>&gt;</P>
    </span>,
    <span>{i(2)}<P>&lt;/</P><G>section</G><P>&gt;</P></span>,
    <span>{i(1)}<P>);</P></span>,
    <span><P>{"}"}</P></span>,
    <></>,
    <span><C>// Open to full-stack MERN roles and freelance builds.</C></span>,
  ];
  return <CodeSurface lines={lines} />;
}

/* --------------------------------- resume.pdf --------------------------------- */
function ResumeView() {
  return (
    <div className="vsc-scroll flex h-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-md border border-chrome-border bg-widget p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md border border-chrome-border">
          <Download className="h-6 w-6 text-term-red" />
        </div>
        <h2 className="font-mono text-base font-semibold text-editor-fg">resume.pdf</h2>
        <p className="mt-1 font-mono text-[12px] text-line-number">
          The editor cannot open this file because it is binary.
        </p>
        <a
          href="/resume.pdf"
          download
          className="mt-5 inline-flex items-center gap-2 rounded-sm bg-statusbar px-4 py-2 font-mono text-[12px] text-statusbar-fg transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" /> Download resume
        </a>
        <p className="mt-3 font-mono text-[11px] text-line-number">Placeholder file — drop your PDF into /public.</p>
      </div>
    </div>
  );
}

/* ------------------------------- settings.json -------------------------------- */
function SettingsFileView() {
  const { theme, fontSize, wordWrap, minimap, showLineNumbers } = useWorkbench();
  const lines: ReactNode[] = [
    <P>{"{"}</P>,
    <span>{i(1)}<A>"workbench.colorTheme"</A><P>: </P><S>"{theme === "dark" ? "Default Dark+" : "Default Light+"}"</S><P>,</P></span>,
    <span>{i(1)}<A>"editor.fontFamily"</A><P>: </P><S>"JetBrains Mono, Fira Code, monospace"</S><P>,</P></span>,
    <span>{i(1)}<A>"editor.fontSize"</A><P>: </P><N>{fontSize}</N><P>,</P></span>,
    <span>{i(1)}<A>"editor.lineNumbers"</A><P>: </P><S>"{showLineNumbers ? "on" : "off"}"</S><P>,</P></span>,
    <span>{i(1)}<A>"editor.wordWrap"</A><P>: </P><S>"{wordWrap ? "on" : "off"}"</S><P>,</P></span>,
    <span>{i(1)}<A>"editor.minimap.enabled"</A><P>: </P><K>{String(minimap)}</K><P>,</P></span>,
    <span>{i(1)}<A>"editor.formatOnSave"</A><P>: </P><K>true</K><P>,</P></span>,
    <span>{i(1)}<A>"files.autoSave"</A><P>: </P><S>"onFocusChange"</S><P>,</P></span>,
    <span>{i(1)}<A>"terminal.integrated.defaultProfile.osx"</A><P>: </P><S>"zsh"</S></span>,
    <P>{"}"}</P>,
    <></>,
    <span><C>// Edit these live from the Settings view in the activity bar.</C></span>,
  ];
  return <CodeSurface lines={lines} />;
}

export function FileView({ id }: { id: FileId }) {
  switch (id) {
    case "about.md":
      return <AboutView />;
    case "experience.json":
      return <ExperienceView />;
    case "education.ts":
      return <EducationView />;
    case "projects.tsx":
      return <ProjectsView />;
    case "skills.js":
      return <SkillsView />;
    case "contact.jsx":
      return <ContactView />;
    case "resume.pdf":
      return <ResumeView />;
    case "settings.json":
      return <SettingsFileView />;
  }
}
