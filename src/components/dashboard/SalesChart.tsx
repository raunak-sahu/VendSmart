"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  { name: "Electronics", value: 420 },
  { name: "Accessories", value: 210 },
  { name: "Home", value: 140 },
  { name: "Office", value: 90 },
];

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#8B5CF6",
];

export default function SalesChart() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Sales Distribution
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip/>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}