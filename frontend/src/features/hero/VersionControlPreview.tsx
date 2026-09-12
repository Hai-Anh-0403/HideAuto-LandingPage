"use client";

import { useEffect, useState } from "react";
import { Bell, Braces, CalendarSync, ChevronDown, Download, FileCode2, Fingerprint, GitBranch, History, Home, Minus, Moon, MousePointer2, Plus, Settings, Sparkles, Square, SquareLibrary, User, Workflow, X } from "lucide-react";
import type { Locale } from "@/content";

type VersionControlPreviewProps = Readonly<{ locale?: Locale }>;

const railItems = [Home, Workflow, GitBranch, SquareLibrary, CalendarSync, History, Fingerprint, Braces];

function GraphConnections({ includesUrl = false, includesAi = false }: Readonly<{ includesUrl?: boolean; includesAi?: boolean }>) {
  return <svg aria-hidden="true" className="version-control-preview__connections" preserveAspectRatio="none" viewBox="0 0 100 100"><path d="M 27 18 C 42 18, 49 34, 63 37" />{includesUrl && <path d="M 72 43 C 72 49, 75 53, 75 55" />}{includesAi && <path className="is-added" d="M 68 67 C 68 75, 62 78, 59 82" />}</svg>;
}

function FlowSnapshot({ isNew, includesAi, focusAi }: Readonly<{ isNew: boolean; includesAi: boolean; focusAi: boolean }>) {
  const includesUrl = isNew || includesAi;
  return <div className={`version-control-preview__graph-space ${focusAi ? "is-ai-focus" : ""}`}><GraphConnections includesUrl={includesUrl} includesAi={isNew && includesAi} /><article className="version-control-preview__node node-start"><b>Start</b><span>start</span></article><article className="version-control-preview__node node-connect"><b>Open &amp; Connect</b><span>newProfile</span></article>{includesUrl && <article className="version-control-preview__node node-extension"><b>Go to URL</b><span>https://target.example</span></article>}{isNew && includesAi && <article className="version-control-preview__node node-ai is-added"><b>AI LLM</b><span>Generate action</span></article>}</div>;
}

export function VersionControlPreview({ locale = "vi" }: VersionControlPreviewProps) {
  const [view, setView] = useState<"graph" | "text">("graph");
  const [selectedCommit, setSelectedCommit] = useState<"ai" | "url">("ai");
  const [selectedChange, setSelectedChange] = useState<"workflow" | "ai">("workflow");
  const [cursorPhase, setCursorPhase] = useState<"entry" | "commit-hover" | "commit-click" | "change-hover" | "change-click" | "exit">("entry");
  const includesAi = selectedCommit === "ai";
  const focusAi = selectedChange === "ai";
  const title = locale === "vi" ? "Mô phỏng Version control HideAuto" : "HideAuto Version Control";

  useEffect(() => {
    const playDemo = () => {
      setCursorPhase("entry");
      window.setTimeout(() => setCursorPhase("commit-hover"), 550);
      window.setTimeout(() => { setCursorPhase("commit-click"); setSelectedCommit("url"); setSelectedChange("workflow"); }, 1450);
      window.setTimeout(() => setCursorPhase("change-hover"), 2400);
      window.setTimeout(() => { setCursorPhase("change-click"); setSelectedCommit("ai"); setSelectedChange("ai"); }, 3300);
      window.setTimeout(() => setCursorPhase("exit"), 4150);
    };
    playDemo();
    const loop = window.setInterval(playDemo, 7200);
    return () => window.clearInterval(loop);
  }, []);

  return (
    <div className="actual-flow-preview version-control-preview" aria-label={title}>
      <header className="actual-flow-preview__title">
        <span className="actual-flow-preview__mark">H</span><span>HideAuto</span><strong>HideAuto</strong>
        <span aria-hidden="true" className="actual-flow-preview__window-actions"><Bell /><Download /><Moon /><Sparkles /><Minus /><Square /><X /></span>
      </header>
      <div className="actual-flow-preview__tabs"><div className="actual-flow-preview__tab"><GitBranch size={14} /><b>req-facebook</b><Square fill="currentColor" size={7} /></div></div>

      <div className="version-control-preview__layout">
        <aside className="actual-flow-preview__rail" aria-hidden="true">
          {railItems.map((Icon, index) => <span className={index === 2 ? "active" : ""} key={Icon.displayName ?? index}><Icon /></span>)}
          <i /><span><User /></span><span><Settings /></span>
        </aside>

        <aside className="version-control-preview__changes">
          <div className="version-control-preview__changes-head"><b>Changes</b><button type="button"><GitBranch size={13} /> Commit</button></div>
          <div className="version-control-preview__changes-label"><span>CHANGES&nbsp;&nbsp; 2</span><button type="button"><Plus size={13} /> Add all</button></div>
          <button className={`version-control-preview__change is-modified ${selectedChange === "workflow" ? "is-selected" : ""}`} onClick={() => { setSelectedChange("workflow"); setSelectedCommit("url"); }} type="button"><i /><span>req-facebook</span><small>MODIFIED</small></button>
          <button className={`version-control-preview__change is-added ${selectedChange === "ai" ? "is-selected" : ""}`} onClick={() => { setSelectedChange("ai"); setSelectedCommit("ai"); }} type="button"><i /><span>AI LLM step</span><small>ADDED</small></button>
          <div className="version-control-preview__commit-graph">
            <div className="version-control-preview__graph-count"><GitBranch size={14} /> COMMIT GRAPH&nbsp;&nbsp; 2 <ChevronDown size={15} /></div>
            <ol>
              <li><button className={selectedCommit === "ai" ? "is-selected" : ""} onClick={() => { setSelectedCommit("ai"); setSelectedChange("ai"); }} type="button"><i /><span>feat: add AI LLM to req-facebook</span></button></li>
              <li><button className={selectedCommit === "url" ? "is-selected" : ""} onClick={() => { setSelectedCommit("url"); setSelectedChange("workflow"); }} type="button"><i /><span>feat: add checkout URL step</span></button></li>
            </ol>
          </div>
        </aside>

        <main className="version-control-preview__main">
          <div className="version-control-preview__toolbar">
            <span><GitBranch size={15} /> req-facebook</span>
            <div><button className={view === "graph" ? "is-active" : ""} onClick={() => setView("graph")} type="button">Graph</button><button className={view === "text" ? "is-active" : ""} onClick={() => setView("text")} type="button">Text</button></div>
          </div>
          <div className="version-control-preview__summary"><span><b>+1</b> added</span><span><b>−0</b> removed</span><span><b>~1</b> modified</span><div><button className="is-active" type="button">Side by side</button><button type="button">Overlay</button></div></div>
          {view === "graph" ? <div className="version-control-preview__diff">
            <section><header>Old (HEAD)</header><FlowSnapshot focusAi={focusAi} includesAi={includesAi} isNew={false} /></section>
            <section><header>New (saved)</header><FlowSnapshot focusAi={focusAi} includesAi={includesAi} isNew /></section>
          </div> : <pre className="version-control-preview__text">{includesAi ? `  Start\n  Open & Connect\n  Go to URL\n+ AI LLM` : `  Start\n  Open & Connect\n+ Go to URL`}</pre>}
        </main>
      </div>
      <span aria-hidden="true" className={`version-control-preview__demo-cursor ${cursorPhase}`}><MousePointer2 fill="#f5f7f9" size={19} stroke="#101318" strokeWidth={1.35} />{cursorPhase.endsWith("click") && <i />}</span>
    </div>
  );
}
