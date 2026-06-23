"use client";
type Props={
    status? : "LOW" | "MEDIUM" | "OK";
};
export default function LowStockBadge({status}:Props) {
    if (status === "LOW") {
    return (
      <span className="bg-red-200 text-red-700 px-2 py-1 rounded text-xs">
        Low Stock
      </span>
    );
  }

  if (status === "MEDIUM") {
    return (
      <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded text-xs">
        Medium Stock
      </span>
    );
  }

  return (
    <span className="bg-green-200 text-green-700 px-2 py-1 rounded text-xs">
      OK
    </span>
  );
}