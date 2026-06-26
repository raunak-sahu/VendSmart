"use client";

import { useEffect, useState } from "react";

export default function AIInsights() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch("/api/dashboard/insights")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="rounded-3xl border bg-gradient-to-r from-indigo-600 to-cyan-500 p-8 text-white shadow-lg">

      <h2 className="text-2xl font-bold">
        Business Insights
      </h2>

      <div className="mt-6 space-y-4">

        <p>
          📈 Revenue Generated:
          <strong>
            {" "}₹{data.revenue}
          </strong>
        </p>

        <p>
          💰 Total Profit:
          <strong>
            {" "}₹{data.profit}
          </strong>
        </p>

        <p>
          🔥 Best Selling Product:
          <strong>
            {" "}{data.topProduct}
          </strong>
        </p>

        <p>
          ⚠ Low Stock Products:
          <strong>
            {" "}{data.lowStock}
          </strong>
        </p>

        <p>
          📦 Inventory Value:
          <strong>
            {" "}₹{data.inventoryValue}
          </strong>
        </p>

      </div>

    </div>
  );
}