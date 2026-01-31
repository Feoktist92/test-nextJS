export async function callProtectedAction<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Error && e.message === "session_expired") {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    throw e;
  }
}
