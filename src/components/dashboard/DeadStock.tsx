"use client";

import { useEffect, useState } from "react";
import { PackageX, AlertTriangle } from "lucide-react";

type Product = {
  productName: string;
  currentStock: number;
  daysSinceSale: number;
};

export default function DeadStock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dead-stock")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  const maxDays = Math.max(
    ...products.map((p) => p.daysSinceSale || 0),
    1
  );

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:shadow-xl">

      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-red-100 dark:bg-red-900/30 p-2">
          <PackageX className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Dead Stock
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Products not sold recently
          </p>
        </div>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-10 text-center text-slate-500 dark:text-slate-400">
          No dead stock found 🎉
        </div>
      ) : (
        <div className="space-y-5">

          {products.map((p) => {
            const percent = (p.daysSinceSale / maxDays) * 100;

            return (
              <div key={p.productName}>

                {/* ROW */}
                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                      <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {p.productName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Stock: {p.currentStock}
                      </p>
                    </div>

                  </div>

                  <div className="text-right">
                    <p className="font-bold text-red-600 dark:text-red-400">
                      {p.daysSinceSale}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Days since sale
                    </p>
                  </div>

                </div>

                {/* BAR */}
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
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