"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
} from "recharts";

const data = [
  { month: "Jan", profit: 1800 },
  { month: "Feb", profit: 2400 },
  { month: "Mar", profit: 2900 },
  { month: "Apr", profit: 3900 },
  { month: "May", profit: 4500 },
  { month: "Jun", profit: 5600 },
];

export default function ProfitChart() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Profit Trend
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <Tooltip/>

            <Bar
              dataKey="profit"
              radius={[10,10,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}