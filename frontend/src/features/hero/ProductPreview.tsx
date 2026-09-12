"use client";

import { useEffect, useState } from "react";
import { Bell, Braces, CalendarSync, ChevronDown, ChevronLeft, Crosshair, Download, File, FileDown, Fingerprint, FolderPlus, GitBranch, Hand, History, Home, Minus, Moon, MousePointer2, Play, Plus, Redo2, RotateCcw, Save, Search, Settings, Settings2, ShieldCheck, Sparkles, Square, SquareLibrary, Undo2, User, Workflow, X } from "lucide-react";
import type { LandingContent, Locale } from "@/content";
import { AiWorkflowCanvas } from "./AiWorkflowCanvas";
import { FlowEditorCanvas } from "./FlowEditorCanvas";

type ProductPreviewProps = Readonly<{
  content: LandingContent["hero"];
  locale?: Locale;
  onSwitchTab?: (tab: string) => void;
  aiDemo?: boolean;
}>;
const railItems = [Home, Workflow, GitBranch, SquareLibrary, CalendarSync, History, Fingerprint, Braces];
export const sampleWorkflows = [
  "req-facebook",
  "test",
  "add log",
  "AI LLM",
  "amazon",
  "Auto Ebay Product Interaction Tool",
  "bien",
  "clear text",
  "clip board",
  "cloudflare",
  "convert JSON",
  "CORE",
  "create + delete folder",
  "register hotmail",
] as const;
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

