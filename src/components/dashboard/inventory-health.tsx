"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Healthy",
    value: 92,
  },
  {
    name: "Low Stock",
    value: 8,
  },
];

const COLORS = [
  "#22C55E",
  "#EF4444",
];

export default function InventoryHealth() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="text-xl font-semibold">
        Inventory Health
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Current stock distribution
      </p>

      <div className="mt-6 h-[250px]">

        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={75}
              outerRadius={100}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
<text
  x="50%"
  y="45%"
  textAnchor="middle"
  dominantBaseline="middle"
  className="fill-slate-900 text-3xl font-bold"
>
  92%
</text>

<text
  x="50%"
  y="57%"
  textAnchor="middle"
  dominantBaseline="middle"
  className="fill-slate-500 text-sm"
>
  Healthy
</text>
          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="space-y-3">

        <div className="flex items-center justify-between">

          <span className="flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-green-500" />

            Healthy Products

          </span>

          <span className="font-semibold">
            92%
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-red-500" />

            Low Stock

          </span>

          <span className="font-semibold">
            8%
          </span>

        </div>

      </div>

    </div>
  );
}