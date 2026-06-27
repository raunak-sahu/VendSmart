export default function ReportsPage() {
  return (
    <div className="min-h-screen space-y-8 bg-slate-50 dark:bg-slate-950 p-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          Reports Center
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Export business reports instantly
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        <a
          href="/api/reports/sales"
          className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Sales Report
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Download CSV
          </p>
        </a>

        <a
          href="/api/reports/inventory"
          className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Inventory Report
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Download CSV
          </p>
        </a>

        <a
          href="/api/reports/vendors"
          className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Vendor Report
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Download CSV
          </p>
        </a>

      </div>
    </div>
  );
}