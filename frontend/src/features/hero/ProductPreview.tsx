"use client";

import { useEffect, useState } from "react";
import { Bell, Braces, CalendarSync, ChevronDown, ChevronLeft, Download, File, FileDown, Fingerprint, FolderPlus, GitBranch, Hand, History, Home, MoreHorizontal, MousePointer2, Play, Plus, Redo2, Save, Search, Settings, ShieldCheck, Square, SquareLibrary, Undo2, User, Workflow, X } from "lucide-react";
import type { LandingContent, Locale } from "@/content";
import { FlowEditorCanvas } from "./FlowEditorCanvas";

type ProductPreviewProps = Readonly<{ content: LandingContent["hero"]; locale?: Locale }>;
const railItems = [Home, Workflow, GitBranch, SquareLibrary, CalendarSync, History, Fingerprint, Braces];
const sampleWorkflows = ["add log", "AI LLM", "amazon", "Auto Ebay Product Interaction Tool", "bien", "clear text", "clip board", "cloudflare", "convert JSON", "CORE", "create + delete folder", "register hotmail"] as const;
const sampleLogs = [
  { step: 0, text: "11:09:02 Run started" },
  { step: 0, text: "kind=test scope=full browser-" },
  { step: 1, text: "11:09:02 Step finished start  OK" },
  { step: 1, text: "11:09:02 Step started Open & Connect" },
  { step: 2, text: "11:09:02 Step finished Open & Connect  OK" },
  { step: 2, text: "11:09:02 Step started Go to URL" },
  { step: 3, text: "11:09:02 Step finished Go to URL  OK" },
  { step: 3, text: "11:09:02 Step started AI LLM" },
  { step: 4, text: "11:09:02 Flow completed  OK" },
] as const;

const outlineSteps = [
  { num: "01", name: "Start" },
  { num: "02", name: "Open & Connect" },
  { num: "03", name: "Go to url" },
  { num: "04", name: "AI LLM" },
  { num: "05", name: "Click Element" },
  { num: "06", name: "Run JS" },
  { num: "07", name: "Pause" },
  { num: "08", name: "Type text" },
  { num: "09", name: "File Choose event" },
  { num: "10", name: "Stop" },
] as const;

