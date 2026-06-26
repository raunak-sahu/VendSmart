"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  X,
  Boxes,
  FileText,
  History,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>

      {open && (

        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: .25 }}
            className="fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b p-6">

              <h1 className="text-2xl font-black">
                VendSmart
              </h1>

              <button onClick={onClose}>
                <X />
              </button>

            </div>

            <div className="space-y-2 p-4">

              {links.map((item) => {

                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={20} />

                    {item.name}

                  </Link>
                );
              })}

            </div>

          </motion.aside>

        </>

      )}

    </AnimatePresence>
  );
}