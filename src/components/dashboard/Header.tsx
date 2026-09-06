import type { User } from "@/types/auth";

import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { UserMenu } from "@/components/dashboard/UserMenu";

interface HeaderProps {
  user: User;
}

export function Header({
  user,
}: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar user={user} />

        <div>
          <h2 className="text-sm font-semibold">
            Dashboard
          </h2>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Cafe overview
          </p>
        </div>
      </div>

      <UserMenu user={user} />
    </header>
  );
}