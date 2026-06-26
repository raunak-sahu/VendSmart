"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  FileText,
  History,
  Settings,
  Boxes,
} from "lucide-react";
import clsx from "clsx";

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
    name: "Sales",
    href: "/sales",
    icon: ShoppingCart,
  },
  {
    name: "Purchases",
    href: "/purchases",
    icon: Boxes,
  },
  {
    name: "Vendors",
    href: "/vendors",
    icon: Truck,
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
    name: "Inventory",
    href: "/inventory-history",
    icon: History,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="
      hidden lg:flex h-screen w-72 flex-col
      border-r border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      sticky top-0
      transition-colors
    ">

      <div className="border-b border-slate-200 dark:border-slate-800 p-8">

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          VendSmart
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Inventory Management
        </p>

      </div>

      <nav className="flex-1 p-5 space-y-2">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300",

                pathname === link.href
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-slate-200 dark:border-slate-800 p-6">

        <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-5 text-white">

          <p className="text-sm opacity-90">
            Professional Edition
          </p>

          <h3 className="mt-2 text-lg font-bold">
            VendSmart ERP
          </h3>

        </div>

      </div>

    </aside>
  );
}