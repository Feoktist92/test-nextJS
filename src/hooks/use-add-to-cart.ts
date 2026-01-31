import { useMutation } from "@tanstack/react-query";
import { toast } from "@/lib/ui/toast";
import { callProtectedAction } from "@/lib/auth/call-protected-action";
import { addToCartAction } from "@/app/dashboard/actions";
import type { DummyProduct } from "@/lib/dummyjson/types";

type UseAddToCartOptions = {
  onSuccess?: (product: DummyProduct) => void;
};

export function useAddToCart(options: UseAddToCartOptions = {}) {
  return useMutation({
    mutationFn: (product: DummyProduct) => callProtectedAction(() => addToCartAction(product.id)),
    onSuccess: (_, product) => {
      toast({ title: `Добавлено в корзину: ${product.title}` });
      options.onSuccess?.(product);
    },
    onError: (err: Error) =>
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "destructive",
      }),
  });
}
