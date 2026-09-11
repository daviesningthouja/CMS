"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "@/types/auth";
import { logoutAction } from "@/lib/auth-action";
import Link from "next/link";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await logoutAction();

    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-app px-3 py-2 hover:bg-muted"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
          {user.full_name.charAt(0).toUpperCase()}
        </div>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium">{user.full_name}</p>

          <p className="text-xs text-muted-foreground">{user.role}</p>
        </div>

        <span className="text-xs">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-app border bg-background p-1 shadow-lg">
          <Link
            href="/settings"
            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            Settings
          </Link>

          <Link
            href="/change-password"
            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            Change Password
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-danger hover:bg-muted"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
