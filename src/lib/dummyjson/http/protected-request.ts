import { getTokensFromStore, saveTokensIfWritable, type CookieStore } from "@/lib/auth/cookies";
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

type AccessTokenResult = { accessToken: string; newTokens?: RefreshResponse };

async function getAccessToken(store: CookieStore, forceRefresh = false): Promise<AccessTokenResult> {
  const tokenPair = getTokensFromStore(store);
  if (!tokenPair.refreshToken) throw new SessionExpiredError("No token pair");
  if (!forceRefresh && tokenPair.accessToken) {
    return { accessToken: tokenPair.accessToken };
  }
  const newTokens = await refreshTokens(tokenPair.refreshToken);
  return { accessToken: newTokens.accessToken, newTokens };
}

export async function requestProtected<T>(
  store: CookieStore,
  opts: RequestOptionsWithoutToken
): Promise<T> {
  const { method, path, body } = opts;
  let { accessToken, newTokens } = await getAccessToken(store);

  let res = await fetchDummyJson(path, { method, body, accessToken });
  if (res.status === 401) {
    try {
      ({ accessToken, newTokens } = await getAccessToken(store, true));
      res = await fetchDummyJson(path, { method, body, accessToken });
    } catch {
      throw new SessionExpiredError("Refresh failed");
    }
    if (res.status === 401) throw new SessionExpiredError("Still unauthorized after refresh");
  }

  saveTokensIfWritable(store, newTokens);
  return parseJson<T>(res);
}
