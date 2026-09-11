import { createApiClient } from "@/shared/services/api-client";

import type { DownloadSource, Release, ReleaseArchitecture, ReleaseChannel, ReleasePlatform, ReleaseQuery } from "../release.types";

const DEFAULT_QUERY: Required<ReleaseQuery> = {
  architecture: "x64",
  channel: "beta",
  platform: "windows",
};

type ApiRelease = Readonly<Record<keyof Release, unknown>>;

function isOneOf<T extends readonly string[]>(value: unknown, values: T): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

function isRelease(value: unknown): value is Release {
  if (typeof value !== "object" || value === null) return false;
  const release = value as ApiRelease;

  return typeof release.version === "string"
    && isOneOf(release.channel, ["beta", "stable"])
    && isOneOf(release.platform, ["windows"])
    && isOneOf(release.architecture, ["x64", "arm64", "universal"])
    && typeof release.downloadUrl === "string"
    && (() => { try { return new URL(release.downloadUrl).protocol === "https:"; } catch { return false; } })()
    && typeof release.sha256 === "string"
    && typeof release.fileSizeBytes === "number"
    && Number.isFinite(release.fileSizeBytes)
    && typeof release.releaseNotes === "string"
    && typeof release.publishedAt === "string"
    && !Number.isNaN(Date.parse(release.publishedAt));
}

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || null;
}

type GetLatestReleaseOptions = Readonly<{
  baseUrl?: string;
  fetcher?: typeof fetch;
  query?: ReleaseQuery;
}>;

export async function getLatestRelease(options: GetLatestReleaseOptions = {}): Promise<Release | null> {
  const baseUrl = options.baseUrl ?? getApiBaseUrl();
  if (!baseUrl) return null;

  const query = { ...DEFAULT_QUERY, ...options.query };

  try {
    const api = createApiClient({ baseUrl, fetcher: options.fetcher });
    const release = await api.get<unknown>("releases/latest", query);
    return isRelease(release) ? release : null;
  } catch {
    return null;
  }
}

type RecordDownloadIntentInput = Readonly<{
  locale: "vi" | "en";
  releaseVersion: string;
  source: DownloadSource;
}>;

export async function recordDownloadIntent(input: RecordDownloadIntentInput): Promise<void> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return;

  try {
    const api = createApiClient({ baseUrl });
    await api.post("download-events", input);
  } catch {
    // A best-effort analytic event must never block an available download.
  }
}

export type { DownloadSource, ReleaseArchitecture, ReleaseChannel, ReleasePlatform };
