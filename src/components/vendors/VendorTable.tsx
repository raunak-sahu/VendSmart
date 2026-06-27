"use client";

type Vendor = {
  id: string;
  vendorName: string;
  email?: string;
  phone?: string;
  totalSpend?: number;
  orders?: number;
};

export default function VendorTable({
  vendors,
  onDelete,
}: {
  vendors: Vendor[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300">
          <tr>
            <th className="p-4 text-left">Vendor</th>
            <th className="p-4 text-left">Contact</th>
            <th className="p-4 text-left">Orders</th>
            <th className="p-4 text-left">Spend</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((v) => (
            <tr
              key={v.id}
              className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <td className="p-4 font-medium text-slate-900 dark:text-white">
                {v.vendorName}
              </td>

              <td className="p-4 text-slate-600 dark:text-slate-300">
                <div>
                  <p>{v.email || "-"}</p>
                  <p>{v.phone || "-"}</p>
                </div>
              </td>

              <td className="p-4 text-slate-600 dark:text-slate-300">
                {v.orders || 0}
              </td>

              <td className="p-4 text-slate-900 dark:text-white font-medium">
                ₹{(v.totalSpend || 0).toLocaleString()}
              </td>

              <td className="p-4">
                <button
                  onClick={() => onDelete(v.id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}