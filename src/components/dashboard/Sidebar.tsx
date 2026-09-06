import Link from "next/link";

import type { User } from "@/types/auth";
import { getNavigationForUser } from "@/components/dashboard/navigation";

interface SidebarProps {
  user: User;
}

export function Sidebar({
  user,
}: SidebarProps) {
  const navigation = getNavigationForUser(user);

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <h1 className="text-lg font-bold">
            Cafe Management
          </h1>

          <p className="text-xs text-muted-foreground">
            Management System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-app px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* User */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {user.full_name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {user.full_name}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}