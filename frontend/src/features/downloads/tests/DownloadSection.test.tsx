import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { enContent } from "@/content/en";
import { viContent } from "@/content/vi";
import { DownloadSection } from "../DownloadSection";
import * as downloadsService from "../services/downloads.service";

vi.mock("../services/downloads.service", () => ({
  recordDownloadIntent: vi.fn(),
}));

describe("DownloadSection", () => {
  it("renders English CTA card with title, description, buttons and subnote", () => {
    render(
      <DownloadSection
        content={enContent.downloads}
        locale="en"
        release={{
          architecture: "x64",
          channel: "beta",
          downloadUrl: "https://example.com/HideAuto.exe",
          fileSizeBytes: 1000,
          platform: "windows",
          publishedAt: "2026-09-12T00:00:00.000Z",
          releaseNotes: "Beta notes",
          sha256: "abc",
          version: "0.8.4-beta",
        }}
      />
    );

    expect(screen.getByText(enContent.downloads.title)).toBeInTheDocument();
    expect(screen.getByText(enContent.downloads.description)).toBeInTheDocument();

    const downloadBtn = screen.getByRole("link", { name: enContent.downloads.ctaDownload });
    expect(downloadBtn).toHaveAttribute("href", "https://example.com/HideAuto.exe");

    const reviewBtn = screen.getByRole("link", { name: enContent.downloads.ctaReview! });
    expect(reviewBtn).toHaveAttribute("href", "#features");

    expect(screen.getByText(enContent.downloads.subNote!)).toBeInTheDocument();

    fireEvent.click(downloadBtn);
    expect(downloadsService.recordDownloadIntent).toHaveBeenCalledWith({
      locale: "en",
      releaseVersion: "0.8.4-beta",
      source: "download",
    });
  });

  it("renders Vietnamese CTA card with title, description, buttons and subnote", () => {
    render(
      <DownloadSection
        content={viContent.downloads}
        locale="vi"
        release={null}
      />
    );

    expect(screen.getByText(viContent.downloads.title)).toBeInTheDocument();
    expect(screen.getByText(viContent.downloads.description)).toBeInTheDocument();

    const downloadBtn = screen.getByRole("link", { name: viContent.downloads.ctaDownload });
    expect(downloadBtn).toHaveAttribute("href", "#");

    const reviewBtn = screen.getByRole("link", { name: viContent.downloads.ctaReview! });
    expect(reviewBtn).toHaveAttribute("href", "#features");

    expect(screen.getByText(viContent.downloads.subNote!)).toBeInTheDocument();
  });
});
