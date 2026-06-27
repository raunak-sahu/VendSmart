"use client";

type Props = {
  totalSales: number;
  totalProfit: number;
  totalRevenue: number;
};

export default function SalesStats({
  totalSales,
  totalProfit,
  totalRevenue,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Sales
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {totalSales}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Revenue
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ₹{totalRevenue.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Profit
        </p>
        <h2 className="text-2xl font-bold text-green-600">
          ₹{totalProfit.toLocaleString()}
        </h2>
      </div>

    </div>
  );
}