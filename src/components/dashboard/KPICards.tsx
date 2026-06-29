"use client";

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
  topProduct:string;
  role:string;
};

type Props = {
  data: Dashboard | null;
};

export default function KPICards({ data }: Props) {
  if (!data) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
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

  {data.revenue !== undefined && (
    <KPICard
      title="Revenue"
      value={data.revenue}
      prefix="₹"
      trend="Total sales generated"
      icon={<DollarSign size={28} />}
    />
  )}

  {data.profit !== undefined && (
    <KPICard
      title="Profit"
      value={data.profit}
      prefix="₹"
      trend="Net earnings"
      icon={<TrendingUp size={28} />}
    />
  )}

  {data.inventoryValue !== undefined && (
    <KPICard
      title="Inventory"
      value={data.inventoryValue}
      prefix="₹"
      trend="Current valuation"
      icon={<Package size={28} />}
    />
  )}

  <KPICard
    title="Low Stock"
    value={data.lowStock}
    trend="Needs attention"
    icon={<AlertTriangle size={28} />}
  />

</div>
  );
}