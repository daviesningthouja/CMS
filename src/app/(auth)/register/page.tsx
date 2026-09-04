import { useEffect, useState } from "react";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
export default function RegisterPage() {
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
    <main>
      <h1>Register</h1>
      <p>Create your cafe management account.</p>
    </main>
  );
}
