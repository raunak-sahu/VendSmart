"use client";

import AddPurchaseDialog from "@/components/purchases/AddPurchaseDialog";
import { useEffect, useState } from "react";

type Purchase = {
  id: string;
  invoiceNumber: string;
  purchaseDate: string;
  totalAmount: number;

  vendor: {
    vendorName: string;
  };
};

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const fetchPurchases = async () => {
    const res = await fetch("/api/purchases");
    const data = await res.json();
    setPurchases(data);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const totalValue = purchases.reduce(
    (sum, p) => sum + p.totalAmount,
    0
  );

  const avgValue = purchases.length
    ? Math.round(totalValue / purchases.length)
    : 0;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Purchases
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Track inventory inflow and purchase bills
        </p>
      </div>

      {/* FORM */}
      <AddPurchaseDialog
        onSuccess={fetchPurchases}
      />

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Purchases
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {purchases.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Purchase Value
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            ₹{totalValue.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Average Bill
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            ₹{avgValue.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="
        overflow-hidden rounded-3xl
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
      ">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300">

            <tr>

              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Amount</th>

            </tr>

          </thead>

          <tbody>

            {purchases.map((purchase) => (
              <tr
                key={purchase.id}
                className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              >

                <td className="p-4 text-slate-900 dark:text-white">
                  {purchase.invoiceNumber}
                </td>

                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {purchase.vendor.vendorName}
                </td>

                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                </td>

                <td className="p-4 font-medium text-slate-900 dark:text-white">
                  ₹{purchase.totalAmount.toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}