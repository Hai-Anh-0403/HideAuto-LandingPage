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
import { Bot, Copy, Globe2, Loader2, Play, Plus, PlugZap, Trash2 } from "lucide-react";

type DemoNodeData = {
  label: string;
  detail?: string;
  icon?: "connect" | "url" | "ai";
  isRunning?: boolean;
  isDone?: boolean;
  isDimmed?: boolean;
};

function StartNode({ data, selected }: NodeProps<Node<DemoNodeData>>) {
  return (
    <div
      className={`demo-flow-start ${selected ? "is-selected" : ""} ${
        data.isRunning ? "is-running" : ""
      } ${data.isDone ? "is-done" : ""}`}
    >
      <span className="demo-flow-start__icon">
        <Play aria-hidden size={14} />
      </span>
      <b>{data.label}</b>

      {/* Rotating loading box when Start is running */}
      {data.isRunning && (
        <div className="demo-flow-loading-box demo-flow-loading-box--start" aria-label="Running">
          <svg className="demo-flow-spinner-svg" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="8.5"
              stroke="#7ba2ca"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="38 16"
            />
          </svg>
        </div>
      )}

      <Handle className="demo-flow-port demo-flow-port--start" id="out" position={Position.Right} type="source">
        <Plus aria-hidden size={14} />
      </Handle>
    </div>
  );
}

function BasicFlowNode({ data, selected }: NodeProps<Node<DemoNodeData>>) {
  const Icon = data.icon === "url" ? Globe2 : data.icon === "ai" ? Bot : PlugZap;
  return (
    <div
      className={`demo-flow-card ${selected ? "is-selected" : ""} ${
        data.isRunning ? "is-running" : ""
      } ${data.isDone ? "is-done" : ""} ${data.isDimmed ? "is-dimmed" : ""}`}
    >
      {/* Rotating loading box only when running - NO checkmark left behind */}
      {data.isRunning && (
        <div className="demo-flow-loading-box" aria-label="Running">
          <svg className="demo-flow-spinner-svg" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="8.5"
              stroke="#7ba2ca"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="38 16"
            />
          </svg>
        </div>
      )}

      {selected && (
        <>
          <span className="demo-flow-selection demo-flow-selection--copy">
            <Copy aria-hidden size={17} />
          </span>
          <span className="demo-flow-selection demo-flow-selection--run">
            <Play aria-hidden size={16} />
          </span>
          <span className="demo-flow-selection demo-flow-selection--delete">
            <Trash2 aria-hidden size={16} />
          </span>
        </>
      )}

      <Handle className="demo-flow-target" id="in" position={Position.Left} type="target" />

      <div className="demo-flow-card__body">
        <span className="demo-flow-card__icon">
          <Icon aria-hidden size={18} />
        </span>
        <span>
          <b>{data.label}</b>
          <small>{data.detail}</small>
        </span>
      </div>

      <Handle className="demo-flow-port demo-flow-port--success" id="success" position={Position.Right} type="source">
        <Plus aria-hidden size={14} />
      </Handle>
      <Handle
        className="demo-flow-port demo-flow-port--error"
        id="error"
        position={Position.Bottom}
        type="source"
        style={{ left: "75%" }}
      >
        <Plus aria-hidden size={14} />
      </Handle>
    </div>
  );
}

function WorkflowDashEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceHandleId,
  data,
  markerEnd,
  markerStart,
  interactionWidth,
}: EdgeProps) {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const active = Boolean((data as { active?: boolean } | undefined)?.active);
  const done = Boolean((data as { done?: boolean } | undefined)?.done);
  const dimmed = Boolean((data as { dimmed?: boolean } | undefined)?.dimmed);
  const stroke = sourceHandleId === "error" ? "#d98d86" : active || done ? "#7ba2ca" : "#46525e";

  return (
    <BaseEdge
      id={id}
      path={path}
      markerEnd={markerEnd}
      markerStart={markerStart}
      interactionWidth={interactionWidth}
      className={active ? "demo-flow-edge-flow" : undefined}
      style={{
        stroke,
        strokeWidth: active ? 2.5 : done ? 2 : 1,
        strokeDasharray: done ? undefined : "8 6",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: dimmed ? 0.25 : 1,
        transition: "opacity 0.4s ease, stroke 0.4s ease",
      }}
    />
  );
}

