"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type RevenueData = {
  month: string;
  revenue: number;
};

export default function RevenueChart() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/revenue")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-[320px] flex items-center justify-center text-slate-400 dark:text-slate-500">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="h-[320px] rounded-3xl bg-white dark:bg-slate-900 p-4 transition-colors">

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>

          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: 12,
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366F1"
            strokeWidth={3}
            fill="url(#revenueGradient)"
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}