"use client";

import { Trash2 } from "lucide-react";

type Sale = {
  id: string;
  invoiceNumber: string;
  customerName: string;
  totalAmount: number;
  profit: number;
  paymentMethod: string;
  createdAt?: string;
};

type Props = {
  sales: Sale[];
  onDelete: (id: string) => void;
};

export default function SalesTable({ sales, onDelete }: Props) {
  return (
    <div className="
      rounded-2xl border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      overflow-hidden
    ">

      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Sales History
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300">
            <tr>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Profit</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {sales.map((s) => (
              <tr
                key={s.id}
                className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              >

                <td className="p-3 text-slate-900 dark:text-white">
                  {s.invoiceNumber}
                </td>

                <td className="p-3 text-slate-600 dark:text-slate-300">
                  {s.customerName}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                    {s.paymentMethod}
                  </span>
                </td>

                <td className="p-3 text-slate-900 dark:text-white">
                  ₹{s.totalAmount}
                </td>

                <td className="p-3 text-green-600 font-medium">
                  ₹{s.profit}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => onDelete(s.id)}
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

    </div>
  );
}