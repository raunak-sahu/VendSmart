"use client";

type Props = {
  totalPurchases: number;
  totalSpent: number;
};

export default function PurchaseStats({
  totalPurchases,
  totalSpent,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Purchases
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {totalPurchases}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Spend
        </p>
        <h2 className="text-2xl font-bold text-indigo-600">
          ₹{totalSpent.toLocaleString()}
        </h2>
      </div>

    </div>
  );
}