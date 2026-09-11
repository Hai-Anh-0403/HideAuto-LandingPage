"use client";

import { useState } from "react";
import type { LandingContent } from "@/content";

type OperatingLoopProps = Readonly<{
  steps: LandingContent["overview"]["steps"];
}>;

export function OperatingLoop({ steps }: OperatingLoopProps) {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep] ?? steps[0];

  return (
    <div className="blueprint border border-[var(--color-divider)] bg-[#13171d]">
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />

      {/* Step Tabs Bar */}
      <div
        aria-label="Operating loop steps"
        className="flex overflow-x-auto border-b border-[var(--color-divider)] bg-[#0f1217]"
        role="tablist"
      >
        {steps.map((step, idx) => (
          <button
            aria-controls={`loop-panel-${idx}`}
            aria-selected={activeStep === idx}
            className={`flex min-h-12 shrink-0 items-center gap-2 border-r border-[var(--color-divider)] px-4 font-[var(--font-mono)] text-xs transition-colors ${
              activeStep === idx
                ? "bg-[var(--color-accent)] font-semibold text-black"
                : "text-[var(--color-neutral-400)] hover:bg-[#181d24] hover:text-white"
            }`}
            id={`loop-tab-${idx}`}
            key={step.number}
            onClick={() => setActiveStep(idx)}
            role="tab"
            type="button"
          >
            <span>{step.number}</span>
            <span className="font-[var(--font-barlow-condensed)] font-bold tracking-wide">
              {step.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div
        aria-labelledby={`loop-tab-${activeStep}`}
        className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]"
        id={`loop-panel-${activeStep}`}
        role="tabpanel"
      >
        <div>
          <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-accent)]">
            STEP {current.number} · {current.tag}
          </span>
          <h3 className="mt-2 font-[var(--font-barlow-condensed)] text-2xl font-bold text-white sm:text-3xl">
            {current.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-neutral-400)] sm:text-base">
            {current.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-[var(--font-mono)] text-xs">
            <span className="border border-[var(--color-divider)] bg-[#0a0c0f] px-3 py-1 text-emerald-400">
              STATUS: LOCAL VERIFIED
            </span>
            <span className="border border-[var(--color-divider)] bg-[#0a0c0f] px-3 py-1 text-[var(--color-neutral-400)]">
              RUNTIME: CHROMIUM NATIVE
            </span>
          </div>
        </div>

        {/* Visual Technical Panel */}
        <div className="blueprint flex flex-col justify-between border border-[var(--color-divider)] bg-[#0a0c0f] p-4 font-[var(--font-mono)] text-xs">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          <div className="border-b border-[var(--color-divider)] pb-2 text-[10px] text-[var(--color-neutral-600)]">
            <span>OPERATIONAL STEP INSPECTION · GRAPH NODE</span>
          </div>

          <div className="my-4 space-y-2 text-[11px]">
            <div className="text-[var(--color-accent)]">&gt; workflow.current_phase: &quot;{current.tag}&quot;</div>
            <div className="text-[var(--color-neutral-400)]">&gt; state: IN_MEMORY_ACTIVE</div>
            <div className="text-[var(--color-neutral-400)]">&gt; memory_footprint: 14.2 MB</div>
            <div className="text-emerald-400">&gt; critic_audit: PASS (ZERO LEAKS)</div>
          </div>

          <div className="border-t border-[var(--color-divider)] pt-2 text-[10px] text-[var(--color-neutral-600)]">
            CLICK TABS TO INSPECT OTHER PHASES
          </div>
        </div>
      </div>
    </div>
  );
}
