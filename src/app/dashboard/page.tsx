import { redirect } from "next/navigation";
import { getDashboardAction } from "@/app/dashboard/actions";
import { DashboardContent } from "@/components/dashboard";

export const metadata = {
  title: "Next.js Auth Dashboard",
  description: "Next.js app with DummyJSON auth",
};

export default async function DashboardPage() {
  const data = await getDashboardAction();

  if (!data) {
    redirect("/login");
  }

  return (
    <main>
      <DashboardContent dashboard={data} />
    </main>
  );
}
