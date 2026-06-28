"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

type Notification = {
  message: string;
  severity: string;
};

export default function NotificationsPanel() {
  const [data, setData] =
    useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const getIcon = (severity: string) => {
    if (severity === "high") {
      return (
        <AlertTriangle
          className="text-red-500"
          size={20}
        />
      );
    }

    if (severity === "medium") {
      return (
        <Clock3
          className="text-yellow-500"
          size={20}
        />
      );
    }

    return (
      <CheckCircle2
        className="text-green-500"
        size={20}
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
        <div className="rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 p-3">
          <Bell className="text-indigo-600 dark:text-indigo-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Notifications
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Operational alerts
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
            {getIcon(item.severity)}

            <div>
              <p className="font-medium text-slate-800 dark:text-white">
                {item.message}
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 capitalize">
                {item.severity} priority
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}