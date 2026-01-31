import type { CookieStore } from "@/lib/auth/cookies";
import { requestProtected } from "../http/request";
import { routes } from "../routes";
import type { DummyUser } from "../types";

export async function me(store: CookieStore): Promise<DummyUser> {
  return requestProtected<DummyUser>(store, {
    method: "GET",
    path: routes.auth.me,
  });
}
