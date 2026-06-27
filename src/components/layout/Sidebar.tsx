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
  LogOut,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Purchases", href: "/purchases", icon: Boxes },
  { name: "Vendors", href: "/vendors", icon: Truck },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Inventory", href: "/inventory-history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className="
      hidden lg:flex h-screen w-72 flex-col
      border-r border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      sticky top-0
    "
    >
      {/* Brand */}
      <div className="border-b border-slate-200 dark:border-slate-800 p-6">
        <h1 className="text-3xl font-black tracking-tight">
          VendSmart
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Inventory Management
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;

          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <button
          className="
          flex w-full items-center gap-3 rounded-xl
          px-4 py-3 text-sm font-medium
          text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10
          transition
        "
        >
          <LogOut size={18} />
          Logout
        </button>

        <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
          <p className="text-xs opacity-90">Professional Edition</p>
          <p className="font-bold">VendSmart ERP</p>
        </div>
      </div>
    </aside>
  );
}