"use client";

import { useEffect, useState } from "react";

import AddSaleDialog from "@/components/sales/AddSaleDialog";
import SalesStats from "@/components/sales/SalesStats";
import SalesTable from "@/components/sales/SalesTable";

type Sale = {
  id: string;
  invoiceNumber: string;
  customerName: string;
  paymentMethod: string;
  totalAmount: number;
  profit: number;
};

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);

  /* ---------------- FETCH SALES ---------------- */

  const fetchSales = async () => {
    try {
      const res = await fetch("/api/sales");
      const data = await res.json();
      setSales(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  /* ---------------- CALCULATIONS ---------------- */

  const totalSales = sales.length;

  const totalRevenue = sales.reduce(
    (sum, s) => sum + s.totalAmount,
    0
  );

  const totalProfit = sales.reduce(
    (sum, s) => sum + s.profit,
    0
  );

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this sale?");
    if (!ok) return;

    await fetch(`/api/sales/${id}`, {
      method: "DELETE",
    });

    fetchSales();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Sales
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Track sales, revenue and profit in real time
        </p>
      </div>

      {/* STATS */}
      <SalesStats
        totalSales={totalSales}
        totalRevenue={totalRevenue}
        totalProfit={totalProfit}
      />

      {/* CREATE SALE */}
      <AddSaleDialog onSuccess={fetchSales} />

      {/* TABLE */}
      <SalesTable
        sales={sales}
        onDelete={handleDelete}
      />

    </div>
  );
}