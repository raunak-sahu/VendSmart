"use client";

import { useEffect, useState } from "react";
import { Truck, ShoppingBag, IndianRupee } from "lucide-react";

type Vendor = {
  vendorName: string;
  totalSpend: number;
  orders: number;
};

export default function VendorSpend() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vendor-analytics")
      .then((r) => r.json())
      .then((data) => {
        setVendors(data || []);
        setLoading(false);
      });
  }, []);

  const maxSpend = Math.max(
    ...vendors.map((v) => v.totalSpend || 0),
    1
  );

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:shadow-xl">

      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-indigo-100 dark:bg-indigo-900/30 p-2">
          <Truck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Vendor Analytics
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Vendor expenditure insights
          </p>
        </div>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-5">

          {vendors.map((v) => {
            const percent = (v.totalSpend / maxSpend) * 100;

            return (
              <div key={v.vendorName}>

                {/* ROW */}
                <div className="mb-2 flex items-center justify-between">

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {v.vendorName}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <ShoppingBag size={12} />
                      {v.orders} orders
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="flex items-center gap-1 justify-end font-bold text-slate-900 dark:text-white">
                      <IndianRupee size={14} />
                      {v.totalSpend.toLocaleString()}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Total Spend
                    </p>
                  </div>

                </div>

                {/* BAR */}
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}