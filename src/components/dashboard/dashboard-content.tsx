"use client";

import { useRef, useState } from "react";
import { ThemeToggle } from "@/components/ui";
import { DashboardHeader, DashboardCarts, DashboardProducts } from "@/components/dashboard";
import { useProducts, useAddToCart, useLogout } from "@/hooks";
import type { DashboardResponse } from "@/hooks/use-dashboard";
import type { SessionItem } from "@/lib/dummyjson/types";

type DashboardContentProps = {
  dashboard: DashboardResponse;
};

export function DashboardContent({ dashboard }: DashboardContentProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const [addedThisSession, setAddedThisSession] = useState<SessionItem[]>([]);

  const initialPage = {
    products: dashboard.products,
    total: dashboard.totalProducts,
  };

  const {
    data: productsData,
    isFetchingNextPage: productsFetchingNext,
    fetchNextPage: productsFetchNext,
  } = useProducts({ initialPage });

  const {
    mutate: addToCart,
    isPending: addCartPending,
    variables: addCartVariables,
  } = useAddToCart({
    onSuccess: (product) => {
      setAddedThisSession((prev) => [...prev, { title: product.title, price: product.price }]);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  });

  const { mutate: logout, isPending: logoutPending } = useLogout();

  const products = productsData?.pages.flatMap((p) => p.products) ?? [];
  const totalProducts = productsData?.pages[0]?.total ?? 0;
  const hasMore = products.length < totalProducts;

  return (
    <div
      className="min-h-screen space-y-6 p-6 pb-20 animate-in fade-in duration-300 ease-out"
      ref={topRef}
    >
      <div className="fixed right-5 top-4 z-10">
        <ThemeToggle />
      </div>

      <DashboardHeader
        user={dashboard.user}
        onLogout={() => logout()}
        isLoggingOut={logoutPending}
      />

      <DashboardCarts
        carts={dashboard.carts}
        addedThisSession={addedThisSession}
        isLoading={false}
        isError={false}
      />

      <DashboardProducts
        products={products}
        hasMore={hasMore}
        isFetchingNextPage={productsFetchingNext}
        onAddToCart={(p) => addToCart(p)}
        onLoadMore={() => productsFetchNext()}
        addingProductId={addCartPending && addCartVariables ? addCartVariables.id : null}
      />
    </div>
  );
}