export function ProductPreview({ content, locale = "vi" }: ProductPreviewProps) {
  const [dock, setDock] = useState<"PROBLEMS" | "LOG" | "HISTORY">("LOG");
  const [runPhase, setRunPhase] = useState<"approach" | "click" | "running" | "idle">("approach");
  const [flowStep, setFlowStep] = useState(0);

  useEffect(() => {
    let timers: number[] = [];
    const playDemo = () => {
      setRunPhase("approach");
      timers = [
        window.setTimeout(() => setRunPhase("click"), 2400),
        window.setTimeout(() => setRunPhase("running"), 2600),
        window.setTimeout(() => setRunPhase("idle"), 11100),
        window.setTimeout(playDemo, 12350),
      ];
    };
    playDemo();
    return () => timers.forEach(window.clearTimeout);
  }, []);
  const isRunning = runPhase === "running";
  const visibleLogs = isRunning ? sampleLogs.filter((entry) => entry.step <= flowStep) : [];
  const editorName = locale === "vi" ? "Trình soạn flow HideAuto" : "HideAuto Flow Editor";

  return <div className="actual-flow-preview" aria-label={editorName} title={content.cockpit.activeFlow}>
    <header className="actual-flow-preview__title"><span className="actual-flow-preview__mark">H</span><span>HideAuto</span><strong>Untitled-1</strong><span className="actual-flow-preview__window-actions"><Bell /><Download /><MoreHorizontal /><span>-</span><Square /><X /></span></header>
    <div className="actual-flow-preview__tabs"><div className="actual-flow-preview__tab"><GitBranch aria-hidden size={14} /><b>Untitled-1</b><Square aria-hidden fill="currentColor" size={7} /><X size={14} /></div></div>
    <div className="actual-flow-preview__layout">
      <aside className="actual-flow-preview__rail" aria-hidden="true">{railItems.map((Icon, index) => <span className={index === 1 ? "active" : ""} key={index}><Icon /></span>)}<i /><span><User /></span><span><Settings /></span></aside>
      <aside className="actual-flow-preview__library"><div className="library-tools"><button aria-label="Back" type="button"><ChevronLeft /></button><span><Search /><FolderPlus /><FileDown /><Plus /><Undo2 /></span></div><ul className="workflow-file-list">{sampleWorkflows.map((name) => <li key={name}><File aria-hidden /><span>{name}</span></li>)}</ul></aside>
      <main className="actual-flow-preview__center">
        <div className="actual-flow-preview__tools"><span className="tool-group"><MousePointer2 className="tool-select" /><Hand className="tool-pan" /></span><i /><span className="tool-group"><button className={`tool-run ${isRunning ? "is-running" : ""}`} onClick={() => setRunPhase(isRunning ? "idle" : "running")} type="button">{isRunning ? <Square aria-hidden className="tool-run__stop" /> : <Play aria-hidden className="tool-run__play" strokeWidth={2} />}{isRunning ? "Stop" : "Run"}{(runPhase === "approach" || runPhase === "click") && <span aria-hidden className={"demo-run-cursor " + runPhase}><MousePointer2 size={17} /></span>}</button><button className="tool-save" type="button"><Save size={15} />Save</button></span><i /><span className="tool-group"><Undo2 className="tool-icon" /><Redo2 className="tool-icon" /></span><i /><span className="tool-group"><button className="critic critic--disconnected" type="button"><ShieldCheck size={15} />Run critic review</button></span><span className="tool-critic-gap" aria-hidden="true" /><b className="actual-flow-preview__status-disconnected"><Square fill="currentColor" size={8} /> DISCONNECTED</b></div>
        <FlowEditorCanvas isRunning={isRunning} onStepChange={setFlowStep} />
        <section className="actual-flow-preview__dock">
          <div>
            <button className={`dock-tab ${dock === "PROBLEMS" ? "active" : ""}`} onClick={() => setDock("PROBLEMS")} type="button">PROBLEMS</button>
            <span className="dock-severity" aria-label="Problem severity counts"><span><i className="error" />0</span><span><i className="warning" />0</span><span><i className="hint" />0</span></span>
            <button className={`dock-tab ${dock === "LOG" ? "active" : ""}`} onClick={() => setDock("LOG")} type="button">LOG</button>
            <button className={`dock-tab ${dock === "HISTORY" ? "active" : ""}`} onClick={() => setDock("HISTORY")} type="button">HISTORY</button>
            {dock === "PROBLEMS" && <span className="dock-filter"><span>GROUP BY</span><button className="active" type="button">SEVERITY</button><button type="button">RULE</button><button type="button">NODE</button><ChevronDown size={14} /></span>}
          </div>
          {dock === "LOG" ? <section className="dock-log-panel"><div className="dock-log-filters"><div>Search by message, node, variable...</div><button type="button">All <ChevronDown size={14} /></button></div><ul>{visibleLogs.length ? visibleLogs.map((entry) => <li key={entry.text}>{entry.text}</li>) : <li className="is-waiting">Waiting for Run command...</li>}</ul><button className="dock-log-latest" type="button"><ChevronDown size={13} />Latest</button></section> : <p>{dock === "PROBLEMS" ? "No findings. Run a critic review to check this flow." : "No workflow history yet."}</p>}
        </section>
      </main>
      <aside className="actual-flow-preview__variables" aria-label="Workflow outline">
        <div className="actual-flow-preview__inspector-tabs">
          <span className="inspector-tab is-active">Outline</span>
          <span className="inspector-tab">Variables</span>
        </div>
        <ul className="outline-step-list">
          {outlineSteps.map((step) => (
            <li key={step.num} className="outline-step-item">
              <span className="outline-step-num">{step.num}</span>
              <span className="outline-step-name">{step.name}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  </div>;
}
