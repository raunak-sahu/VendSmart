"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const links = [
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
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-200 bg-white">

      <div className="p-8 border-b">

        <h1 className="text-3xl font-bold">
          VendSmart
        </h1>

        <p className="mt-2 text-slate-500">
          Inventory Intelligence
        </p>

      </div>

      <nav className="p-4 space-y-2">

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
              hover:bg-slate-100
              transition
            "
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}

      </nav>

    </aside>
  );
}