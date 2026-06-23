"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { month: "Jan", profit: 12000 },
  { month: "Feb", profit: 16000 },
  { month: "Mar", profit: 14000 },
  { month: "Apr", profit: 21000 },
  { month: "May", profit: 18000 },
  { month: "Jun", profit: 26000 },
];

export default function ProfitChart() {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="profit"
            radius={[8, 8, 0, 0]}
            fill="#10B981"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}