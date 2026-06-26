"use client";

import { useEffect, useState } from "react";
import {
  Package,
  IndianRupee,
  AlertTriangle,
  Boxes,
} from "lucide-react";

export default function InventoryCards() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const cards = [
    {
      title: "Inventory Value",
      value: `₹${data?.totalInventoryValue || 0}`,
      icon: IndianRupee,
    },
    {
      title: "Retail Value",
      value: `₹${data?.totalRetailValue || 0}`,
      icon: Package,
    },
    {
      title: "Low Stock",
      value: data?.lowStock || 0,
      icon: AlertTriangle,
    },
    {
      title: "Total Units",
      value: data?.totalItems || 0,
      icon: Boxes,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border bg-white p-6 shadow-sm"
        >
          <card.icon className="h-7 w-7 text-indigo-600" />

          <h3 className="mt-4 text-slate-500">
            {card.title}
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}