"use client";

import { Bell, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

type Notification = {
  type: string;
  message: string;
};

export default function Notifications() {
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors">

      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <Bell className="text-indigo-600 dark:text-indigo-400" />

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Notifications
        </h2>
      </div>

      {/* CONTENT */}
      <div className="space-y-4">

        {items.length === 0 && (
          <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-5 text-green-700 dark:text-green-400">
            Everything looks good 🎉
          </div>
        )}

        {items.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-amber-50 dark:bg-slate-800 p-4 transition-colors"
          >
            <AlertTriangle className="mt-1 text-orange-500 dark:text-orange-400" />

            <div className="flex w-full items-center justify-between gap-3">
              <span className="text-slate-800 dark:text-slate-200">
                {n.message}
              </span>

              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {n.type}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}