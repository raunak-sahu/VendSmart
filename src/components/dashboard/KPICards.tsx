"use client";

import { useEffect, useState } from "react";

import {
  DollarSign,
  TrendingUp,
  Package,
  AlertTriangle,
} from "lucide-react";

import KPICard from "./KPICard";

type Dashboard = {
  revenue: number;
  profit: number;
  inventoryValue: number;
  lowStock: number;
};

export default function KPICards() {
  const [data, setData] =
    useState<Dashboard>();

  useEffect(() => {
    fetch("/api/dashboard/insights")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1,2,3,4].map((i)=>(
          <div
            key={i}
            className="h-44 animate-pulse rounded-3xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      
     <KPICard
  title="Revenue"
  value={data.revenue}
  prefix="₹"
  trend="12% this month"
  icon={<DollarSign size={28} />}
/>

<KPICard
  title="Profit"
  value={data.profit}
  prefix="₹"
  trend="8% growth"
  icon={<TrendingUp size={28} />}
/>

<KPICard
  title="Inventory"
  value={data.inventoryValue}
  prefix="₹"
  trend="Current valuation"
  icon={<Package size={28} />}
/>

<KPICard
  title="Low Stock"
  value={data.lowStock}
  trend="Needs attention"
  icon={<AlertTriangle size={28} />}
/>

    </div>
  );
}