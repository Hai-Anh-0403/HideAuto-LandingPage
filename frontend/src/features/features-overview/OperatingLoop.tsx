"use client";

import { useState } from "react";
import type { LandingContent } from "@/content";

type OperatingLoopProps = Readonly<{
  steps: LandingContent["overview"]["steps"];
}>;

export function OperatingLoop({ steps }: OperatingLoopProps) {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep] ?? steps[0];
  const isVi = steps[0]?.tag.toLowerCase().includes("node") && !steps[0]?.tag.toLowerCase().includes("nodes");

  return (
    <div className="mt-9">
      {/* 5 Horizontal Tab Buttons */}
      <div
        aria-label="Operating loop steps"
        className="flex flex-wrap gap-2"
        role="tablist"
      >
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              aria-controls={`loop-panel-${idx}`}
              aria-selected={isActive}
              className={`px-4.5 py-2.5 font-[var(--font-barlow-condensed)] text-[15.5px] font-semibold tracking-[0.02em] transition-colors cursor-pointer ${
                isActive
                  ? "bg-[var(--color-accent)] text-[#0f1114] border border-[var(--color-accent)]"
                  : "border border-[var(--color-divider)] bg-transparent text-[#e7e8ea] hover:border-[var(--color-neutral-400)]"
              }`}
              id={`loop-tab-${idx}`}
              key={step.number}
              onClick={() => setActiveStep(idx)}
              role="tab"
              type="button"
            >
              {step.tag}
            </button>
          );
        })}
      </div>

      {/* Content below Divider */}
      <div
        aria-labelledby={`loop-tab-${activeStep}`}
        className="mt-8.5 grid grid-cols-1 items-start gap-10 border-t border-[var(--color-divider-subtle)] pt-8.5 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-14"
        id={`loop-panel-${activeStep}`}
        role="tabpanel"
      >
        {/* Left Column: Title, Description, and 4 Numbered Bullets */}
        <div>
          <h3 className="font-[var(--font-barlow-condensed)] text-3xl font-bold leading-tight text-white sm:text-[32px]">
            {current.title}
          </h3>
          <p className="mt-3.5 text-[15.5px] leading-[1.65] text-[var(--color-neutral-400)] text-pretty">
            {current.description}
          </p>

          <ul className="mt-5 space-y-2.5">
            {(current.bullets ?? []).map((bullet, bIdx) => (
              <li
                className="flex items-start gap-3 text-[15px] leading-snug text-[#e7e8ea]"
                key={bIdx}
              >
                <span className="shrink-0 pt-1 font-[var(--font-mono)] text-[10.5px] text-[var(--color-accent)] select-none">
                  {String(bIdx + 1).padStart(2, "0")}
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Technical Blueprint Card with Corner Marks */}
        <div className="blueprint relative border border-[var(--color-divider)] bg-[#0d1015]/60 p-6 sm:p-7">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          {/* Tab 0: Node Palette 8 Groups */}
          {activeStep === 0 && (
            <div>
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
                {isVi ? "Bảng node · 8 nhóm" : "Node palette · 8 groups"}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-7">
                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[var(--color-accent)]" />
                    Browser
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    openConnect<br />browserClose<br />disconnect
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[#e06c75]" />
                    Tab
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    gotoUrl · newTab<br />runJs · screenshot<br />httpRequest · scroll<br />cookies · dialog
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[#98c379]" />
                    Element
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    waitForSelector<br />clickElement · hover<br />getText · getHtml<br />elementExists
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[#d19a66]" />
                    Keyboard
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    typeText<br />pressKey
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[#61afef]" />
                    Mouse
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    mouseClick · move<br />mouseDown · up<br />imageSearch
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[#c678dd]" />
                    Data
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    readSpreadsheet<br />writeFile · convertJson<br />getCode2Fa · random<br />readHotmailAuth
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[#56b6c2]" />
                    Debug
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    addLog<br />addComment
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-2 font-[var(--font-barlow-condensed)] text-base font-semibold text-white sm:text-[17px]">
                    <span className="h-2 w-2 shrink-0 bg-[var(--color-divider)]" />
                    {isVi ? "Điều khiển" : "Control"}
                  </span>
                  <span className="mt-2 block font-[var(--font-mono)] text-xs leading-[1.9] text-[var(--color-neutral-300)] sm:text-[13px]">
                    if · ifElse<br />loop · stopLoop<br />pause · stop
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Critic Rules Table */}
          {activeStep === 1 && (
            <div className="-m-6 overflow-x-auto sm:-m-7">
              <div className="min-w-[520px]">
                <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] border-b border-[var(--color-divider)] px-6 py-3 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.11em] text-[var(--color-neutral-400)] sm:px-7">
                  <span>Rule</span>
                  <span>{isVi ? "Nhóm" : "Group"}</span>
                  <span>{isVi ? "Mức" : "Severity"}</span>
                  <span>Fix</span>
                </div>
                <div className="divide-y divide-[var(--color-divider-subtle)] text-[14px]">
                  <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] items-baseline px-6 py-3.5 sm:px-7">
                    <span className="font-[var(--font-mono)] text-[13px] text-white">invalid-node</span>
                    <span className="text-[13px] text-[var(--color-neutral-400)]">resilience</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-rose-400">
                      <span className="h-2 w-2 bg-rose-400" />
                      error
                    </span>
                    <span className="text-[13.5px] text-[var(--color-neutral-300)]">
                      {isVi ? "Node lạ / thiếu handler" : "Unknown node or missing handler"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] items-baseline px-6 py-3.5 sm:px-7">
                    <span className="font-[var(--font-mono)] text-[13px] text-white">no-start-node</span>
                    <span className="text-[13px] text-[var(--color-neutral-400)]">resilience</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-rose-400">
                      <span className="h-2 w-2 bg-rose-400" />
                      error
                    </span>
                    <span className="text-[13.5px] text-[var(--color-neutral-300)]">
                      {isVi ? "Runner từ chối chạy" : "The runner refuses to run"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] items-baseline px-6 py-3.5 sm:px-7">
                    <span className="font-[var(--font-mono)] text-[13px] text-white">unreachable-node</span>
                    <span className="text-[13px] text-[var(--color-neutral-400)]">resilience</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-accent)]">
                      <span className="h-2 w-2 bg-[var(--color-accent)]" />
                      hint
                    </span>
                    <span className="text-[13.5px] text-[var(--color-neutral-300)]">
                      {isVi ? "Không bao giờ chạy tới" : "Never reached"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] items-baseline px-6 py-3.5 sm:px-7">
                    <span className="font-[var(--font-mono)] text-[13px] text-white">positional-selector</span>
                    <span className="text-[13px] text-[var(--color-neutral-400)]">resilience</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-amber-400">
                      <span className="h-2 w-2 bg-amber-400" />
                      warn
                    </span>
                    <span className="text-[13.5px] text-[var(--color-neutral-300)]">
                      {isVi ? "Cần người chọn thuộc tính ổn định" : "A human picks the stable attribute"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] items-baseline px-6 py-3.5 sm:px-7">
                    <span className="font-[var(--font-mono)] text-[13px] text-white">error-port-unwired</span>
                    <span className="text-[13px] text-[var(--color-neutral-400)]">data-safety</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-accent)]">
                      <span className="h-2 w-2 bg-[var(--color-accent)]" />
                      hint
                    </span>
                    <span className="text-[13.5px] text-[var(--color-neutral-300)]">
                      {isVi ? "Apply — nối sang Stop mới" : "Apply — wires to a new Stop"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] items-baseline px-6 py-3.5 sm:px-7">
                    <span className="font-[var(--font-mono)] text-[13px] text-white">zero-dwell</span>
                    <span className="text-[13px] text-[var(--color-neutral-400)]">anti-detect</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-amber-400">
                      <span className="h-2 w-2 bg-amber-400" />
                      warn
                    </span>
                    <span className="text-[13.5px] text-[var(--color-neutral-300)]">
                      {isVi ? "Apply — trả về nhịp mặc định" : "Apply — back to the default cadence"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[190px_110px_90px_minmax(0,1fr)] items-baseline px-6 py-3.5 sm:px-7">
                    <span className="font-[var(--font-mono)] text-[13px] text-white">write-inside-loop</span>
                    <span className="text-[13px] text-[var(--color-neutral-400)]">cost</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-accent)]">
                      <span className="h-2 w-2 bg-[var(--color-accent)]" />
                      hint
                    </span>
                    <span className="text-[13.5px] text-[var(--color-neutral-300)]">
                      {isVi ? "Ghi thừa mỗi vòng lặp" : "Redundant write each iteration"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Per-Profile Fingerprint */}
          {activeStep === 2 && (
            <div>
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
                {isVi ? "Fingerprint mỗi profile" : "Per-profile fingerprint"}
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2">
                <div className="border-b border-[var(--color-divider-subtle)] py-3.5 sm:border-r sm:pr-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    User agent
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    Chrome/131 · Win32
                  </span>
                </div>
                <div className="border-b border-[var(--color-divider-subtle)] py-3.5 sm:pl-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    WebGL
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    ANGLE · Intel UHD 630
                  </span>
                </div>
                <div className="border-b border-[var(--color-divider-subtle)] py-3.5 sm:border-r sm:pr-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    Canvas
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    noise · seed 0x9f41
                  </span>
                </div>
                <div className="border-b border-[var(--color-divider-subtle)] py-3.5 sm:pl-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    Fonts
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    {isVi ? "142 font từ dataset" : "142 fonts from dataset"}
                  </span>
                </div>
                <div className="border-b border-[var(--color-divider-subtle)] py-3.5 sm:border-r sm:pr-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    Media devices
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    2 audio · 1 video
                  </span>
                </div>
                <div className="border-b border-[var(--color-divider-subtle)] py-3.5 sm:pl-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    Proxy
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    socks5 · VN · 62ms
                  </span>
                </div>
                <div className="border-b border-[var(--color-divider-subtle)] py-3.5 sm:border-b-0 sm:border-r sm:pr-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    {isVi ? "Chuột" : "Mouse"}
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    human-like path
                  </span>
                </div>
                <div className="py-3.5 sm:pl-5">
                  <span className="block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--color-neutral-400)]">
                    {isVi ? "Nghỉ giữa bước" : "Dwell"}
                  </span>
                  <span className="mt-1.5 block font-[var(--font-mono)] text-[13.5px] text-white">
                    {isVi ? "0–0.5s ngẫu nhiên" : "0–0.5s random"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Graph Diff */}
          {activeStep === 3 && (
            <div>
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
                Graph diff
              </p>
              <div className="mt-5 space-y-3 font-[var(--font-mono)] text-[13px] leading-relaxed sm:text-[13.5px]">
                <div className="flex items-center gap-3 border-l-2 border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3.5 py-2.5 text-white">
                  <span className="font-bold text-[var(--color-accent)]">+</span>
                  <span>
                    node <span className="text-[var(--color-neutral-300)]">waitForSelector</span> · &quot;#add-to-cart-button&quot;
                  </span>
                </div>
                <div className="flex items-center gap-3 border-l-2 border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3.5 py-2.5 text-white">
                  <span className="font-bold text-[var(--color-accent)]">+</span>
                  <span>
                    edge <span className="text-[var(--color-neutral-300)]">gotoUrl → waitForSelector</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 border-l-2 border-amber-400 bg-amber-400/10 px-3.5 py-2.5 text-white">
                  <span className="font-bold text-amber-400">~</span>
                  <span>
                    node <span className="text-[var(--color-neutral-300)]">clickElement</span> · selector{" "}
                    <span className="text-rose-400 line-through">nth-child(3)</span> →{" "}
                    <span className="text-[var(--color-accent)]">[data-testid]</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 border-l-2 border-rose-400 bg-rose-400/10 px-3.5 py-2.5 text-white">
                  <span className="font-bold text-rose-400">−</span>
                  <span>
                    node <span className="text-[var(--color-neutral-300)]">screenshot</span>
                  </span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-6 border-t border-[var(--color-divider)] pt-4 font-[var(--font-mono)] text-xs text-[var(--color-neutral-300)] sm:text-[12.5px]">
                <span>origin/main · 2 ahead</span>
                <span>3 uncommitted</span>
                <span>{isVi ? "xung đột: 0" : "conflicts: 0"}</span>
              </div>
            </div>
          )}

          {/* Tab 4: Build Pipeline */}
          {activeStep === 4 && (
            <div>
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
                Build pipeline
              </p>
              <div className="mt-5 divide-y divide-[var(--color-divider-subtle)] font-[var(--font-mono)]">
                <div className="grid grid-cols-[32px_minmax(0,1fr)_90px] items-baseline py-3">
                  <span className="text-xs text-[var(--color-accent)]">01</span>
                  <span className="text-[14.5px] text-white">
                    {isVi ? "Đọc graph & biến" : "Read graph & variables"}
                  </span>
                  <span className="text-right text-xs font-semibold text-[var(--color-accent)]">done</span>
                </div>
                <div className="grid grid-cols-[32px_minmax(0,1fr)_90px] items-baseline py-3">
                  <span className="text-xs text-[var(--color-accent)]">02</span>
                  <span className="text-[14.5px] text-white">
                    Critic gate <span className="text-xs text-[var(--color-neutral-400)]">92/85</span>
                  </span>
                  <span className="text-right text-xs font-semibold text-[var(--color-accent)]">pass</span>
                </div>
                <div className="grid grid-cols-[32px_minmax(0,1fr)_90px] items-baseline py-3">
                  <span className="text-xs text-[var(--color-accent)]">03</span>
                  <span className="text-[14.5px] text-white">
                    {isVi ? "Mã hoá bundle & gắn licence" : "Encrypt bundle & bind licence"}
                  </span>
                  <span className="text-right text-xs font-semibold text-[var(--color-accent)]">done</span>
                </div>
                <div className="grid grid-cols-[32px_minmax(0,1fr)_90px] items-baseline py-3">
                  <span className="text-xs text-[var(--color-accent)]">04</span>
                  <span className="text-[14.5px] text-white">
                    {isVi ? "Ghép stub & đổi icon" : "Assemble stub & set icon"}
                  </span>
                  <span className="text-right text-xs font-semibold text-[var(--color-accent)]">done</span>
                </div>
                <div className="grid grid-cols-[32px_minmax(0,1fr)_90px] items-baseline py-3">
                  <span className="text-xs text-[var(--color-accent)]">05</span>
                  <span className="text-[14.5px] text-white">Attestation</span>
                  <span className="text-right text-xs font-semibold text-[var(--color-accent)]">signed</span>
                </div>
              </div>
              <div className="mt-5 border border-[var(--color-divider)] p-3.5 font-[var(--font-mono)] text-xs leading-relaxed text-[var(--color-neutral-300)] sm:text-[12.5px]">
                <span className="block text-[13.5px] font-semibold text-white">amazon-cart.exe · 84.2 MB</span>
                <span className="mt-1 block">sha256 · 9f41c8a2…7bd0e134</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

