"use client";

import { useState } from "react";
import type { LandingContent } from "@/content";

type NodeCanvasProps = Readonly<{
  heading: string;
  subhead: string;
  nodeGroups: LandingContent["overview"]["nodeGroups"];
}>;

export function NodeCanvas({ heading, subhead, nodeGroups }: NodeCanvasProps) {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const activeGroup = nodeGroups[selectedGroupIndex] ?? nodeGroups[0];

  return (
    <div className="mt-16">
      <div className="border-b border-[var(--color-divider)] pb-6">
        <span className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          MODULAR PALETTE
        </span>
        <h3 className="mt-2 font-[var(--font-barlow-condensed)] text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          {heading}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-neutral-400)] sm:text-base">
          {subhead}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Node Groups Category Selector */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
          {nodeGroups.map((group, idx) => (
            <button
              className={`blueprint flex flex-col justify-between border p-3.5 text-left transition-all ${
                selectedGroupIndex === idx
                  ? "border-[var(--color-accent)] bg-[#1c222b] shadow-md shadow-[var(--color-accent)]/10"
                  : "border-[var(--color-divider)] bg-[#13171d] hover:border-[var(--color-neutral-400)]"
              }`}
              key={group.name}
              onClick={() => setSelectedGroupIndex(idx)}
              type="button"
            >
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />

              <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-accent)]">
                {group.badge}
              </span>
              <span className="mt-2 font-[var(--font-barlow-condensed)] text-base font-bold text-white">
                {group.name}
              </span>
              <span className="mt-1 font-[var(--font-mono)] text-[10px] text-[var(--color-neutral-400)]">
                {group.nodes.length} nodes
              </span>
            </button>
          ))}
        </div>

        {/* Selected Group Nodes Detail Inspector */}
        <div className="blueprint flex flex-col justify-between border border-[var(--color-divider)] bg-[#13171d] p-6">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          <div>
            <div className="flex items-center justify-between border-b border-[var(--color-divider)] pb-3">
              <div>
                <span className="font-[var(--font-mono)] text-[10px] uppercase text-[var(--color-accent)]">
                  GROUP INSPECTION: {activeGroup.badge}
                </span>
                <p className="font-[var(--font-barlow-condensed)] text-2xl font-bold text-white">
                  {activeGroup.name}
                </p>
              </div>
              <span className="border border-[var(--color-divider)] bg-[#0a0c0f] px-2.5 py-1 font-[var(--font-mono)] text-xs text-emerald-400">
                CRITIC COMPLIANT
              </span>
            </div>

            <p className="mt-4 font-[var(--font-mono)] text-xs text-[var(--color-neutral-400)]">
              AVAILABLE EXECUTABLE NODES IN THIS GROUP:
            </p>

            {/* Nodes Chip Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {activeGroup.nodes.map((node) => (
                <div
                  className="blueprint border border-[var(--color-divider)] bg-[#181d24] p-3 text-left transition-colors hover:border-[var(--color-accent)]"
                  key={node}
                >
                  <i className="corner tl" />
                  <i className="corner tr" />
                  <i className="corner bl" />
                  <i className="corner br" />

                  <span className="font-[var(--font-mono)] text-[9px] text-[var(--color-accent)]">● NODE</span>
                  <p className="mt-1 font-[var(--font-barlow-condensed)] text-sm font-semibold text-white">
                    {node}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-[var(--color-divider)] pt-3 font-[var(--font-mono)] text-[11px] text-[var(--color-neutral-600)]">
            Mọi node đều có thể cấu hình Retry, Timeout, Parameter Bindings và Error-Boundary riêng.
          </div>
        </div>
      </div>
    </div>
  );
}
