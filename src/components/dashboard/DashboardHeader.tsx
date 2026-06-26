"use client";

import {
  Calendar,
  Sparkles,
} from "lucide-react";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div
      className="
      rounded-3xl
      overflow-hidden
      bg-gradient-to-r
      from-indigo-600
      via-violet-600
      to-fuchsia-600
      p-8
      text-white
    "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Sparkles size={18} />

            <p className="font-medium">

              {greeting}

            </p>

          </div>

          <h1 className="mt-3 text-5xl font-black">

            Welcome Back 👋

          </h1>

          <p className="mt-4 max-w-xl text-indigo-100">

            Monitor inventory, sales, vendors,
            purchases and business performance
            from one intelligent dashboard.

          </p>

        </div>

        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-lg">

          <Calendar />

          <p className="mt-3">

            {new Date().toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
              }
            )}

          </p>

        </div>

      </div>

    </div>
  );
}