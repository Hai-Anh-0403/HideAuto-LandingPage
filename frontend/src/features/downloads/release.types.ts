export const RELEASE_CHANNELS = ["beta", "stable"] as const;
export const RELEASE_PLATFORMS = ["windows"] as const;
export const RELEASE_ARCHITECTURES = ["x64", "arm64", "universal"] as const;

export type ReleaseChannel = (typeof RELEASE_CHANNELS)[number];
export type ReleasePlatform = (typeof RELEASE_PLATFORMS)[number];
export type ReleaseArchitecture = (typeof RELEASE_ARCHITECTURES)[number];

export type Release = Readonly<{
  architecture: ReleaseArchitecture;
  channel: ReleaseChannel;
  downloadUrl: string;
  fileSizeBytes: number;
  platform: ReleasePlatform;
  publishedAt: string;
  releaseNotes: string;
  sha256: string;
  version: string;
}>;

export type ReleaseQuery = Readonly<{
  architecture?: ReleaseArchitecture;
  channel?: ReleaseChannel;
  platform?: ReleasePlatform;
}>;

export const DOWNLOAD_SOURCES = ["hero", "pricing", "footer", "download", "launcher", "direct"] as const;
export type DownloadSource = (typeof DOWNLOAD_SOURCES)[number];
