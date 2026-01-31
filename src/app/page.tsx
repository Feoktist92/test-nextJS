import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasTokens } from "@/lib/auth/cookies";

export default async function RootPage() {
  const store = await cookies();
  if (hasTokens(store)) redirect("/dashboard");

  redirect("/login");
}
