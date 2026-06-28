"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ShoppingCart,
  Truck,
  AlertTriangle,
} from "lucide-react";

type ActivityItem = {
  action: string;
  time: string;
};

export default function ActivityFeed() {
  const [data, setData] =
    useState<ActivityItem[]>([]);

  useEffect(() => {
    fetch("/api/activity")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const getIcon = (text: string) => {
   if (
  text.includes("Sold") ||
  text.includes("stock")
) {
      return (
        <ShoppingCart
          size={18}
          className="text-green-500"
        />
      );
    }

   if (
  text.includes("vendor") ||
  text.includes("Purchase Order")
){
      return (
        <Truck
          size={18}
          className="text-indigo-500"
        />
      );
    }

    if (text.includes("Low stock")) {
      return (
        <AlertTriangle
          size={18}
          className="text-red-500"
        />
      );
    }

    return (
      <Activity
        size={18}
        className="text-purple-500"
      />
    );
  };

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
      dark:shadow-black/30
    "
    >
      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-2xl bg-purple-100 dark:bg-purple-500/20 p-3">
          <Activity className="text-purple-600 dark:text-purple-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Activity Feed
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recent platform activity
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-800
            bg-slate-50
            dark:bg-slate-800/50
            p-4
            transition
            hover:scale-[1.02]
          "
          >
            <div className="mt-1">
              {getIcon(item.action)}
            </div>

            <div className="flex-1">
              <p className="font-medium text-slate-800 dark:text-white">
                {item.action}
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}