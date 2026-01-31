import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/ui/toast";
import { queryKeys } from "@/hooks/query-keys";
import { logoutAction } from "@/app/login/actions";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutAction(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.dashboard });
      queryClient.removeQueries({ queryKey: queryKeys.products });
      router.push("/login");
      router.refresh();
    },
    onError: (err: Error) =>
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "destructive",
      }),
  });
}
