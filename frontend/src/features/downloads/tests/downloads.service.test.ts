import { describe, expect, it, vi } from "vitest";

import { getLatestRelease } from "../services/downloads.service";

const apiBaseUrl = "https://api.example.test/api/v1";

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" }, status });
}

describe("getLatestRelease", () => {
  it("returns a validated documented release", async () => {
    const fetcher = vi.fn().mockResolvedValue(response({ success: true, data: { version: "0.1.0-beta.3", channel: "beta", platform: "windows", architecture: "x64", downloadUrl: "https://downloads.example.test/HideAuto.exe", sha256: "a".repeat(64), fileSizeBytes: 84500000, releaseNotes: "Notes", publishedAt: "2026-09-10T10:30:00.000Z" } }));

    await expect(getLatestRelease({ baseUrl: apiBaseUrl, fetcher })).resolves.toMatchObject({ version: "0.1.0-beta.3" });
    const requestUrl = new URL(String(fetcher.mock.calls[0]?.[0]));
    expect(requestUrl.searchParams.get("channel")).toBe("beta");
    expect(requestUrl.searchParams.get("platform")).toBe("windows");
    expect(requestUrl.searchParams.get("architecture")).toBe("x64");
  });

  it("returns null for an invalid release response", async () => {
    const fetcher = vi.fn().mockResolvedValue(response({ success: true, data: { version: "0.1.0" } }));

    await expect(getLatestRelease({ baseUrl: apiBaseUrl, fetcher })).resolves.toBeNull();
  });

  it("returns null when the public release is not found", async () => {
    const fetcher = vi.fn().mockResolvedValue(response({ success: false, error: { code: "RELEASE_NOT_FOUND", message: "Missing" } }, 404));

    await expect(getLatestRelease({ baseUrl: apiBaseUrl, fetcher })).resolves.toBeNull();
  });
});
