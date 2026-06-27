"use client";

import { useEffect, useState } from "react";

type Transaction = {
  id: string;
  quantity: number;
  transactionType: string;
  createdAt: string;
  product: {
    productName: string;
  };
};

export default function InventoryHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 dark:bg-slate-950 p-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          Inventory History
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Track all stock movements
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr className="text-left text-slate-600 dark:text-slate-300">
              <th className="p-4">Product</th>
              <th className="p-4">Type</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-t border-slate-200 dark:border-slate-800"
              >
                <td className="p-4 text-slate-900 dark:text-slate-100">
                  {t.product.productName}
                </td>

                <td className="p-4">
                  {t.transactionType === "SALE" ? (
                    <span className="rounded-full bg-red-100 dark:bg-red-500/20 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">
                      SALE
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-100 dark:bg-green-500/20 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                      PURCHASE
                    </span>
                  )}
                </td>

                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {t.quantity}
                </td>

                <td className="p-4 text-slate-500 dark:text-slate-400">
                  {new Date(t.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}