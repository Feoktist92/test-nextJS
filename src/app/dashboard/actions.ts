"use server";

import { cookies } from "next/headers";
import { runProtectedSession } from "@/lib/auth/with-protected-session";
import { me, getCartsByUser, getProducts, addCart } from "@/lib/dummyjson/api";
import type { DummyUser, DummyCart, DummyProduct } from "@/lib/dummyjson/types";

export type DashboardResponse = {
  user: DummyUser;
  carts: DummyCart[];
  products: DummyProduct[];
  totalProducts: number;
};

export type ProductsPage = {
  products: DummyProduct[];
  total: number;
};


export async function getDashboardAction(): Promise<DashboardResponse | null> {
  const s = await cookies();
  try {
    return await runProtectedSession(s, async (store) => {
      const user = await me(store);
      const [cartsResp, productsResp] = await Promise.all([
        getCartsByUser(store, user.id),
        getProducts(store, 5, 0),
      ]);
      const raw = cartsResp?.carts ?? cartsResp ?? [];
      const carts = Array.isArray(raw) ? raw : [];
      const products = productsResp?.products ?? [];
      const totalProducts = productsResp?.total ?? 0;
      return { user, carts, products, totalProducts };
    });
  } catch (err) {
    if (err instanceof Error && err.message === "session_expired") {
      return null;
    }
    throw err;
  }
}

export async function getProductsAction(skip: number): Promise<ProductsPage> {
  const s = await cookies();
  return runProtectedSession(s, async (store) => {
    const resp = await getProducts(store, 5, skip);
    return {
      products: resp?.products ?? [],
      total: resp?.total ?? 0,
    };
  });
}

export async function addToCartAction(productId: number): Promise<{ success: true }> {
  if (!Number.isInteger(productId) || productId < 1 || productId > 1_000_000_000) {
    throw new Error("Некорректный идентификатор товара");
  }

  const s = await cookies();
  return runProtectedSession(
    s,
    async (store) => {
      const user = await me(store);
      await addCart(store, {
        userId: user.id,
        products: [{ id: productId, quantity: 1 }],
      });
      return { success: true as const };
    },
    "Ошибка добавления в корзину"
  );
}
