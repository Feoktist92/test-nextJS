import type { CartProduct, DummyCart, SessionItem } from "@/lib/dummyjson/types";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type DashboardCartsProps = {
  carts: DummyCart[];
  addedThisSession: SessionItem[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
};

function ProductRow({ p }: { p: CartProduct }) {
  return (
    <li className="flex justify-between gap-2 text-sm">
      <span className="truncate">{p.title}</span>
      <span className="shrink-0 tabular-nums">
        {p.quantity} × {p.price} = {p.total}
      </span>
    </li>
  );
}

export function DashboardCarts({
  carts,
  addedThisSession,
  isLoading,
  isError,
  error,
}: DashboardCartsProps) {
  const totalCount =
    carts.reduce((acc, c) => acc + (c.totalQuantity ?? c.totalProducts ?? 0), 0) +
    addedThisSession.length;
  const totalCost = (
    carts.reduce((acc, c) => acc + (c.discountedTotal ?? c.total ?? 0), 0) +
    addedThisSession.reduce((acc, i) => acc + i.price, 0)
  ).toFixed(2);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Корзина</CardTitle>
        {totalCount > 0 && !isLoading && <Badge variant="secondary">{totalCount}</Badge>}
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && <p className="text-sm text-muted-foreground">Загрузка…</p>}
        {!isLoading && isError && (
          <p className="text-sm text-destructive">
            {error?.message ?? "Не удалось загрузить корзины"}
          </p>
        )}
        {!isLoading && !isError && addedThisSession.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Добавлено в этой сессии:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm">
              {addedThisSession.map((item, i) => (
                <li key={i}>
                  {item.title} — {item.price}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!isLoading && !isError && carts.length > 0 && (
          <ul className="space-y-4">
            {carts.map((cart) => (
              <li key={cart.id} className="rounded-md border p-3 text-sm">
                <p className="mb-2 font-medium">
                  Корзина #{cart.id}: {cart.totalProducts} товаров
                </p>
                {Array.isArray(cart.products) && cart.products.length > 0 ? (
                  <ul className="mb-2 space-y-1">
                    {cart.products.map((p) => (
                      <ProductRow key={`${cart.id}-${p.id}-${p.quantity}`} p={p} />
                    ))}
                  </ul>
                ) : null}
                <p className="border-t pt-2 font-medium tabular-nums">
                  Итого по корзине: {cart.discountedTotal ?? cart.total}
                </p>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !isError && (carts.length > 0 || addedThisSession.length > 0) && (
          <p className="border-t pt-3 text-base font-semibold tabular-nums">
            Общая стоимость: {totalCost}
          </p>
        )}
        {!isLoading && !isError && carts.length === 0 && addedThisSession.length === 0 && (
          <p className="text-sm text-muted-foreground">Корзина пока пуста</p>
        )}
      </CardContent>
    </Card>
  );
}
