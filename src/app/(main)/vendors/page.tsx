export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-blue-600 font-medium">
          Vendors
        </p>

        <h1 className="text-5xl font-bold tracking-tight mt-2">
          Vendor Management
        </h1>

        <p className="text-slate-500 mt-3">
          Manage suppliers and vendor relationships.
        </p>
      </div>

      <div className="bg-white rounded-3xl border p-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          Vendors
        </h2>

        <p className="text-slate-500 mt-2">
          No vendors added yet.
        </p>
      </div>
    </div>
  );
}