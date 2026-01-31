export async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  options: { timeoutMs: number; timeoutMessage: string }
): Promise<Response> {
  const { timeoutMs, timeoutMessage } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(timeoutMessage);
    }
    throw err;
  }
}
