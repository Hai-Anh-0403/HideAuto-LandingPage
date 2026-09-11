"use client";

import { useState } from "react";
import { Bell, Braces, CalendarSync, ChevronDown, ChevronLeft, ChevronRight, Download, FileDown, Fingerprint, FolderPlus, GitBranch, Hand, History, Home, MoreHorizontal, MousePointer2, Play, Plus, RotateCcw, Save, Search, Settings, ShieldCheck, Square, SquareLibrary, Undo2, User, Workflow, X } from "lucide-react";
import type { LandingContent, Locale } from "@/content";
import { FlowEditorCanvas } from "./FlowEditorCanvas";

type ProductPreviewProps = Readonly<{ content: LandingContent["hero"]; locale?: Locale }>;
const railItems = [Home, Workflow, GitBranch, SquareLibrary, CalendarSync, History, Fingerprint, Braces];
const sampleVariables = [["profile_uuid", "Value"], ["profile_path", "Value"], ["remote_port", "Value"], ["remote_ws", "Value"], ["browser_uuid", "Value"]] as const;

export function ProductPreview({ content, locale = "vi" }: ProductPreviewProps) {
  const [dock, setDock] = useState<"PROBLEMS" | "LOG" | "HISTORY">("PROBLEMS");
  const editorName = locale === "vi" ? "Trình soạn flow HideAuto" : "HideAuto Flow Editor";

  return <div className="actual-flow-preview" aria-label={editorName} title={content.cockpit.activeFlow}>
    <header className="actual-flow-preview__title"><span className="actual-flow-preview__mark">H</span><span>HideAuto</span><strong>Untitled-1</strong><span className="actual-flow-preview__window-actions"><Bell /><Download /><MoreHorizontal /><span>-</span><Square /><X /></span></header>
    <div className="actual-flow-preview__tab"><GitBranch aria-hidden size={19} /><b>Untitled-1</b><Square aria-hidden fill="currentColor" size={8} /><X size={17} /></div>
    <div className="actual-flow-preview__layout">
      <aside className="actual-flow-preview__rail" aria-hidden="true">{railItems.map((Icon, index) => <span className={index === 1 ? "active" : ""} key={index}><Icon /></span>)}<i /><span><User /></span><span><Settings /></span></aside>
      <aside className="actual-flow-preview__library"><div><ChevronLeft /><Search /><FolderPlus /><FileDown /><Plus /><Undo2 /></div><p>No workflows yet.</p></aside>
      <main className="actual-flow-preview__center">
        <div className="actual-flow-preview__tools"><span className="tool-group"><MousePointer2 className="tool-select" /><Hand className="tool-pan" /></span><i /><span className="tool-group"><button className="tool-run" type="button"><Play fill="currentColor" size={15} />Run</button><button className="tool-save" type="button"><Save size={15} />Save</button></span><i /><span className="tool-group"><Undo2 className="tool-icon" /><RotateCcw className="tool-icon" /></span><i /><span className="tool-group"><button className="critic" type="button"><ShieldCheck size={15} />Run critic review</button><em>NOT REVIEWED YET</em></span><b><Square fill="currentColor" size={8} /> DISCONNECTED</b></div>
        <FlowEditorCanvas />
        <section className="actual-flow-preview__dock"><div>{(["PROBLEMS", "LOG", "HISTORY"] as const).map((tab) => <button className={dock === tab ? "active" : ""} key={tab} onClick={() => setDock(tab)} type="button">{tab}</button>)}<span>GROUP BY <b>SEVERITY</b> RULE NODE <ChevronDown size={15} /></span></div><p>{dock === "PROBLEMS" ? "No findings. Run a critic review to check this flow." : dock === "LOG" ? "[09:42:07] Waiting for a browser connection..." : "No workflow history yet."}</p></section>
      </main>
      <aside className="actual-flow-preview__variables" aria-label="Workflow variables">
        <div><span>Outline</span><b>Variables</b><i><ChevronRight /></i></div>
        <h3>Variables <button type="button"><Plus size={15} />Add variable</button></h3>
        {sampleVariables.map(([name, value]) => <p key={name}><b>{name}</b><span>{value}</span></p>)}
      </aside>
    </div>
  </div>;
}
