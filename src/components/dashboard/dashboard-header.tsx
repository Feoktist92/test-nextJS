import Image from "next/image";
import type { DummyUser } from "@/lib/dummyjson/types";
import { Button, Card, CardContent, CardHeader, Separator } from "@/components/ui";

type DashboardHeaderProps = {
  user: DummyUser;
  onLogout: () => void;
  isLoggingOut: boolean;
};

export function DashboardHeader({ user, onLogout, isLoggingOut }: DashboardHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={user.image ?? ""}
                alt=""
                className="rounded-full"
                width={48}
                height={48}
              />
              <div>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <Button variant="destructive" onClick={onLogout} disabled={isLoggingOut}>
              Выйти
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Separator className="mb-4" />
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd className="mt-0.5">{user.email}</dd>
            </div>
            {user.gender && (
              <div>
                <dt className="font-medium text-muted-foreground">Пол</dt>
                <dd className="mt-0.5 capitalize">{user.gender}</dd>
              </div>
            )}
            {user.address?.address && (
              <div>
                <dt className="font-medium text-muted-foreground">Адрес</dt>
                <dd className="mt-0.5">{user.address.address}</dd>
              </div>
            )}
            {user.address?.city && (
              <div>
                <dt className="font-medium text-muted-foreground">Город</dt>
                <dd className="mt-0.5">{user.address.city}</dd>
              </div>
            )}
            {user.address?.country && (
              <div>
                <dt className="font-medium text-muted-foreground">Страна</dt>
                <dd className="mt-0.5">{user.address.country}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </>
  );
}
