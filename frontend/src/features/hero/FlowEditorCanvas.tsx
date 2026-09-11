"use client";

import { memo, useEffect, useMemo, useState } from "react";
import {
  BaseEdge,
  getBezierPath,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type EdgeTypes,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Bot, Copy, Globe2, Play, Plus, PlugZap, Trash2 } from "lucide-react";

type DemoNodeData = { label: string; detail?: string; icon?: "connect" | "url" | "ai"; isRunning?: boolean; isDone?: boolean };

function StartNode({ data, selected }: NodeProps<Node<DemoNodeData>>) {
  return <div className={`demo-flow-start ${selected ? "is-selected" : ""} ${data.isRunning ? "is-running" : ""}`}>
    <span><Play aria-hidden size={14} /></span><b>{data.label}</b>
    <Handle className="demo-flow-port demo-flow-port--start" id="out" position={Position.Right} type="source"><Plus aria-hidden size={14} /></Handle>
  </div>;
}

function BasicFlowNode({ data, selected }: NodeProps<Node<DemoNodeData>>) {
  const Icon = data.icon === "url" ? Globe2 : data.icon === "ai" ? Bot : PlugZap;
  return <div className={`demo-flow-card ${selected ? "is-selected" : ""} ${data.isRunning ? "is-running" : ""} ${data.isDone ? "is-done" : ""}`}>
    {selected && <><span className="demo-flow-selection demo-flow-selection--copy"><Copy aria-hidden size={17} /></span><span className="demo-flow-selection demo-flow-selection--run"><Play aria-hidden size={16} /></span><span className="demo-flow-selection demo-flow-selection--delete"><Trash2 aria-hidden size={16} /></span></>}
    <Handle className="demo-flow-target" id="in" position={Position.Left} type="target" />
    <div className="demo-flow-card__body">
      <span className="demo-flow-card__icon"><Icon aria-hidden size={18} /></span>
      <span><b>{data.label}</b><small>{data.detail}</small></span>
    </div>
    <><Handle className="demo-flow-port demo-flow-port--success" id="success" position={Position.Right} type="source"><Plus aria-hidden size={14} /></Handle>
      <Handle className="demo-flow-port demo-flow-port--error" id="error" position={Position.Bottom} type="source" style={{ left: "75%" }}><Plus aria-hidden size={14} /></Handle></>
  </div>;
}

function WorkflowDashEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, sourceHandleId, data, markerEnd, markerStart, interactionWidth }: EdgeProps) {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const active = Boolean((data as { active?: boolean } | undefined)?.active);
  const done = Boolean((data as { done?: boolean } | undefined)?.done);
  const stroke = sourceHandleId === "error" ? "#d98d86" : active || done ? "#7ba2ca" : "#46525e";
  return <BaseEdge id={id} path={path} markerEnd={markerEnd} markerStart={markerStart} interactionWidth={interactionWidth} className={active ? "demo-flow-edge-flow" : undefined} style={{ stroke, strokeWidth: active ? 2.5 : done ? 2 : 1, strokeDasharray: done ? undefined : "8 6", strokeLinecap: "round", strokeLinejoin: "round" }} />;
}

const nodeTypes = { start: memo(StartNode), basic: memo(BasicFlowNode) };
const edgeTypes: EdgeTypes = { workflowDash: memo(WorkflowDashEdge) };

export function FlowEditorCanvas({ isRunning = false, onStepChange }: Readonly<{ isRunning?: boolean; onStepChange?: (step: number) => void }>) {
  const [step, setStep] = useState(0);
  useEffect(() => { onStepChange?.(step); }, [onStepChange, step]);
  useEffect(() => {
    if (!isRunning) { setStep(0); return; }
    const timer = window.setInterval(() => setStep((value) => (value + 1) % 5), 1700);
    return () => window.clearInterval(timer);
  }, [isRunning]);
  const nodes = useMemo<Node<DemoNodeData>[]>(() => [
    { id: "start", type: "start", position: { x: 70, y: 200 }, data: { label: "Start", isRunning: step === 0 } },
    { id: "connect", type: "basic", position: { x: 270, y: 340 }, data: { label: "Open & Connect", detail: "newProfile", icon: "connect", isRunning: step === 1, isDone: step > 1 } },
    { id: "url", type: "basic", position: { x: 510, y: 480 }, data: { label: "Go to URL", detail: "https://target.example", icon: "url", isRunning: step === 2, isDone: step > 2 } },
    { id: "ai", type: "basic", position: { x: 750, y: 620 }, data: { label: "AI LLM", detail: "Generate action", icon: "ai", isRunning: step === 3, isDone: step === 4 } },
  ], [step]);
  const edges = useMemo<Edge[]>(() => [
    { id: "start-connect", source: "start", sourceHandle: "out", target: "connect", targetHandle: "in", type: "workflowDash", data: { active: step === 0, done: step > 0 } },
    { id: "connect-url", source: "connect", sourceHandle: "success", target: "url", targetHandle: "in", type: "workflowDash", data: { active: step === 1, done: step > 1 } },
    { id: "url-ai", source: "url", sourceHandle: "success", target: "ai", targetHandle: "in", type: "workflowDash", data: { active: step === 2, done: step > 2 } },
  ], [step]);
  const state = ["START", "OPEN & CONNECT", "GO TO URL", "AI LLM", "COMPLETED"][step];
  return <div className="demo-flow-canvas" aria-label="Interactive read-only Flow Editor canvas">
    <ReactFlow edges={edges} edgeTypes={edgeTypes} fitView fitViewOptions={{ padding: 0.2 }} maxZoom={1.4} minZoom={0.7} nodes={nodes} nodeTypes={nodeTypes} nodesConnectable panOnDrag proOptions={{ hideAttribution: true }} />
    {isRunning && <span className="demo-flow-canvas__running"><i aria-hidden />Running...</span>}
    <div className="demo-flow-canvas__zoom" aria-hidden>＋<i />−<i />⌗<i />♙</div><span className="demo-flow-canvas__state">DEMO MODE · {state}</span>
  </div>;
}
