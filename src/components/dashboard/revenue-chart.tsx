"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 20000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 28000 },
  { month: "Apr", revenue: 50000 },
  { month: "May", revenue: 45000 },
  { month: "Jun", revenue: 65000 },
];

export default function RevenueChart() {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="revenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#6366F1"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#6366F1"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366F1"
            strokeWidth={4}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
  