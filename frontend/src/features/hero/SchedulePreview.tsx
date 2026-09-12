"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Braces,
  CalendarSync,
  Download,
  Fingerprint,
  GitBranch,
  History,
  Home,
  Moon,
  MousePointer2,
  Settings,
  Sparkles,
  Square,
  SquareLibrary,
  User,
  Workflow,
  X,
} from "lucide-react";
import type { Locale } from "@/content";

import { sampleWorkflows } from "./ProductPreview";

export type SchedulePreviewProps = Readonly<{
  locale?: Locale;
  onSwitchTab?: (tab: string) => void;
}>;

interface ScheduleItem {
  id: string;
  name: string;
  category: string;
  when: string;
  dateSubtext?: string;
  target: string;
  next: string;
  history: boolean[]; // 7 status bars
  enabled: boolean;
  timelinePercent?: number;
}

const railItems = [
  Home,
  Workflow,
  GitBranch,
  SquareLibrary,
  CalendarSync,
  History,
  Fingerprint,
  Braces,
];

const initialSchedules: ScheduleItem[] = [
  {
    id: "req-facebook-daily",
    name: "req-facebook",
    category: "req-facebook",
    when: "Every day at 13:00",
    dateSubtext: "2026-09-12",
    target: "1 profile · 3×",
    next: "in 1h 33m",
    history: [false, false, false, false, false, false, false],
    enabled: false,
    timelinePercent: 18.8,
  },
  {
    id: "req-facebook-run",
    name: "req-facebook",
    category: "req-facebook",
    when: "Every day at 20:00",
    dateSubtext: "2026-09-12",
    target: "1 profile · 3×",
    next: "in 8h 33m",
    history: [false, false, false, false, false, false, false],
    enabled: false,
    timelinePercent: 37.5,
  },
];

const timelineLabels = [
  "11:26",
  "14:26",
  "17:26",
  "20:26",
  "23:26",
  "02:26",
  "05:26",
  "08:26",
  "11:26",
] as const;

