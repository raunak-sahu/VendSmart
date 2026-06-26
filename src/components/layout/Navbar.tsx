"use client";

import ThemeToggle from "./ThemeToggle";
import { Bell, Menu, Search, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
const router = useRouter();
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-20 items-center justify-between
        border-b
        border-slate-200
        bg-white/80
        backdrop-blur-xl
        px-4
        md:px-8
        dark:border-slate-800
        dark:bg-slate-900/80
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="
            rounded-xl
            border
            p-2
            lg:hidden
            dark:border-slate-700
          "
        >
          <Menu />
        </button>

        <div className="relative hidden md:block">
          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={18}
          />

          <input
            placeholder="Search..."
            className="
              w-80
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-2.5
              pl-11
              outline-none
              transition
              focus:ring-2
              focus:ring-indigo-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">

        <ThemeToggle />

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="
              relative
              rounded-xl
              border
              border-slate-200
              p-3
              transition
              hover:bg-slate-100
              dark:border-slate-700
              dark:hover:bg-slate-800
            "
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-4 z-50">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                No new notifications
              </p>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
              rounded-xl
              border
              border-slate-200
              p-2
              transition
              hover:bg-slate-100
              dark:border-slate-700
              dark:hover:bg-slate-800
            "
          >
            <UserCircle2 size={28} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-3 z-50">

            <button
  onClick={() => {
    setProfileOpen(false);
    router.push("/profile");
  }}
  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
>
  Profile
</button>
<button
  onClick={() => {
    setProfileOpen(false);
    router.push("/settings");
  }}
  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
>
  Settings
</button>

             <button
  onClick={() => {
    setProfileOpen(false);
    router.push("/login");
  }}
  className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
>
  Logout
</button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}