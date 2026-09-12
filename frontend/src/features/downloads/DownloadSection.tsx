"use client";

import type { LandingContent, Locale } from "@/content";
import type { Release } from "./release.types";
import { recordDownloadIntent } from "./services/downloads.service";

type DownloadSectionProps = Readonly<{
  content: LandingContent["downloads"];
  locale: Locale;
  release: Release | null;
}>;

export function DownloadSection({ content, locale, release }: DownloadSectionProps) {
  function handleDownloadClick() {
    void recordDownloadIntent({
      locale,
      releaseVersion: release?.version ?? content.version,
      source: "download",
    });
  }

  return (
    <section id="download" className="px-4 pt-20 pb-0 md:px-[34px] lg:pt-24">
      <div className="blueprint relative mx-auto flex max-w-[1280px] flex-col items-center border border-[var(--color-divider)] py-14 px-6 text-center sm:py-16 sm:px-14">
        {/* Registration Marks (+) on 4 Corners */}
        <i className="corner tl" />
        <i className="corner tr" />
        <i className="corner bl" />
        <i className="corner br" />

        <h2 className="w-full max-w-[840px] text-center font-[var(--font-barlow-condensed)] text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl lg:text-[64px]">
          {content.title}
        </h2>

        <p className="mt-[22px] w-full max-w-[600px] text-center text-[17px] leading-[1.62] text-[var(--color-neutral-400)] text-pretty">
          {content.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={release?.downloadUrl ?? "#"}
            onClick={handleDownloadClick}
            className="inline-flex items-center justify-center bg-[var(--color-accent)] px-[30px] py-[14px] font-[var(--font-barlow-condensed)] text-[18px] font-semibold tracking-[0.02em] text-[var(--color-base)] transition hover:opacity-90 cursor-pointer"
          >
            {content.ctaDownload}
          </a>

          <a
            href="#features"
            className="inline-flex items-center justify-center border border-[var(--color-divider)] bg-transparent px-[26px] py-[14px] font-[var(--font-barlow-condensed)] text-[18px] font-semibold tracking-[0.02em] text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
          >
            {content.ctaReview ?? (locale === "vi" ? "Xem lại tính năng" : "Review the features")}
          </a>
        </div>

        {content.subNote ? (
          <p className="mt-5 font-[var(--font-mono)] text-[13px] tracking-[0.04em] text-[var(--color-neutral-400)] sm:text-[14px]">
            {content.subNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