export function SchedulePreview({ locale = "vi", onSwitchTab }: SchedulePreviewProps) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);
  const [selectedId, setSelectedId] = useState<string>("req-facebook-daily");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [inspectorTab, setInspectorTab] = useState<"overview" | "history">("overview");
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [cursorPhase, setCursorPhase] = useState<"approach" | "hover" | "click" | "move-down" | "idle">("idle");
  const [cursorTargetRow, setCursorTargetRow] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 190, y: 85 });

  useEffect(() => {
    let animId: number | null = null;
    let timeouts: number[] = [];

    const enableSchedule = (rowIndex: number, onComplete: () => void) => {
      setCursorTargetRow(rowIndex);
      setCursorPhase("approach");
      const startTime = performance.now();
      const duration = 850;
      const startX = 190;
      const startY = 85;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 3);
        const arc = Math.sin(progress * Math.PI) * 10;
        setCursorPos({ x: startX * (1 - ease) - arc, y: startY * (1 - ease) });

        if (progress < 1) {
          animId = requestAnimationFrame(animate);
          return;
        }

        setCursorPos({ x: 0, y: 0 });
        setCursorPhase("hover");
        timeouts.push(window.setTimeout(() => {
          setCursorPhase("click");
          timeouts.push(window.setTimeout(() => {
            setSchedules((prev) => prev.map((item, index) => index === rowIndex ? { ...item, enabled: true } : item));
            setCursorPhase("hover");
            timeouts.push(window.setTimeout(onComplete, 550));
          }, 120));
        }, 180));
      };

      animId = requestAnimationFrame(animate);
    };

    const moveToSecondSchedule = (onComplete: () => void) => {
      setCursorTargetRow(0);
      setCursorPhase("move-down");
      const startTime = performance.now();
      const duration = 620;
      const rowOffset = 74;

      const animate = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCursorPos({ x: 0, y: rowOffset * ease });

        if (progress < 1) {
          animId = requestAnimationFrame(animate);
          return;
        }

        setCursorTargetRow(1);
        setCursorPos({ x: 0, y: 0 });
        setCursorPhase("hover");
        timeouts.push(window.setTimeout(() => {
          setCursorPhase("click");
          timeouts.push(window.setTimeout(() => {
            setSchedules((prev) => prev.map((item, index) => index === 1 ? { ...item, enabled: true } : item));
            setCursorPhase("idle");
            setCursorTargetRow(null);
            timeouts.push(window.setTimeout(onComplete, 900));
          }, 120));
        }, 180));
      };

      animId = requestAnimationFrame(animate);
    };

    const startDemoCycle = () => {
      setSchedules((prev) => prev.map((item) => ({ ...item, enabled: false })));
      setCursorPhase("idle");
      setCursorTargetRow(null);
      setCursorPos({ x: 190, y: 85 });

      timeouts.push(window.setTimeout(() => {
        enableSchedule(0, () => moveToSecondSchedule(() => timeouts.push(window.setTimeout(startDemoCycle, 9000))));
      }, 800));
    };

    startDemoCycle();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const activeCount = useMemo(() => schedules.filter((s) => s.enabled).length, [schedules]);
  const pausedCount = useMemo(() => schedules.length - activeCount, [schedules, activeCount]);

  const selectedSchedule = useMemo(
    () => schedules.find((s) => s.id === selectedId) ?? schedules[0],
    [schedules, selectedId]
  );

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextEnabled = !item.enabled;
        return {
          ...item,
          enabled: nextEnabled,
          next: nextEnabled ? (item.id === "req-facebook-run" ? "in 8h 33m" : "in 1h 42m") : "Paused",
        };
      })
    );
  };

  const handleRunNow = (id: string) => {
    setActiveRunId(id);
    window.setTimeout(() => {
      setActiveRunId(null);
    }, 1200);
  };

  const isCompletedBatch = selectedSchedule.id === "req-facebook-run" && selectedSchedule.enabled;
  const previewTitle =
    locale === "vi" ? "Mô phỏng lịch chạy HideAuto" : "HideAuto Schedules Cockpit";

  return (
    <div
      aria-label={previewTitle}
      className="actual-flow-preview actual-schedule-preview"
      role="region"
    >
      {/* 1. Desktop Window Header - identical to workflow cockpit */}
      <header className="actual-flow-preview__title">
        <span className="actual-flow-preview__mark">H</span>
        <span>HideAuto</span>
        <strong>HideAuto</strong>
        <span className="actual-flow-preview__window-actions">
          <Bell />
          <Download />
          <Moon />
          <Sparkles />
          <span>-</span>
          <Square />
          <X />
        </span>
      </header>

      {/* 2. Tabs Bar - identical rhythm and position as workflow cockpit */}
      <div className="actual-flow-preview__tabs">
        <div className="actual-flow-preview__tab">
          <GitBranch aria-hidden size={14} />
          <b>req-facebook</b>
          <Square aria-hidden fill="currentColor" size={7} />
          <X size={14} />
        </div>
      </div>

      {/* 3. Cockpit Layout: Left Rail (56px) + Full-width Workspace */}
      <div className="actual-schedule-preview__layout">
        {/* Left Rail - identical to workflow cockpit */}
        <aside aria-label="Cockpit Navigation" className="actual-flow-preview__rail">
          {railItems.map((Icon, index) => (
            <span
              className={index === 4 ? "active" : ""}
              key={index}
              onClick={() => {
                if (index === 1) onSwitchTab?.("flow");
                if (index === 4) onSwitchTab?.("schedules");
              }}
              style={{ cursor: index === 1 || index === 4 ? "pointer" : "default" }}
              title={index === 1 ? "Flow Editor" : index === 4 ? "Schedules" : undefined}
            >
              <span className="rail-icon-wrapper">
                <Icon />
                {index === 2 && <em className="rail-badge">{sampleWorkflows.length}</em>}
              </span>
            </span>
          ))}
          <i />
          <span>
            <User />
          </span>
          <span>
            <Settings />
          </span>
        </aside>

        {/* Center/Right Full-width Workspace */}
        <main className="actual-schedule-preview__workspace">
          {/* Top Breadcrumbs & Actions - Spans entire width to far right */}
          <div className="actual-schedule-preview__top-bar">
            <div className="actual-schedule-preview__breadcrumbs">
              <span className="crumb-group">
                <span className="crumb-section">AUTOMATION</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">Schedules</span>
              </span>
              <span className="crumb-stats">
                {activeCount} active · {pausedCount} paused · in 1h 33m
              </span>
            </div>

            <div className="actual-schedule-preview__top-actions">
              {/* View Toggle */}
              <div className="schedule-view-toggle">
                <button
                  className={`view-toggle-btn ${viewMode === "list" ? "is-active" : ""}`}
                  onClick={() => setViewMode("list")}
                  type="button"
                >
                  List
                </button>
                <button
                  className={`view-toggle-btn ${viewMode === "calendar" ? "is-active" : ""}`}
                  onClick={() => setViewMode("calendar")}
                  type="button"
                >
                  Calendar
                </button>
              </div>

              {/* Timezone */}
              <div className="schedule-timezone">
                <span aria-hidden className="tz-box" />
                <span>Asia/Saigon</span>
              </div>

              {/* New Schedule CTA */}
              <button className="schedule-new-btn" type="button">
                New schedule
              </button>
            </div>
          </div>

          {/* 24-Hour Timeline Section - Chart in middle between NEXT 24 H and slots info */}
          <section
            aria-label="Next 24 Hours Timeline"
            className="actual-schedule-preview__timeline"
          >
            <span className="timeline-title">NEXT 24 H</span>

            <div className="timeline-chart">
              {/* Horizontal baseline line with end bounds and scheduled markers */}
              <div className="timeline-axis-line">
                <span className="timeline-boundary-tick start" />
                <span className="timeline-boundary-tick end" />
                {schedules.map((item) => {
                  if (!item.enabled || item.timelinePercent === undefined) return null;
                  return (
                    <span
                      key={item.id}
                      className="timeline-run-marker"
                      style={{ left: `${item.timelinePercent}%` }}
                      title={`${item.name} (${item.when})`}
                    />
                  );
                })}
              </div>

              {/* Time tick labels */}
              <div className="timeline-ticks">
                {timelineLabels.map((time, idx) => (
                  <span
                    key={`${time}-${idx}`}
                    className="timeline-tick"
                    style={{ left: `${(idx / (timelineLabels.length - 1)) * 100}%` }}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>

            <span className="timeline-slots">
              {activeCount} {activeCount === 1 ? "run" : "runs"} queued · {activeCount} profile-{activeCount === 1 ? "slot" : "slots"}
            </span>
          </section>

          {/* Body Section: Schedule Table (Left) + Inspector (Right) */}
          <div className="actual-schedule-preview__body">
            {/* Schedules Table */}
            <div className="actual-schedule-preview__table-wrapper">
              <table className="actual-schedule-table">
                <thead>
                  <tr>
                    <th className="th-schedule">SCHEDULE</th>
                    <th className="th-when">WHEN</th>
                  <th className="th-target">TARGET</th>
                  <th className="th-next">NEXT</th>
                  <th className="th-last7">LAST 7</th>
                  <th className="th-state">STATE</th>
                  <th className="th-actions">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((item, rowIndex) => {
                  const isRunningThis = activeRunId === item.id;
                  const isSelected = selectedId === item.id;

                  return (
                    <tr
                      key={item.id}
                      className={`schedule-row ${isSelected ? "is-selected" : ""} ${
                        isRunningThis ? "is-executing" : ""
                      }`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      {/* 1. Schedule Name + Tag */}
                      <td className="td-schedule">
                        <div className="schedule-name-cell">
                          <strong className="schedule-title">{item.name}</strong>
                          <span className="schedule-tag">{item.category}</span>
                        </div>
                      </td>

                      {/* 2. When */}
                      <td className="td-when">
                        <div className="schedule-when-cell">
                          <span className="schedule-text-white">{item.when}</span>
                          {item.dateSubtext && (
                            <span className="schedule-text-date">{item.dateSubtext}</span>
                          )}
                        </div>
                      </td>

                      {/* 3. Target */}
                      <td className="td-target">
                        <span className="schedule-text-muted">{item.target}</span>
                      </td>

                      {/* 4. Next */}
                      <td className="td-next">
                        <span
                          className={
                            item.next === "Paused"
                              ? "schedule-text-dimmed"
                              : "schedule-text-white"
                          }
                        >
                          {item.next}
                        </span>
                      </td>

                      {/* 5. Last 7 Runs History Pills */}
                      <td className="td-last7">
                        <div
                          aria-label={`Last 7 runs status for ${item.name}`}
                          className="last7-bars"
                        >
                          {item.history.map((succeeded, idx) => (
                            <span
                              key={idx}
                              className={`last7-bar ${succeeded ? "is-success" : "is-idle"}`}
                              title={succeeded ? "Completed OK" : "No run"}
                            />
                          ))}
                        </div>
                      </td>

                      {/* 6. State Toggle Switch */}
                      <td className="td-state">
                        <div className="schedule-switch-wrapper">
                          <button
                            aria-checked={item.enabled}
                            aria-label={`Toggle schedule for ${item.name}`}
                            className={`cockpit-switch ${item.enabled ? "is-on" : "is-off"} ${rowIndex === cursorTargetRow && cursorPhase === "hover" ? "is-hovered" : ""} ${rowIndex === cursorTargetRow && cursorPhase === "click" ? "is-pressed" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSchedule(item.id);
                            }}
                            role="switch"
                            type="button"
                          >
                            <span className="switch-thumb" />
                          </button>
                          {rowIndex === cursorTargetRow && (cursorPhase === "approach" || cursorPhase === "hover" || cursorPhase === "click" || cursorPhase === "move-down") && (
                            <span
                              aria-hidden="true"
                              className={`demo-run-cursor ${cursorPhase}`}
                              style={{
                                transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)${cursorPhase === "click" ? " scale(0.82) rotate(-3deg)" : ""}`,
                                transition: cursorPhase === "click" ? "transform 0.15s ease-out" : "none",
                              }}
                            >
                              <MousePointer2
                                className="demo-pointer-icon"
                                fill="#ffffff"
                                size={20}
                                stroke="#0b0d10"
                                strokeWidth={1.3}
                              />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 7. Actions */}
                      <td className="td-actions">
                        <div className="schedule-actions-group">
                          <button
                            className={`action-link ${isRunningThis ? "is-pulsing" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRunNow(item.id);
                            }}
                            type="button"
                          >
                            {isRunningThis ? "Running..." : "Run now"}
                          </button>
                          <button
                            className="action-link"
                            onClick={(e) => e.stopPropagation()}
                            type="button"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        {/* 4. Right Inspector: Schedule Details */}
        <aside
          aria-label="Schedule Details Inspector"
          className="actual-schedule-preview__inspector"
        >
          {/* Header info */}
          <div className="inspector-head">
            <span className="inspector-eyebrow">SCHEDULE</span>
            <div className="inspector-title-row">
              <h2 className="inspector-title">{selectedSchedule.name}</h2>
              <span className="inspector-badge">
                {selectedSchedule.enabled ? "ACTIVE" : "PAUSED"}
              </span>
            </div>
            <p className="inspector-subtitle">
              {selectedSchedule.name} · {selectedSchedule.target}
            </p>

            {/* Actions: Run now, Pause/Resume, Edit schedule, Delete */}
            <div className="inspector-actions-row">
              <button
                className="inspector-btn"
                onClick={() => handleRunNow(selectedSchedule.id)}
                type="button"
              >
                Run now
              </button>
              <button
                className="inspector-btn"
                onClick={() => toggleSchedule(selectedSchedule.id)}
                type="button"
              >
                {selectedSchedule.enabled ? "Pause" : "Resume"}
              </button>
              <button className="inspector-btn" type="button">
                Edit schedule
              </button>
              <button className="inspector-btn inspector-btn--delete" type="button">
                Delete
              </button>
            </div>
          </div>

          {/* Sub tabs: Overview / Run history */}
          <div className="inspector-sub-tabs">
            <button
              className={`inspector-sub-tab ${inspectorTab === "overview" ? "is-active" : ""}`}
              onClick={() => setInspectorTab("overview")}
              type="button"
            >
              Overview
            </button>
            <button
              className={`inspector-sub-tab ${inspectorTab === "history" ? "is-active" : ""}`}
              onClick={() => setInspectorTab("history")}
              type="button"
            >
              Run history
            </button>
          </div>

          {/* Section: BATCH */}
          <div className="inspector-section">
            <div className="batch-bar-container">
              <span className="inspector-section-label">BATCH</span>
              <span className="batch-count">{isCompletedBatch ? "1/1" : "0/0"}</span>
            </div>
            <div className="batch-blocks">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className={`batch-block ${isCompletedBatch ? "is-completed" : ""}`}
                />
              ))}
            </div>
            <span className="batch-status">{isCompletedBatch ? "Completed" : "Idle"}</span>
          </div>

          {/* Section: DETAILS */}
          <div className="inspector-section">
            <span className="inspector-section-label">DETAILS</span>
            <div className="inspector-kv-list">
              <div className="inspector-kv-row">
                <span className="inspector-kv-key">Schedule</span>
                <span className="inspector-kv-val">{selectedSchedule.when}</span>
              </div>
              {selectedSchedule.dateSubtext && (
                <div className="inspector-kv-row">
                  <span className="inspector-kv-key">Window</span>
                  <span className="inspector-kv-val">{selectedSchedule.dateSubtext}</span>
                </div>
              )}
              <div className="inspector-kv-row">
                <span className="inspector-kv-key">Run browsers</span>
                <span className="inspector-kv-val">Limited parallel (3)</span>
              </div>
              <div className="inspector-kv-row">
                <span className="inspector-kv-key">Platform</span>
                <span className="inspector-kv-val">Built-in Chromium</span>
              </div>
              <div className="inspector-kv-row">
                <span className="inspector-kv-key">Next run</span>
                <span className="inspector-kv-val">{selectedSchedule.next}</span>
              </div>
              <div className="inspector-kv-row">
                <span className="inspector-kv-key">Created</span>
                <span className="inspector-kv-val">9/12/2026, 9:06:48 AM</span>
              </div>
              <div className="inspector-kv-row">
                <span className="inspector-kv-key">Updated</span>
                <span className="inspector-kv-val">9/12/2026, 11:18:05 AM</span>
              </div>
            </div>
          </div>

          {/* Section: NEXT FIRES */}
          <div className="inspector-section">
            <span className="inspector-section-label">NEXT FIRES</span>
            <div className="inspector-fire-row">
              <span>Sep 12, 01:00 PM</span>
              <span className="inspector-fire-in">in 1h 33m</span>
            </div>
          </div>

          {/* Section: PROFILES · 1 */}
          <div className="inspector-section">
            <span className="inspector-section-label">PROFILES · 1</span>
            <div className="inspector-profile-row">
              <span className="inspector-profile-name">Default profile</span>
              <span className="inspector-profile-tag">builtin</span>
            </div>
          </div>
        </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
