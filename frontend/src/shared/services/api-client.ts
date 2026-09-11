import type { ApiEnvelope } from "@/shared/types/api";

const DEFAULT_TIMEOUT_MS = 8_000;

export class ApiClientError extends Error {
  public readonly code: string;

  public constructor(code: string) {
    super(code);
    this.code = code;
  }
}

type Fetcher = typeof fetch;

type ApiClientOptions = Readonly<{
  baseUrl: string;
  fetcher?: Fetcher;
  timeoutMs?: number;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseEnvelope<T>(value: unknown): ApiEnvelope<T> {
  if (!isRecord(value) || typeof value.success !== "boolean") {
    throw new ApiClientError("INVALID_RESPONSE");
  }

  if (value.success === true && "data" in value) {
    return { data: value.data as T, success: true };
  }

  if (value.success === false && isRecord(value.error) && typeof value.error.code === "string" && typeof value.error.message === "string") {
    return { error: { code: value.error.code, message: value.error.message }, success: false };
  }

  throw new ApiClientError("INVALID_RESPONSE");
}

export function createApiClient({ baseUrl, fetcher = fetch, timeoutMs = DEFAULT_TIMEOUT_MS }: ApiClientOptions) {
  async function request<T>(path: string, init: RequestInit, query?: Record<string, string>): Promise<T> {
    const url = new URL(path, `${baseUrl.replace(/\/$/, "")}/`);
    Object.entries(query ?? {}).forEach(([key, value]) => url.searchParams.set(key, value));

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetcher(url, { ...init, headers: { Accept: "application/json", ...init.headers }, signal: controller.signal });
      let body: unknown;

      try {
        body = await response.json();
      } catch {
        throw new ApiClientError("INVALID_RESPONSE");
      }

      const envelope = parseEnvelope<T>(body);
      if (!response.ok || !envelope.success) {
        throw new ApiClientError(envelope.success ? "REQUEST_FAILED" : envelope.error.code);
      }

      return envelope.data;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ApiClientError("REQUEST_TIMEOUT");
      }

      throw new ApiClientError("NETWORK_ERROR");
    } finally {
      clearTimeout(timeout);
    }
  }

  function get<T>(path: string, query?: Record<string, string>) {
    return request<T>(path, { method: "GET" }, query);
  }

  function post<T>(path: string, body: Record<string, unknown>) {
    return request<T>(path, { body: JSON.stringify(body), headers: { "Content-Type": "application/json" }, method: "POST" });
  }

  return { get, post } as const;
}
