"use client";

import { useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Ошибка загрузки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-destructive">{error.message}</p>
          <Button variant="outline" onClick={reset}>
            Попробовать снова
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
