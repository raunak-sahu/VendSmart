"use client";

import { Settings, Moon, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Settings className="h-10 w-10 text-indigo-500" />

          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-slate-500 text-sm">
              Customize your experience
            </p>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">

        <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="text-indigo-500" />
            <span className="font-medium">Theme</span>
          </div>
          <span className="text-sm text-slate-500">System / Dark / Light</span>
        </div>

        <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-yellow-500" />
            <span className="font-medium">Notifications</span>
          </div>
          <span className="text-sm text-slate-500">Enabled</span>
        </div>

        <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="text-red-500" />
            <span className="font-medium">Security</span>
          </div>
          <span className="text-sm text-slate-500">2FA Disabled</span>
        </div>

      </div>

    </div>
  );
}