const nodeTypes = { start: memo(StartNode), basic: memo(BasicFlowNode) };
const edgeTypes: EdgeTypes = { workflowDash: memo(WorkflowDashEdge) };

export function FlowEditorCanvas({
  isRunning = false,
  onStepChange,
}: Readonly<{ isRunning?: boolean; onStepChange?: (step: number) => void }>) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    onStepChange?.(step);
  }, [onStepChange, step]);

  useEffect(() => {
    if (!isRunning) {
      setStep(0);
      return;
    }
    const timer = window.setInterval(() => setStep((value) => (value + 1) % 5), 1800);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const nodes = useMemo<Node<DemoNodeData>[]>(
    () => [
      {
        id: "start",
        type: "start",
        position: { x: 70, y: 200 },
        data: {
          label: "Start",
          isRunning: isRunning && step === 0,
          isDone: isRunning && step > 0,
          isDimmed: false,
        },
      },
      {
        id: "connect",
        type: "basic",
        position: { x: 270, y: 340 },
        data: {
          label: "Open & Connect",
          detail: "newProfile",
          icon: "connect",
          isRunning: isRunning && step === 1,
          isDone: isRunning && step > 1,
          isDimmed: isRunning && step < 1,
        },
      },
      {
        id: "url",
        type: "basic",
        position: { x: 510, y: 480 },
        data: {
          label: "Go to URL",
          detail: "https://target.example",
          icon: "url",
          isRunning: isRunning && step === 2,
          isDone: isRunning && step > 2,
          isDimmed: isRunning && step < 2,
        },
      },
      {
        id: "ai",
        type: "basic",
        position: { x: 750, y: 620 },
        data: {
          label: "AI LLM",
          detail: "Generate action",
          icon: "ai",
          isRunning: isRunning && step === 3,
          isDone: isRunning && step >= 4,
          isDimmed: isRunning && step < 3,
        },
      },
    ],
    [isRunning, step]
  );

  const edges = useMemo<Edge[]>(
    () => [
      {
        id: "start-connect",
        source: "start",
        sourceHandle: "out",
        target: "connect",
        targetHandle: "in",
        type: "workflowDash",
        data: {
          active: isRunning && step === 0,
          done: isRunning && step > 0,
          dimmed: isRunning && step < 0,
        },
      },
      {
        id: "connect-url",
        source: "connect",
        sourceHandle: "success",
        target: "url",
        targetHandle: "in",
        type: "workflowDash",
        data: {
          active: isRunning && step === 1,
          done: isRunning && step > 1,
          dimmed: isRunning && step < 1,
        },
      },
      {
        id: "url-ai",
        source: "url",
        sourceHandle: "success",
        target: "ai",
        targetHandle: "in",
        type: "workflowDash",
        data: {
          active: isRunning && step === 2,
          done: isRunning && step > 2,
          dimmed: isRunning && step < 2,
        },
      },
    ],
    [isRunning, step]
  );

  const state = ["START", "OPEN & CONNECT", "GO TO URL", "AI LLM", "COMPLETED"][step];

  return (
    <div className="demo-flow-canvas" aria-label="Interactive read-only Flow Editor canvas">
      <ReactFlow
        edges={edges}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        maxZoom={1.4}
        minZoom={0.7}
        nodes={nodes}
        nodeTypes={nodeTypes}
        nodesConnectable
        panOnDrag
        proOptions={{ hideAttribution: true }}
      />
      {isRunning && (
        <span className="demo-flow-canvas__running">
          <Loader2 aria-hidden="true" className="demo-running-spinner-icon" size={11} />
          Running...
        </span>
      )}
      <div className="demo-flow-canvas__zoom" aria-hidden>
        ＋<i />−<i />⌗<i />♙
      </div>
      <span className="demo-flow-canvas__state">DEMO MODE · {state}</span>
    </div>
  );
}
