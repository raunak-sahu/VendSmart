"use client";

import { Trash2 } from "lucide-react";

type Purchase = {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  vendorId: string;
};

export default function PurchaseTable({
  purchases,
  onDelete,
}: {
  purchases: Purchase[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="
      rounded-2xl border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      overflow-hidden
    ">

      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Purchase History
        </h2>
      </div>

      <table className="w-full text-sm">

        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300">
          <tr>
            <th className="p-3 text-left">Invoice</th>
            <th className="p-3 text-left">Vendor</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>

          {purchases.map((p) => (
            <tr
              key={p.id}
              className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            >

              <td className="p-3 text-slate-900 dark:text-white">
                {p.invoiceNumber}
              </td>

              <td className="p-3 text-slate-600 dark:text-slate-300">
                {p.vendorId}
              </td>

              <td className="p-3 text-slate-900 dark:text-white">
                ₹{p.totalAmount}
              </td>

              <td className="p-3">
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}