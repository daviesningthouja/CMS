"use client";

import Link from "next/link";
import { useState } from "react";

import type { User } from "@/types/auth";
import { getNavigationForUser } from "@/components/dashboard/navigation";

interface MobileSidebarProps {
  user: User;
}

export function MobileSidebar({
  user,
}: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  const navigation = getNavigationForUser(user);

  return (
    <>
      {/* Menu button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="rounded-app p-2 hover:bg-muted md:hidden"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          border-r
          bg-background
          shadow-xl
          transition-transform
          duration-200
          md:hidden
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-5">
          <div>
            <h1 className="text-lg font-bold">
              Cafe Management
            </h1>

            <p className="text-xs text-muted-foreground">
              Management System
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="rounded-app p-2 hover:bg-muted"
          >
            ✕
          </button>
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
                onClick={() => setOpen(false)}
                className="block rounded-app px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* User */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {user.full_name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {user.full_name}
              </p>

              <p className="text-xs text-muted-foreground">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}