import type { CookieStore } from "@/lib/auth/cookies";
import { requestProtected } from "../http/request";
import { routes } from "../routes";
import type { AddCartRequest, DummyCart } from "../types";

export async function addCart(store: CookieStore, body: AddCartRequest): Promise<DummyCart> {
  return requestProtected<DummyCart>(store, {
    method: "POST",
    path: routes.auth.cartsAdd,
    body,
  });
}
