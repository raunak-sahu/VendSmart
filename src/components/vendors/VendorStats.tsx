"use client";

type Vendor = {
  id: string;
  vendorName: string;
  totalSpend?: number;
  orders?: number;
};

export default function VendorStats({
  vendors,
}: {
  vendors: Vendor[];
}) {
  const totalVendors = vendors.length;

  const totalSpend = vendors.reduce(
    (sum, v) => sum + (v.totalSpend || 0),
    0
  );

  const totalOrders = vendors.reduce(
    (sum, v) => sum + (v.orders || 0),
    0
  );

  return (
    <div className="grid md:grid-cols-3 gap-5">

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Vendors
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
          {totalVendors}
        </h2>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Spend
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
          ₹{totalSpend.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total Orders
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
          {totalOrders}
        </h2>
      </div>

    </div>
  );
}