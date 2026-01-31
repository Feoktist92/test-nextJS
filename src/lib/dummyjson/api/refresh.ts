import { fetchDummyJson, parseJson } from "../http/fetch";
import { routes } from "../routes";
import type { RefreshResponse } from "../types";

const refreshPromises = new Map<string, Promise<RefreshResponse>>();

export async function refreshTokens(refreshToken: string): Promise<RefreshResponse> {
  const existing = refreshPromises.get(refreshToken);
  if (existing) return existing;

  const promise = (async () => {
    try {
      const res = await fetchDummyJson(routes.auth.refresh, {
        method: "POST",
        body: { refreshToken, expiresInMins: 15 },
      });
      return parseJson<RefreshResponse>(res);
    } finally {
      refreshPromises.delete(refreshToken);
    }
  })();

  refreshPromises.set(refreshToken, promise);
  return promise;
}
