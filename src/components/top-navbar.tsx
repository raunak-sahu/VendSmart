"use client";

import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";

type UserData = {
  name?: string;
  email?: string;
  role?: string;
};

export default function TopNavbar() {
  const [user, setUser] =
    useState<UserData>({});

  useEffect(() => {
    setUser({
      name:
        localStorage.getItem("name") ||
        "User",
      email:
        localStorage.getItem("email") ||
        "",
      role:
        localStorage.getItem("role") ||
        "",
    });
  }, []);

  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div>
        <h2 className="text-2xl font-bold">
          Welcome back 👋
        </h2>

        <p className="text-slate-500">
          Manage your business efficiently
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            {user.name}
          </p>

          <p className="text-xs text-slate-500">
            {user.email}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <User className="h-6 w-6 text-indigo-600" />
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {user.role}
        </span>

        <button
          onClick={() => {
            document.cookie =
              "token=; Max-Age=0; path=/";

            localStorage.clear();

            window.location.href =
              "/login";
          }}
          className="rounded-xl p-2 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
        </button>

      </div>

    </div>
  );
}