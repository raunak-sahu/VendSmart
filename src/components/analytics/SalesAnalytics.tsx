"use client";

import { useEffect, useState } from "react";

type Data = {
  totalSales: number;
  totalRevenue: number;
  totalProfit: number;
};

export default function SalesAnalytics() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/sales")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />;
  }

  return (
    <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Sales
      </h2>

      <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
        <p>Total Sales: {data.totalSales}</p>
        <p>Total Revenue: ₹{data.totalRevenue}</p>
        <p>Total Profit: ₹{data.totalProfit}</p>
      </div>
    </div>
  );
}