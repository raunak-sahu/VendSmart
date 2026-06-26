"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Healthy",
    value: 78,
  },
  {
    name: "Low Stock",
    value: 22,
  },
];

const colors = [
  "#4F46E5",
  "#F97316",
];

export default function InventoryHealth() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">

        Inventory Health

      </h2>

      <div className="h-72">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-4 flex justify-center gap-6">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-indigo-600" />

          Healthy

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-orange-500" />

          Low Stock

        </div>

      </div>

    </div>
  );
}