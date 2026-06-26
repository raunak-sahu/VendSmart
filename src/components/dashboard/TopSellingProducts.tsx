"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  TrendingUp,
} from "lucide-react";

type Product = {
  productName: string;
  quantitySold: number;
};

export default function TopSellingProducts() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("/api/dashboard/top-products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const maxSold = Math.max(
    ...products.map(
      (p) => p.quantitySold || 0
    ),
    1
  );

  return (
    <div
      className="
rounded-3xl
border
border-slate-200
dark:border-slate-700
bg-white
dark:bg-slate-900
p-6
shadow-sm
transition
hover:shadow-xl
"
    >
      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-yellow-100 p-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Top Selling Products
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Best performers this month
          </p>
        </div>

      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="
                h-16
                animate-pulse
                rounded-2xl
                bg-slate-200 dark:bg-slate-700
              "
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
        <p className="text-slate-500 dark:text-slate-400">
            No sales data available
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {products.map(
            (p, index) => {

              const percent =
                (
                  p.quantitySold /
                  maxSold
                ) * 100;

              return (
                <div
                  key={p.productName}
                >
                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                         bg-slate-100 dark:bg-slate-800
text-slate-900 dark:text-white
                          font-bold
                        "
                      >
                        #{index + 1}
                      </div>

                      <div>
                       <p className="font-semibold text-slate-900 dark:text-white">
                          {p.productName}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Product
                        </p>
                      </div>

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-slate-900 dark:text-white">
                        {p.quantitySold}
                      </p>

                      <p
                        className="
                          flex
                          items-center
                          justify-end
                          gap-1
                          text-xs
                          text-green-600
                        "
                      >
                        <TrendingUp size={13} />
                        Units Sold
                      </p>

                    </div>

                  </div>

                  <div
                    className="
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-slate-200 dark:bg-slate-700
                    "
                  >
                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-yellow-500
                        to-orange-500
                      "
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}