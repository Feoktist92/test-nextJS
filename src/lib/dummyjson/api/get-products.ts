import type { CookieStore } from "@/lib/auth/cookies";
import { requestProtected } from "../http/request";
import { routes } from "../routes";
import type { ProductsResponse } from "../types";

export async function getProducts(
  store: CookieStore,
  limit: number,
  skip: number
): Promise<ProductsResponse> {
  const path = `${routes.auth.products}?limit=${limit}&skip=${skip}`;
  return requestProtected<ProductsResponse>(store, {
    method: "GET",
    path,
  });
}
