"use client";

import { UserCircle2, Mail, Phone, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <UserCircle2 className="h-12 w-12 text-indigo-500" />

          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-slate-500 text-sm">
              Manage your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-indigo-500" />
            <h2 className="font-semibold">Email</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            admin@vendsmart.com
          </p>
        </div>

        <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="text-green-500" />
            <h2 className="font-semibold">Phone</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            +91 98765 43210
          </p>
        </div>

      </div>

      {/* Security */}
      <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-red-500" />
          <h2 className="font-semibold">Security</h2>
        </div>

        <p className="text-slate-500 text-sm">
          Your account is protected with JWT authentication.
        </p>
      </div>

    </div>
  );
}