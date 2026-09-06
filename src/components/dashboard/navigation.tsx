import type {User} from "@/types/auth"

export type UserRole =
  | "admin"
  | "manager"
  | "staff";

export interface NavigationItem {
  label: string;
  href: string;
  roles?: UserRole[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },

  {
    label: "Products",
    href: "/products",
    roles: ["admin", "manager"],
  },

  {
    label: "Categories",
    href: "/categories",
    roles: ["admin", "manager"],
  },

  {
    label: "Tables",
    href: "/tables",
    roles: ["admin", "manager", "staff"],
  },

  {
    label: "Orders",
    href: "/orders",
    roles: ["admin", "manager", "staff"],
  },

  {
    label: "Reports",
    href: "/reports",
    roles: ["admin", "manager"],
  },

  {
    label: "Settings",
    href: "/settings",
    roles: ["admin"],
  },
];

export function getNavigationForUser(user: User) {
  return navigationItems.filter((item) => {
    if (!item.roles) {
      return true;
    }

    return item.roles.includes(
      user.role as UserRole
    );
  });
}