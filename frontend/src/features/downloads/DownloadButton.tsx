"use client";

import type { Locale } from "@/content";
import { Button } from "@/shared/components/Button";

import type { DownloadSource, Release } from "./release.types";
import { recordDownloadIntent } from "./services/downloads.service";

type DownloadButtonProps = Readonly<{
  className?: string;
  label: string;
  locale: Locale;
  release: Release | null;
  source: DownloadSource;
  unavailableLabel: string;
}>;

export function DownloadButton({ className, label, locale, release, source, unavailableLabel }: DownloadButtonProps) {
  if (!release) {
    return <Button aria-describedby={`download-status-${source}`} className={className} disabled type="button">{label}</Button>;
  }

  return (
    <Button className={className} href={release.downloadUrl} onClick={() => { void recordDownloadIntent({ locale, releaseVersion: release.version, source }); }}>
      {label}
    </Button>
  );
}

export function DownloadStatus({ release, source, unavailableLabel }: Pick<DownloadButtonProps, "release" | "source" | "unavailableLabel">) {
  return <p aria-live="polite" className="mt-3 text-sm text-[var(--color-neutral-600)]" id={`download-status-${source}`}>{release ? null : unavailableLabel}</p>;
}
