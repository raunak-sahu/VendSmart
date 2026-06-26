export default function ReportsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Reports Center
        </h1>

        <p className="mt-2 text-slate-500">
          Export business reports instantly
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <a
          href="/api/reports/sales"
          className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">
            Sales Report
          </h2>

          <p className="mt-2 text-slate-500">
            Download CSV
          </p>
        </a>

        <a
          href="/api/reports/inventory"
          className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">
            Inventory Report
          </h2>

          <p className="mt-2 text-slate-500">
            Download CSV
          </p>
        </a>

        <a
          href="/api/reports/vendors"
          className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">
            Vendor Report
          </h2>

          <p className="mt-2 text-slate-500">
            Download CSV
          </p>
        </a>

      </div>

    </div>
  );
}