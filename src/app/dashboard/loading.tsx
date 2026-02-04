import { Card, CardContent, CardHeader, Skeleton } from "@/components/ui";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen space-y-6 p-6 pb-20">
      <Skeleton className="h-8 w-32" />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="mb-4 h-px w-full" />
          <div className="grid gap-2 sm:grid-cols-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-28" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-4">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-9 w-24" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
