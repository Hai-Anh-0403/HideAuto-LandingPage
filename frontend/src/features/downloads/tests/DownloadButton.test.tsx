import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DownloadButton, DownloadStatus } from "../DownloadButton";
import type { Release } from "../release.types";

const release: Release = {
  architecture: "x64", channel: "beta", downloadUrl: "https://downloads.example.test/HideAuto.exe", fileSizeBytes: 1, platform: "windows", publishedAt: "2026-09-10T10:30:00.000Z", releaseNotes: "Notes", sha256: "a".repeat(64), version: "0.1.0-beta.3",
};

describe("DownloadButton", () => {
  it("disables safely when no public release is available", () => {
    render(<><DownloadButton label="Download beta" locale="vi" release={null} source="hero" unavailableLabel="Unavailable" /><DownloadStatus release={null} source="hero" unavailableLabel="Unavailable" /></>);

    expect(screen.getByRole("button", { name: "Download beta" })).toBeDisabled();
    expect(screen.getByText("Unavailable")).toHaveAttribute("id", "download-status-hero");
  });

  it("uses the server-provided HTTPS URL when a release exists", () => {
    render(<DownloadButton label="Download beta" locale="vi" release={release} source="hero" unavailableLabel="Unavailable" />);

    expect(screen.getByRole("link", { name: "Download beta" })).toHaveAttribute("href", release.downloadUrl);
  });
});
