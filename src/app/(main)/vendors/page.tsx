"use client";

import { useEffect, useState } from "react";

type Vendor = {
  id: string;
  vendorName: string;
  companyName: string;
  gstNumber: string;
  phoneNumber: string;
  email: string;
  status: string;
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState("");

  const fetchVendors = async () => {
    const res = await fetch("/api/vendors");
    const data = await res.json();
    setVendors(data);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleDeleteVendor = async (id: string) => {
    const confirmed = window.confirm("Delete this vendor?");
    if (!confirmed) return;

    await fetch(`/api/vendors/${id}`, {
      method: "DELETE",
    });

    fetchVendors();
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.vendorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Vendors
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage supplier information
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-5 md:grid-cols-4">

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Vendors
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {vendors.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Vendors
          </p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {vendors.filter((v) => v.status === "Active").length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Inactive Vendors
          </p>
          <h2 className="mt-2 text-3xl font-bold text-red-500">
            {vendors.filter((v) => v.status !== "Active").length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Companies
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {new Set(vendors.map((v) => v.companyName)).size}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <input
        placeholder="Search vendors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full max-w-md
          rounded-2xl border border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900
          px-4 py-3
          text-slate-900 dark:text-white
          placeholder:text-slate-400
        "
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-50 dark:bg-slate-800">

            <tr>

              <th className="p-4 text-left text-slate-500 dark:text-slate-300">
                Vendor
              </th>

              <th className="p-4 text-left text-slate-500 dark:text-slate-300">
                Company
              </th>

              <th className="p-4 text-left text-slate-500 dark:text-slate-300">
                GST
              </th>

              <th className="p-4 text-left text-slate-500 dark:text-slate-300">
                Phone
              </th>

              <th className="p-4 text-left text-slate-500 dark:text-slate-300">
                Email
              </th>

              <th className="p-4 text-left text-slate-500 dark:text-slate-300">
                Status
              </th>

              <th className="p-4 text-left text-slate-500 dark:text-slate-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              >

                <td className="p-4 font-medium text-slate-900 dark:text-white">
                  {vendor.vendorName}
                </td>

                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {vendor.companyName}
                </td>

                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {vendor.gstNumber}
                </td>

                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {vendor.phoneNumber}
                </td>

                <td className="p-4 text-slate-600 dark:text-slate-300">
                  {vendor.email}
                </td>

                {/* STATUS */}
                <td className="p-4">

                  {vendor.status === "Active" ? (
                    <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">
                      Inactive
                    </span>
                  )}

                </td>

                {/* ACTIONS */}
                <td className="p-4">

                  <div className="flex gap-4">

                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteVendor(vendor.id)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}