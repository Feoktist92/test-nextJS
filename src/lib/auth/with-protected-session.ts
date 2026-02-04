import type { CookieStore } from "./cookies";
import { SessionExpiredError } from "@/lib/dummyjson/http";

export async function runProtectedSession<T>(
  store: CookieStore,
  fn: (store: CookieStore) => Promise<T>,
  errorMessage = "Ошибка загрузки"
): Promise<T> {
  try {
    return await fn(store);
  } catch (err) {
    if (err instanceof SessionExpiredError) {
      throw new Error("session_expired");
    }
    const message = err instanceof Error ? err.message : errorMessage;
    throw new Error(message);
  }
}
