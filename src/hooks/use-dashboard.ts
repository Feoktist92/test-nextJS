import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/query-keys";
import { callProtectedAction } from "@/lib/auth/call-protected-action";
import { getDashboardAction, type DashboardResponse } from "@/app/dashboard/actions";

export type { DashboardResponse };

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => callProtectedAction(() => getDashboardAction()),
  });
}
