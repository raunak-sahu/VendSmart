"use client";

import { ArrowUpRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

type Props = {
  title: string;
  value: number;
  prefix?: string;
  icon: React.ReactNode;
  trend: string;
};

export default function KPICard({
  title,
  value,
  prefix,
  icon,
  trend,
}: Props) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      dark:border-slate-800

      bg-white/80
      dark:bg-slate-900
      backdrop-blur-xl
      p-6
      shadow-lg
shadow-slate-200/50
dark:shadow-black/30
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
<div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-indigo-200 dark:bg-indigo-700 blur-3xl opacity-40"/>

      <div className="relative flex justify-between">
        <div>
         <p className="text-sm text-slate-500 dark:text-slate-400">
    {title}
</p>

<h2 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
    <AnimatedCounter
        value={value}
        prefix={prefix}
    />
</h2>
        </div>

        <div className="rounded-2xl bg-indigo-100 dark:bg-indigo-900 p-4">
          {icon}
        </div>
      </div>

      <div className="relative mt-8 flex items-center gap-2 text-green-600">
        <ArrowUpRight size={18} />
        <span className="font-semibold">{trend}</span>
      </div>
    </div>
  );
}