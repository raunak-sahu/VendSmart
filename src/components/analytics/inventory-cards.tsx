"use client";

import { useEffect, useState } from "react";
import {
  Package,
  IndianRupee,
  AlertTriangle,
  Boxes,
} from "lucide-react";

export default function InventoryCards() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const cards = [
    {
      title: "Inventory Value",
      value: `₹${(data?.totalInventoryValue || 0).toLocaleString()}`,
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      title: "Retail Value",
      value: `₹${(data?.totalRetailValue || 0).toLocaleString()}`,
      icon: Package,
      color: "text-indigo-600",
    },
    {
      title: "Low Stock",
      value: data?.lowStock || 0,
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      title: "Total Units",
      value: data?.totalItems || 0,
      icon: Boxes,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-3xl border border-slate-200 dark:border-slate-800
              bg-white dark:bg-slate-900
              p-6 shadow-sm
              hover:shadow-lg transition
            "
          >
            <Icon className={`h-7 w-7 ${card.color}`} />

            <h3 className="mt-4 text-slate-500 dark:text-slate-400">
              {card.title}
            </h3>

            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {card.value}
            </p>
          </div>
        );
      })}

    </div>
  );
}