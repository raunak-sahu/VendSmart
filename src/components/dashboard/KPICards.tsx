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

};

type Props = {
  data: Dashboard | null;
  role?: string;
};

export default function KPICards({
  data,
  role,
}: Props){
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

    {(role === "ADMIN" ||
      role === "MANAGER" ||
      role === "SALESPERSON") && (
      <KPICard
        title="Revenue"
        value={data.revenue}
        prefix="₹"
        trend="Live sales revenue"
        icon={<DollarSign size={28} />}
      />
    )}

    {(role === "ADMIN" ||
      role === "MANAGER") && (
      <KPICard
        title="Profit"
        value={data.profit}
        prefix="₹"
        trend="Net earnings"
        icon={<TrendingUp size={28} />}
      />
    )}

    {(role === "ADMIN" ||
      role === "MANAGER") && (
      <KPICard
        title="Inventory"
        value={data.inventoryValue}
        prefix="₹"
        trend="Current valuation"
        icon={<Package size={28} />}
      />
    )}

    {role === "ADMIN" && (
      <KPICard
        title="Low Stock"
        value={data.lowStock}
        trend="Needs attention"
        icon={<AlertTriangle size={28} />}
      />
    )}

  </div>
);

  
}