export function ProductPreview({ content, locale = "vi", onSwitchTab, aiDemo = false }: ProductPreviewProps) {
  const [dock, setDock] = useState<"PROBLEMS" | "LOG" | "HISTORY">("LOG");
  const [runPhase, setRunPhase] = useState<"approach" | "hover" | "click" | "running" | "idle">("idle");
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 260, y: 185 });
  const [flowStep, setFlowStep] = useState(0);
  const [activeWorkflow, setActiveWorkflow] = useState<string>("req-facebook");
  const [aiPhase, setAiPhase] = useState<"entry" | "hover" | "click" | "input-hover" | "send-hover" | "send-click" | "done">("entry");
  const [aiStage, setAiStage] = useState<0 | 1 | 2>(0);
  const [aiBuildStep, setAiBuildStep] = useState(0);
  const [aiDemoCycle, setAiDemoCycle] = useState(0);

  useEffect(() => {
    if (!aiDemo) return;
    setAiPhase("entry");
    setAiStage(0);
    setAiBuildStep(0);
    const timeouts = [
      window.setTimeout(() => setAiPhase("hover"), 650),
      window.setTimeout(() => { setAiPhase("click"); setAiStage(1); }, 1700),
      window.setTimeout(() => setAiPhase("input-hover"), 2600),
      window.setTimeout(() => setAiPhase("send-hover"), 3800),
      window.setTimeout(() => { setAiPhase("send-click"); setAiStage(2); }, 4650),
      window.setTimeout(() => setAiPhase("done"), 4900),
      window.setTimeout(() => setAiDemoCycle((cycle) => cycle + 1), 11800),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, [aiDemo, aiDemoCycle]);

  useEffect(() => {
    if (!aiDemo || aiStage !== 2) return;
    setAiBuildStep(0);
    const timeouts = [
      window.setTimeout(() => setAiBuildStep(1), 650),
      window.setTimeout(() => setAiBuildStep(2), 2050),
      window.setTimeout(() => setAiBuildStep(3), 3450),
      window.setTimeout(() => setAiBuildStep(4), 4850),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, [aiDemo, aiStage]);

  useEffect(() => {
    if (aiDemo) return;
    let animId: number | null = null;
    let timeouts: number[] = [];

    const startCycle = () => {
      setRunPhase("idle");
      setCursorPos({ x: 260, y: 185 });

      timeouts.push(
        window.setTimeout(() => {
          setRunPhase("approach");
          const startTime = performance.now();
          const duration = 750; // fast and responsive glide
          const startX = 260;
          const startY = 185;

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const ease = 1 - Math.pow(1 - progress, 3);
            const arc = Math.sin(progress * Math.PI) * 12;
            const x = startX * (1 - ease) - arc;
            const y = startY * (1 - ease);

            setCursorPos({ x, y });

            if (progress < 1) {
              animId = requestAnimationFrame(animate);
            } else {
              setCursorPos({ x: 0, y: 0 });
              setRunPhase("hover");

              timeouts.push(
                window.setTimeout(() => {
                  setRunPhase("click");

                  timeouts.push(
                    window.setTimeout(() => {
                      setRunPhase("running");

                      timeouts.push(
                        window.setTimeout(() => {
                          setRunPhase("idle");
                          timeouts.push(window.setTimeout(startCycle, 1200));
                        }, 8000)
                      );
                    }, 100)
                  );
                }, 140)
              );
            }
          };

          animId = requestAnimationFrame(animate);
        }, 250)
      );
    };

    startCycle();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      timeouts.forEach(clearTimeout);
    };
  }, [aiDemo]);
  const isRunning = runPhase === "running";
  const isHovered = runPhase === "hover" || runPhase === "click";
  const isPressed = runPhase === "click";
  const visibleLogs = isRunning ? sampleLogs.filter((entry) => entry.step <= flowStep) : [];
  const editorName = locale === "vi" ? "Trình soạn flow HideAuto" : "HideAuto Flow Editor";

  return <div className={`actual-flow-preview ${aiDemo ? "ai-chat-preview" : ""} ${aiStage > 0 ? "is-ai-open" : ""}`} aria-label={editorName} title={content.cockpit.activeFlow}>
    <header className="actual-flow-preview__title"><span className="actual-flow-preview__mark">H</span><span>HideAuto</span><strong>{activeWorkflow}</strong><span className="actual-flow-preview__window-actions"><Bell /><Download /><Moon />{aiDemo ? <button aria-label="Open AI chat" className="ai-chat-preview__trigger" onClick={() => { setAiPhase("done"); setAiStage(2); }} type="button"><Sparkles /></button> : <Sparkles />}<Minus /><Square /><X /></span></header>
    <div className="actual-flow-preview__tabs"><div className="actual-flow-preview__tab"><GitBranch aria-hidden size={14} /><b>{activeWorkflow}</b><Square aria-hidden fill="currentColor" size={7} /><X size={14} /></div></div>
    <div className="actual-flow-preview__layout">
      <aside className="actual-flow-preview__rail" aria-hidden="true">{railItems.map((Icon, index) => <span className={index === 1 ? "active" : ""} key={index} onClick={() => { if (index === 4) onSwitchTab?.("schedules"); }} style={{ cursor: index === 4 ? "pointer" : "default" }} title={index === 4 ? "Schedules" : undefined}><span className="rail-icon-wrapper"><Icon />{index === 2 && <em className="rail-badge">{sampleWorkflows.length}</em>}</span></span>)}<i /><span><User /></span><span><Settings /></span></aside>
      <aside className="actual-flow-preview__library"><div className="library-tools"><button aria-label="Back" type="button"><ChevronLeft /></button><span><Search /><FolderPlus /><FileDown /><Plus /><RotateCcw /></span></div><ul className="workflow-file-list">{sampleWorkflows.map((name) => { const isActive = name === activeWorkflow; return <li className={isActive ? "is-active" : ""} key={name} onClick={() => setActiveWorkflow(name)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveWorkflow(name); }}><File aria-hidden /><span className="workflow-name">{name}</span><span aria-hidden="true" className="workflow-active-dot" /></li>; })}</ul></aside>
      <main className="actual-flow-preview__center">
        <div className="actual-flow-preview__tools"><span className="tool-group"><MousePointer2 className="tool-select" /><Hand className="tool-pan" /></span><i /><span className="tool-group"><span className="tool-run-wrapper"><button className={`tool-run ${isRunning ? "is-running" : ""} ${isHovered ? "is-hovered" : ""} ${isPressed ? "is-pressed" : ""}`} onClick={() => setRunPhase(isRunning ? "idle" : "running")} type="button">{isRunning ? <Square aria-hidden="true" className="tool-run__stop" fill="currentColor" size={10} /> : <Play aria-hidden className="tool-run__play" strokeWidth={2} />}{isRunning ? "Stop" : "Run"}{isPressed && <span aria-hidden className="demo-click-ripple" />}</button>{(runPhase === "approach" || runPhase === "hover" || runPhase === "click") && <span aria-hidden="true" className={`demo-run-cursor ${runPhase}`} style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)${isPressed ? " scale(0.82) rotate(-3deg)" : ""}`, transition: isPressed ? "transform 0.15s ease-out" : "none" }}><MousePointer2 className="demo-pointer-icon" fill="#ffffff" size={20} stroke="#0b0d10" strokeWidth={1.3} /></span>}</span><button className="tool-save" type="button"><Save size={15} />Save</button></span><i /><span className="tool-group"><Undo2 className="tool-icon" /><Redo2 className="tool-icon" /></span><i /><span className="tool-group"><button className="critic critic--disconnected" type="button"><ShieldCheck size={15} />Run critic review</button></span><span className="tool-critic-gap" aria-hidden="true" /><b className="actual-flow-preview__status-disconnected"><Square fill="currentColor" size={8} /> DISCONNECTED</b></div>
        {aiDemo ? <AiWorkflowCanvas buildStep={aiBuildStep} /> : <FlowEditorCanvas isRunning={isRunning} onStepChange={setFlowStep} />}
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
    {aiDemo && <><span aria-hidden="true" className={`ai-chat-preview__cursor ${aiPhase}`}><MousePointer2 fill="#f5f7f9" size={20} stroke="#101318" strokeWidth={1.35} />{(aiPhase === "click" || aiPhase === "send-click") && <i />}</span>{aiStage > 0 && <aside className="ai-chat-preview__panel" aria-label="AI Chat"><header><b>Phiên mới</b><span><History size={14} /><Plus size={14} /><Bell size={14} /><Crosshair size={14} /><Settings2 size={14} /><X size={14} /></span></header><div className="ai-chat-preview__messages">{aiStage === 2 && <><p className="ai-chat-preview__prompt">Tạo cho tôi luồng tự động req-facebook</p><div className="ai-chat-preview__answer"><b>Đang tạo req-facebook</b><p>AI đang thêm từng bước vào canvas… {aiBuildStep}/4</p></div></>}</div><div className={`ai-chat-preview__composer ${aiStage === 1 ? "is-typing" : ""}`}><span>{aiStage === 1 ? "Tạo cho tôi luồng tự động req-facebook" : "Nhắn AI về workflow này..."}</span><button aria-label="Send message" type="button">↑</button></div></aside>}</>}
  </div>;
}
