import { FETCH_TIMEOUT_MESSAGE, FETCH_TIMEOUT_MS } from "./constants";
import { fetchWithTimeout } from "./fetch-with-timeout";

export const BASE_URL = "https://dummyjson.com";

export type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchOpts {
  method: FetchMethod;
  body?: unknown;
  accessToken?: string;
}

export function fetchDummyJson(path: string, opts: FetchOpts): Promise<Response> {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.accessToken) headers.Authorization = `Bearer ${opts.accessToken}`;
  return fetchWithTimeout(
    url,
    {
      method: opts.method,
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    },
    { timeoutMs: FETCH_TIMEOUT_MS, timeoutMessage: FETCH_TIMEOUT_MESSAGE }
  );
}

export async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { message?: string }).message ?? `Request failed: ${res.status}`);
  }
  return data as T;
}
