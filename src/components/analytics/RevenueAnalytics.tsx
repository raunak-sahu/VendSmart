"use client";

import { useEffect, useState } from "react";

type Data = {
  totalRevenue: number;
  totalProfit: number;
  avgOrderValue: number;
};

export default function RevenueAnalytics() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/revenue")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
    );
  }

  return (
    <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Revenue
      </h2>

  <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
  <p>Total Revenue: ₹{data.totalRevenue}</p>
  <p>Total Profit: ₹{data.totalProfit}</p>

  <p>
    Avg Order: ₹
    {(data?.avgOrderValue ?? 0).toFixed(2)}
  </p>
</div>
    </div>
  );
}