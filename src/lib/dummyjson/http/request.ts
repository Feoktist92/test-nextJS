import { fetchDummyJson, parseJson } from "./fetch";
import {
  requestProtected,
  SessionExpiredError,
  type RequestOptionsWithoutToken,
} from "./protected-request";

export { BASE_URL } from "./fetch";
export { SessionExpiredError, requestProtected, type RequestOptionsWithoutToken };

export async function request<T>(opts: RequestOptionsWithoutToken): Promise<T> {
  const res = await fetchDummyJson(opts.path, {
    method: opts.method,
    body: opts.body,
  });
  return parseJson<T>(res);
}
