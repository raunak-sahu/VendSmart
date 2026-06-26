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

  const handleDeleteVendor = async (
  id: string
) => {
  const confirmed = window.confirm(
    "Delete this vendor?"
  );

  if (!confirmed) return;

  await fetch(`/api/vendors/${id}`, {
    method: "DELETE",
  });

  fetchVendors();
};


  const filteredVendors = vendors.filter((vendor) =>
    vendor.vendorName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">
          Vendors
        </h1>

        <p className="mt-2 text-slate-500">
          Manage supplier information
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-5 md:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Vendors
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {vendors.length}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Vendors
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {
              vendors.filter(
                (v) => v.status === "Active"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Inactive Vendors
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {
              vendors.filter(
                (v) => v.status !== "Active"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Companies
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {
              new Set(
                vendors.map(
                  (v) => v.companyName
                )
              ).size
            }
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <input
        placeholder="Search vendors..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full max-w-md rounded-2xl border bg-white px-4 py-3"
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border bg-white">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-4 text-left">
                Vendor
              </th>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                GST
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4 font-medium">
                  {vendor.vendorName}
                </td>

                <td className="p-4">
                  {vendor.companyName}
                </td>

                <td className="p-4">
                  {vendor.gstNumber}
                </td>

                <td className="p-4">
                  {vendor.phoneNumber}
                </td>

                {/* STATUS */}
                <td className="p-4">

                  {vendor.status === "Active" ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Inactive
                    </span>
                  )}

                </td>

                {/* ACTIONS */}
                <td className="p-4">

                  <div className="flex gap-4">

                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>

                  <button
  onClick={() =>
    handleDeleteVendor(vendor.id)
  }
  className="text-red-600 hover:underline"
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