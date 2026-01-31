import type { CookieStore } from "@/lib/auth/cookies";
import { requestProtected } from "../http/request";
import { routes } from "../routes";
import type { CartsResponse } from "../types";

export async function getCartsByUser(store: CookieStore, userId: number): Promise<CartsResponse> {
  return requestProtected<CartsResponse>(store, {
    method: "GET",
    path: routes.auth.cartsUser(userId),
  });
}
