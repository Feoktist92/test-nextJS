import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/query-keys";
import { callProtectedAction } from "@/lib/auth/call-protected-action";
import { getProductsAction, type ProductsPage } from "@/app/dashboard/actions";

export type { ProductsPage };

export type UseProductsOptions = {
  initialPage?: ProductsPage | null;
};

export function useProducts(options: UseProductsOptions = {}) {
  const { initialPage } = options;

  return useInfiniteQuery({
    queryKey: queryKeys.products,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      callProtectedAction(() => getProductsAction(pageParam)),
    initialPageParam: 0,
    initialData: initialPage != null ? { pages: [initialPage], pageParams: [0] } : undefined,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.products.length, 0);
      return loaded < lastPage.total ? loaded : undefined;
    },
  });
}
