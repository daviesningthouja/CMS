import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

import type { User } from "@/types/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    "cafe_auth_token"
  )?.value;

  const userCookie = cookieStore.get(
    "cafe_user"
  )?.value;

  if (!token || !userCookie) {
    redirect("/login");
  }

  let user: User;

  try {
    user = JSON.parse(userCookie) as User;
  } catch {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar user={user} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header user={user} />

        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}