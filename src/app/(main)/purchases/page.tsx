
"use client";
import AddPurchaseDialog from "@/components/purchases/add-product-dialog";
import { useEffect, useState } from "react";

type Purchase = {
  id: string;
  invoiceNumber: string;
  purchaseDate: string;
  totalAmount: number;

  vendor: {
    vendorName: string;
  };
};

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const fetchPurchases = async () => {
    const res = await fetch("/api/purchases");
    const data = await res.json();

    setPurchases(data);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Purchases
        </h1>

        <p className="mt-2 text-slate-500">
          Track inventory inflow and purchase bills
        </p>
      </div>

<AddPurchaseDialog onSuccess={()=>{fetchPurchases();}}/>
      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Purchases
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {purchases.length}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Purchase Value
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹
            {purchases.reduce(
              (sum, p) => sum + p.totalAmount,
              0
            )}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Average Bill
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹
            {purchases.length
              ? Math.round(
                  purchases.reduce(
                    (sum, p) =>
                      sum + p.totalAmount,
                    0
                  ) / purchases.length
                )
              : 0}
          </h2>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border bg-white">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-4 text-left">
                Invoice
              </th>

              <th className="p-4 text-left">
                Vendor
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {purchases.map((purchase) => (
              <tr
                key={purchase.id}
                className="border-t"
              >

                <td className="p-4">
                  {purchase.invoiceNumber}
                </td>

                <td className="p-4">
                  {purchase.vendor.vendorName}
                </td>

                <td className="p-4">
                  {new Date(
                    purchase.purchaseDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4 font-medium">
                  ₹{purchase.totalAmount}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}