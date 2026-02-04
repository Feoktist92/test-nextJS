import { cookies } from "next/headers";

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";

export interface TokenPair {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export type CookieStore = Awaited<ReturnType<typeof cookies>>;

const COOKIE_OPTS = {
  path: "/" as const,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export function getTokensFromStore(store: CookieStore): TokenPair {
  return {
    accessToken: store.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: store.get(REFRESH_TOKEN_COOKIE)?.value,
  };
}

export function hasTokens(store: CookieStore): boolean {
  const { accessToken, refreshToken } = getTokensFromStore(store);
  return Boolean(accessToken ?? refreshToken);
}

export function setTokensInStore(
  store: CookieStore,
  tokens: { accessToken: string; refreshToken: string }
): void {
  store.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...COOKIE_OPTS,
    maxAge: 15 * 60,
  });
  store.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...COOKIE_OPTS,
    maxAge: 7 * 24 * 60 * 60,
  });
}

export function saveTokensIfWritable(
  store: CookieStore,
  tokens: { accessToken: string; refreshToken: string } | undefined
): void {
  if (!tokens) return;
  try {
    setTokensInStore(store, tokens);
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.debug("[auth] Tokens not writable in this context (e.g. Server Component). Will persist on next Server Action.");
    }
  }
}

export function clearTokensInStore(store: CookieStore): void {
  store.set(ACCESS_TOKEN_COOKIE, "", { ...COOKIE_OPTS, maxAge: 0 });
  store.set(REFRESH_TOKEN_COOKIE, "", { ...COOKIE_OPTS, maxAge: 0 });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  clearTokensInStore(store);
}
