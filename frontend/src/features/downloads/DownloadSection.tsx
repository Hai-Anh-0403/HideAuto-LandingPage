"use client";

import { useState } from "react";
import type { LandingContent, Locale } from "@/content";
import { Container } from "@/shared/components/Container";
import type { Release } from "./release.types";
import { recordDownloadIntent } from "./services/downloads.service";

type DownloadSectionProps = Readonly<{
  content: LandingContent["downloads"];
  locale: Locale;
  release: Release | null;
}>;

export function DownloadSection({ content, locale, release }: DownloadSectionProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function copyChecksum() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(content.sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  function handleDownloadClick(format: string) {
    void recordDownloadIntent({
      locale,
      releaseVersion: release?.version ?? content.version,
      source: "download",
    });
  }

  return (
    <section className="bg-blueprint-grid relative border-b border-[var(--color-divider)] py-20 sm:py-28" id="download">
      <Container>
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-[var(--color-divider)] bg-[#14171c] px-3 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-accent)]">
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-neutral-400)] sm:text-lg">
            {content.description}
          </p>
        </div>

        {/* Two-Column Grid: Download Cards & Beta Signup */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Main Download Package Card */}
          <div className="blueprint border border-[var(--color-accent)] bg-[#13171d] p-6 sm:p-8">
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />

            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-divider)] pb-4">
              <div>
                <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-accent)]">
                  OFFICIAL BUILD
                </span>
                <p className="font-[var(--font-barlow-condensed)] text-2xl font-bold text-white">
                  {content.os}
                </p>
              </div>
              <span className="border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-[var(--font-mono)] text-xs font-semibold text-emerald-400">
                {release?.version ?? content.version}
              </span>
            </div>

            {/* Download Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="blueprint inline-flex min-h-12 flex-1 items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 font-[var(--font-barlow-condensed)] text-base font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
                href={release?.downloadUrl ?? "#"}
                onClick={() => handleDownloadClick("installer")}
              >
                <i className="corner tl" />
                <i className="corner tr" />
                <i className="corner bl" />
                <i className="corner br" />
                <span>{content.ctaDownload}</span>
                <span className="ml-2 font-[var(--font-mono)] text-xs font-normal opacity-80">
                  ({content.installerSize})
                </span>
              </a>

              <a
                className="blueprint inline-flex min-h-12 items-center justify-center border border-[var(--color-divider)] bg-[#181d24] px-5 font-[var(--font-barlow-condensed)] text-base font-semibold tracking-wide text-[var(--color-text)] transition-colors hover:border-[var(--color-neutral-400)] hover:text-white"
                href={release?.downloadUrl ?? "#"}
                onClick={() => handleDownloadClick("portable")}
              >
                <i className="corner tl" />
                <i className="corner tr" />
                <i className="corner bl" />
                <i className="corner br" />
                <span>{content.ctaPortable}</span>
                <span className="ml-2 font-[var(--font-mono)] text-xs text-[var(--color-neutral-400)]">
                  ({content.portableSize})
                </span>
              </a>
            </div>

            {/* SHA256 Checksum Card */}
            <div className="mt-6 border border-[var(--color-divider)] bg-[#0a0c0f] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-[var(--font-mono)] text-[10px] uppercase text-[var(--color-neutral-400)]">
                  SHA-256 CHECKSUM VERIFICATION:
                </span>
                <button
                  className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)] hover:underline"
                  onClick={copyChecksum}
                  type="button"
                >
                  {copied ? "COPIED ✔" : "COPY CHECKSUM"}
                </button>
              </div>
              <p className="mt-1.5 break-all font-[var(--font-mono)] text-[11px] text-[var(--color-neutral-400)]">
                {content.sha256}
              </p>
            </div>
          </div>

          {/* Beta Email Updates Form */}
          <div className="blueprint flex flex-col justify-between border border-[var(--color-divider)] bg-[#13171d] p-6 sm:p-8">
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />

            <div>
              <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-accent)]">
                STAY UPDATED
              </span>
              <h3 className="mt-1 font-[var(--font-barlow-condensed)] text-2xl font-bold text-white">
                {content.betaSignup.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-neutral-400)]">
                {content.betaSignup.description}
              </p>

              {subscribed ? (
                <div
                  aria-live="polite"
                  className="mt-6 border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400"
                >
                  {content.betaSignup.successMessage}
                </div>
              ) : (
                <form className="mt-6 space-y-3" onSubmit={handleSubscribe}>
                  <input
                    aria-label="Email address"
                    className="w-full border border-[var(--color-divider)] bg-[#0a0c0f] px-3.5 py-2.5 font-[var(--font-mono)] text-xs text-white placeholder:text-[var(--color-neutral-600)] focus:border-[var(--color-accent)] focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={content.betaSignup.placeholder}
                    required
                    type="email"
                    value={email}
                  />
                  <button
                    className="blueprint inline-flex min-h-11 w-full items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 font-[var(--font-barlow-condensed)] text-base font-bold uppercase text-black transition-opacity hover:opacity-90"
                    type="submit"
                  >
                    <i className="corner tl" />
                    <i className="corner tr" />
                    <i className="corner bl" />
                    <i className="corner br" />
                    <span>{content.betaSignup.buttonText}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 border-t border-[var(--color-divider)] pt-3 text-[10px] text-[var(--color-neutral-600)]">
              Cam kết không spam. Bạn có thể hủy đăng ký bất kỳ lúc nào.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
