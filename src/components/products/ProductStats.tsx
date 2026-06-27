"use client";

import { Package, AlertTriangle, TrendingUp } from "lucide-react";

type Props = {
  total: number;
  lowStock: number;
  totalProfit: number;
};

export default function ProductStats({
  total,
  lowStock,
  totalProfit,
}: Props) {
  const cards = [
    {
      label: "Total Products",
      value: total,
      icon: Package,
      color: "text-indigo-600",
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      label: "Profit",
      value: `₹${totalProfit}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {cards.map((c) => {
        const Icon = c.icon;

        return (
          <div
            key={c.label}
            className="
              rounded-2xl border p-4
              bg-white dark:bg-slate-900
              border-slate-200 dark:border-slate-800
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {c.label}
                </p>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {c.value}
                </h3>
              </div>

              <Icon className={c.color} />

            </div>
          </div>
        );
      })}

    </div>
  );
}