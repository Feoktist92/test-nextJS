"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { setTokensInStore, clearSession } from "@/lib/auth/cookies";
import { login } from "@/lib/dummyjson/api";

export type LoginState = { error?: string } | null;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get("username")?.toString()?.trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!username) return { error: "Введите username" };
  if (!password) return { error: "Введите пароль" };

  try {
    const data = await login(username, password);
    const store = await cookies();
    setTokensInStore(store, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { error: message || "Произошла ошибка" };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
}
