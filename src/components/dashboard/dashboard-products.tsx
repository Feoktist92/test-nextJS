import type { DummyProduct } from "@/lib/dummyjson/types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

type DashboardProductsProps = {
  products: DummyProduct[];
  hasMore: boolean;
  isFetchingNextPage: boolean;
  onAddToCart: (product: DummyProduct) => void;
  onLoadMore: () => void;
  addingProductId: number | null;
};

export function DashboardProducts({
  products,
  hasMore,
  isFetchingNextPage,
  onAddToCart,
  onLoadMore,
  addingProductId,
}: DashboardProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Продукты</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead className="text-right">Действие</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Нет продуктов
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="min-w-[8.5rem]"
                      disabled={addingProductId === p.id}
                      onClick={() => onAddToCart(p)}
                    >
                      {addingProductId === p.id ? "Добавление…" : "В корзину"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" disabled={isFetchingNextPage} onClick={onLoadMore}>
              {isFetchingNextPage ? "Загрузка…" : "Загрузить ещё"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
