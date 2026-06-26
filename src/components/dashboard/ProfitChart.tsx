"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrendingUp } from "lucide-react";

import { useEffect, useState } from "react";

type RevenueData = {
  month: string;
  profit: number;
};

export default function RevenueChart() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/revenue")
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        p-6
        shadow-sm
        transition
        hover:shadow-xl
      "
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-green-100 dark:bg-green-900/20 p-2">
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Revenue Trend
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monthly business growth
            </p>
          </div>

        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="h-[320px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      ) : (
        <div className="h-[320px] w-full">

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>

              <defs>
                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* GRID */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
              />

              {/* X AXIS */}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8" }}
              />

              {/* Y AXIS */}
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8" }}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />

              {/* TOOLTIP (DARK FIX) */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#cbd5e1" }}
              />

              {/* AREA */}
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#4f46e5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />

            </AreaChart>
          </ResponsiveContainer>

        </div>
      )}
    </div>
  );
}