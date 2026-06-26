"use client";

import { AlertTriangle } from "lucide-react";

const alerts = [
  { product: "Pepsi 2L", stock: 5 },
  { product: "Maggi Family Pack", stock: 8 },
  { product: "Coca Cola", stock: 3 },
];

export default function LowStockAlerts() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        p-8
        shadow-sm
        transition
        hover:shadow-xl
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-red-100 dark:bg-red-900/20 p-2">
          <AlertTriangle className="text-red-500 dark:text-red-400" />
        </div>

        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Low Stock Alerts
        </h2>
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-4">

        {alerts.length === 0 ? (
          <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-4 text-green-700 dark:text-green-400">
            All stock levels are healthy 🎉
          </div>
        ) : (
          alerts.map((item) => {
            const isCritical = item.stock <= 5;

            return (
              <div
                key={item.product}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-slate-50
                  dark:bg-slate-800
                  p-4
                  transition
                "
              >
                {/* LEFT */}
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {item.product}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Reorder Required
                  </p>
                </div>

                {/* RIGHT BADGE */}
                <span
                  className={`
                    rounded-xl px-3 py-1 text-sm font-semibold
                    ${
                      isCritical
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                    }
                  `}
                >
                  {item.stock} left
                </span>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
}