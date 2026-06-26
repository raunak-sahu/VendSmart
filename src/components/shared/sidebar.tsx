"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { History } from "lucide-react";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  ShoppingCart,
  FileText,
} from "lucide-react";

type Role =
  | "ADMIN"
  | "MANAGER"
  | "EMPLOYEE"
  | null;

export default function Sidebar() {
  const [role, setRole] =
    useState<Role>(null);

  useEffect(() => {
    const storedRole =
      localStorage.getItem("role") as Role;

    setRole(storedRole);
  }, []);

  const links =
    role === "EMPLOYEE"
      ? [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "Sales",
            href: "/sales",
            icon: ShoppingCart,
          },
        ]
      : role === "MANAGER"
      ? [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "Products",
            href: "/products",
            icon: Package,
          },
          {
            name: "Vendors",
            href: "/vendors",
            icon: Users,
          },
          {
            name: "Sales",
            href: "/sales",
            icon: ShoppingCart,
          },
          {
            name: "Analytics",
            href: "/analytics",
            icon: BarChart3,
          },
          {
            name: "Reports",
            href: "/reports",
            icon: FileText,
          },
        ]
      : [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "Products",
            href: "/products",
            icon: Package,
          },
          {
            name: "Vendors",
            href: "/vendors",
            icon: Users,
          },
          {
            name: "Sales",
            href: "/sales",
            icon: ShoppingCart,
          },
          {
            name: "Analytics",
            href: "/analytics",
            icon: BarChart3,
          },
          {
            name: "Reports",
            href: "/reports",
            icon: FileText,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: Settings,
          },
          {
  name: "Inventory History",
  href: "/inventory-history",
  icon: History,
},
        ];

  return (
    
<aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      <div className="border-b p-8">

        <h1 className="text-3xl font-bold">
          VendSmart
        </h1>

        <p className="mt-2 text-slate-500">
          Inventory Intelligence
        </p>

        <div className="mt-4 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          {role || "ADMIN"}
        </div>

      </div>

      <nav className="space-y-2 p-4">

        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              px-4
              py-3
              text-slate-600
              transition
              hover:bg-slate-100
            "
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}

      </nav>

<div className="mt-auto p-4 border-t">

  <button
    onClick={() => {
      document.cookie =
        "token=; Max-Age=0; path=/";

      localStorage.clear();

      window.location.href =
        "/login";
    }}
    className="
      flex
      w-full
      items-center
      gap-3
      rounded-2xl
      px-4
      py-3
      text-red-600
      hover:bg-red-50
      transition
    "
  >
    <LogOut className="h-5 w-5" />
    Logout
  </button>

</div>
    </aside>
  );
}