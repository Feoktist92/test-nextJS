import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hasTokens } from "@/lib/auth/cookies";
import { LoginForm } from "@/components/auth";

export const metadata = {
  title: "Вход",
  description: "Введите учётные данные для входа",
};

export default async function LoginPage() {
  const store = await cookies();
  if (hasTokens(store)) redirect("/dashboard");

  return (
    <main>
      <LoginForm />
    </main>
  );
}
