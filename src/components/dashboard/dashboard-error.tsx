import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type DashboardErrorProps = {
  message: string;
};

export function DashboardError({ message }: DashboardErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Ошибка загрузки</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
