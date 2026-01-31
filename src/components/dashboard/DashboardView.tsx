"use client";

import { DashboardLoading, DashboardError, DashboardContent } from "@/components/dashboard";
import { useDashboard } from "@/hooks";

export function DashboardView() {
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    isError: dashboardError,
    error: dashboardErrorObj,
  } = useDashboard();

  if (dashboardLoading && !dashboardData) {
    return <DashboardLoading />;
  }

  if (dashboardError) {
    if (dashboardErrorObj?.message === "session_expired") return null;
    return (
      <DashboardError message={dashboardErrorObj?.message ?? "Ошибка загрузки данных dashboard"} />
    );
  }

  if (!dashboardData?.user) return null;

  return <DashboardContent dashboard={dashboardData} />;
}
