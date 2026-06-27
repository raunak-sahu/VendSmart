"use client";

type Props = {
  status?: "LOW" | "MEDIUM" | "OK";
};

export default function LowStockBadge({ status }: Props) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors";

  if (status === "LOW") {
    return (
      <span className={`${base} bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400`}>
        Low Stock
      </span>
    );
  }

  if (status === "MEDIUM") {
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400`}>
        Medium Stock
      </span>
    );
  }

  return (
    <span className={`${base} bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400`}>
      OK
    </span>
  );
}