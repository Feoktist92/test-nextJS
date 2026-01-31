import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasTokens } from "@/lib/auth/cookies";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  if (!hasTokens(store)) redirect("/login");
  return <>{children}</>;
}
