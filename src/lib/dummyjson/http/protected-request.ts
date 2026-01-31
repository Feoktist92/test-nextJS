import { getTokensFromStore, setTokensInStore, type CookieStore } from "@/lib/auth/cookies";
import { refreshTokens } from "../api/refresh";
import type { RefreshResponse } from "../types";
import { fetchDummyJson, parseJson, type FetchMethod } from "./fetch";

export class SessionExpiredError extends Error {
  constructor(message = "Session expired") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

export type RequestOptionsWithoutToken = {
  method: FetchMethod;
  path: string;
  body?: unknown;
};

async function performRefresh(refreshToken: string): Promise<{
  accessToken: string;
  newTokens: RefreshResponse;
}> {
  const newTokens = await refreshTokens(refreshToken);
  return { accessToken: newTokens.accessToken, newTokens };
}

export async function requestProtected<T>(
  store: CookieStore,
  opts: RequestOptionsWithoutToken
): Promise<T> {
  const { method, path, body } = opts;
  const tokenPair = getTokensFromStore(store);
  if (!tokenPair.refreshToken) throw new SessionExpiredError("No token pair");

  let accessToken = tokenPair.accessToken;
  let newTokens: RefreshResponse | undefined;
  if (!accessToken) {
    const refreshed = await performRefresh(tokenPair.refreshToken);
    accessToken = refreshed.accessToken;
    newTokens = refreshed.newTokens;
  }

  let res = await fetchDummyJson(path, { method, body, accessToken });
  if (res.status === 401) {
    try {
      const refreshed = await performRefresh(tokenPair.refreshToken);
      accessToken = refreshed.accessToken;
      newTokens = refreshed.newTokens;
      res = await fetchDummyJson(path, { method, body, accessToken });
    } catch {
      throw new SessionExpiredError("Refresh failed");
    }
    if (res.status === 401) throw new SessionExpiredError("Still unauthorized after refresh");
  }

  if (newTokens) setTokensInStore(store, newTokens);
  return parseJson<T>(res);
}
