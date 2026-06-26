"use client";

import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

type Product = {
  productName: string;
  quantitySold: number;
};

export default function TopSellingProducts() {
  const [products, setProducts] =
    useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/top-products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <Trophy className="text-yellow-500" />

        <h2 className="text-xl font-bold">

          Top Products

        </h2>

      </div>

      <div className="space-y-4">

        {products.map((p, index) => (

          <div
            key={p.productName}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >

            <div>

              <p className="font-semibold">

                {index + 1}. {p.productName}

              </p>

            </div>

            <div className="rounded-full bg-indigo-100 px-4 py-2 font-bold text-indigo-700">

              {p.quantitySold}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}