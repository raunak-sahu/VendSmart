"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        flex
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-slate-100
        to-indigo-50
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
        transition-colors
      "
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MOBILE SIDEBAR */}
      <MobileSidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* MAIN AREA */}
      <div className="flex flex-1 flex-col">

        {/* NAVBAR */}
        <Navbar
          onMenuClick={() => setOpen(true)}
        />

        {/* PAGE CONTENT */}
        <main
          className="
            flex-1
            px-4
            py-6
            sm:px-6
            lg:px-8
            xl:px-10
            2xl:px-14
            transition-colors
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
}