"use client";

import { useState } from "react";
import type { LandingContent, Locale } from "@/content";
import type { Release } from "@/features/downloads";

import { ProductPreview } from "./ProductPreview";
import { SchedulePreview } from "./SchedulePreview";

const mockTabs = [
  { id: "flow", labelEn: "Flow editor", labelVi: "Trình soạn flow" },
  { id: "ai", labelEn: "AI", labelVi: "AI" },
  { id: "git", labelEn: "Git", labelVi: "Git" },
  { id: "schedules", labelEn: "Schedules", labelVi: "Lịch chạy" },
] as const;

type HeroSectionProps = Readonly<{
  content: LandingContent["hero"];
  locale: Locale;
  release: Release | null;
}>;

export function HeroSection({ content, locale }: HeroSectionProps) {
  const [activeMockTab, setActiveMockTab] = useState<string>("flow");

  return (
    <section className="relative px-5" id="top">
      <div className="bg-hero-grid" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[760px] pt-16 text-center lg:pt-24">
          <div className="inline-flex items-center gap-[11px] border border-[var(--color-divider)] bg-[var(--color-surface)] px-4 py-0.5 font-[var(--font-barlow-condensed)] text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-400)]">
            <span className="size-[5px] animate-pulse bg-[var(--color-accent)]" />
            <span>{content.eyebrow}</span>
          </div>

          <h1
            className="mt-10 font-[var(--font-barlow-condensed)] text-[clamp(42px,6vw,72px)] font-bold leading-[0.94] tracking-[-0.03em] text-[var(--color-text)] text-center w-full lg:w-max lg:relative lg:left-1/2 lg:-translate-x-1/2"
          >
            {locale === "vi" ? (
              <>
                <span className="block">Automation trình duyệt</span>
                <span className="block lg:whitespace-nowrap">
                  có <span className="text-[var(--color-accent)]">{content.titleAccent}</span> trước khi chạy
                </span>
                <span className="block">thật.</span>
              </>
            ) : (
              <>
                <span className="block">Browser automation</span>
                <span className="block lg:whitespace-nowrap">
                  with a <span className="text-[var(--color-accent)]">{content.titleAccent}</span> before it runs for
                </span>
                <span className="block">real.</span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-8 max-w-[620px] font-[var(--font-barlow-condensed)] text-[clamp(15px,1.4vw,17px)] font-semibold leading-[1.65] text-[var(--color-neutral-600)] text-pretty">
            {content.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              className="blueprint relative border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-[11px] font-[var(--font-barlow-condensed)] text-[17px] font-semibold tracking-[0.02em] text-[var(--on-ac)] transition-opacity hover:opacity-90"
              href="#download"
            >
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />
              <span>{content.ctaPrimary}</span>
            </a>

            <a
              className="inline-flex items-center gap-[9px] border border-[var(--color-divider)] bg-[var(--color-surface)] px-6 py-[11px] font-[var(--font-barlow-condensed)] text-[17px] font-semibold tracking-[0.02em] text-[var(--color-text)] transition-colors hover:border-[var(--color-neutral-400)]"
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="size-[17px] shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.15 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>{content.ctaSecondary}</span>
            </a>
          </div>

          <p className="mt-6 font-[var(--font-barlow-condensed)] text-[13px] font-semibold tracking-[0.03em] text-[var(--color-neutral-400)]">
            {locale === "vi"
              ? "Miễn phí trong beta · Không cần thẻ · Tự cập nhật qua launcher"
              : "Free during beta · No card · Self-updating launcher"}
          </p>
        </div>

        <div className="mt-[46px] pb-12">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {mockTabs.map((tab) => {
                const isActive = activeMockTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={`hero-mock-tab min-w-[90px] px-6 py-1 text-center font-[var(--font-barlow-condensed)] text-[15px] font-semibold tracking-[0.02em] transition-colors ${
                      isActive
                        ? "border border-[#e7e8ea] bg-[#e7e8ea] text-[#0f1114]"
                        : "border border-[var(--color-divider)] bg-transparent text-[var(--color-neutral-400)] hover:border-[var(--color-neutral-400)] hover:text-white"
                    }`}
                    onClick={() => setActiveMockTab(tab.id)}
                    type="button"
                  >
                    {locale === "vi" ? tab.labelVi : tab.labelEn}
                  </button>
                );
              })}
            </div>

            <div className="blueprint relative">
              <i className="corner tl z-10" />
              <i className="corner tr z-10" />
              <i className="corner bl z-10" />
              <i className="corner br z-10" />
              {activeMockTab === "schedules" ? (
                <SchedulePreview locale={locale} onSwitchTab={setActiveMockTab} />
              ) : (
                <ProductPreview
                  content={content}
                  locale={locale}
                  onSwitchTab={setActiveMockTab}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
