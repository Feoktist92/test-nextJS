"use client";

import { useActionState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  ThemeToggle,
} from "@/components/ui";
import { loginAction } from "@/app/login/actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="fixed right-4 top-4 z-10">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>Введите учётные данные для входа</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Введите username"
                autoComplete="username"
                disabled={isPending}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Введите пароль"
                autoComplete="current-password"
                disabled={isPending}
                required
              />
            </div>
            {state?.error && (
              <p className="text-sm text-destructive" aria-live="polite">
                {state.error}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Вход…" : "Войти"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">Тест: emilys / emilyspass</p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
