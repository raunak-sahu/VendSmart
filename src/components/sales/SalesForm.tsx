"use client";

import AddSaleDialog from "./AddSaleDialog";

export default function SalesForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return (
    <div className="
      rounded-2xl border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      p-4
    ">
      <AddSaleDialog onSuccess={onSuccess} />
    </div>
  );
}