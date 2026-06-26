"use client";

import AddSaleDialog from "@/components/sales/add-sale-dialog";

export default function SalesPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold">
          Sales
        </h1>

        <p className="mt-2 text-slate-500">
          Track sales and revenue
        </p>
      </div>

      <AddSaleDialog
        onSuccess={() => {
          window.location.reload();
        }}
      />

    </div>
  );
}