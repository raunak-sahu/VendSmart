"use client";

import { useEffect, useState } from "react";

type Vendor = {
  vendorName: string;
  totalSpend: number;
  orders: number;
};

export default function VendorAnalytics() {
  const [data, setData] = useState<Vendor[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/vendor")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data.length) {
    return <div className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />;
  }

  return (
    <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Vendors
      </h2>

      <div className="mt-4 space-y-3">
        {data.map((v) => (
          <div
            key={v.vendorName}
            className="flex justify-between text-slate-600 dark:text-slate-300"
          >
            <span>{v.vendorName}</span>
            <span>₹{v.totalSpend}</span>
          </div>
        ))}
      </div>
    </div>
  );
}