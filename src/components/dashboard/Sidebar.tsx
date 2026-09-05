import type { User } from "@/types/auth";
import Link from "next/link";

import { navigationItems } from "@/components/dashboard/navigation";
interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold">Cafe Management</h1>
      </div>

      <div className="flex-1 p-4">
        <p className="mb-4 px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Menu
        </p>

        <nav className="space-y-1">
          {navigationItems
            .filter((item) => {
              if (!item.roles) {
                return true;
              }

              return item.roles.includes(
                user.role as "admin" | "manager" | "staff",
              );
            })
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-app px-3 py-2 text-sm transition hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">Signed in as</p>

        <p className="mt-1 truncate text-sm font-medium">{user.full_name}</p>

        <p className="text-xs text-muted-foreground">{user.role}</p>
      </div>
    </aside>
  );
}
