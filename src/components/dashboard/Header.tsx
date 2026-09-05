import type { User } from "@/types/auth";

import { UserMenu } from "@/components/dashboard/UserMenu";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-sm font-medium">
          Dashboard
        </h2>
      </div>

      <UserMenu user={user} />
    </header>
  );
}