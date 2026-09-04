"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUser } from "@/lib/auth";
import type { User } from "@/types/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.replace("/login");
    }
  }, [router]);

  const user = getUser();

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="mt-2 text-muted-foreground">
        Welcome back, {user.full_name}.
      </p>
    </main>
  );
}
