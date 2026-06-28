"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICards from "@/components/dashboard/KPICards";
import ProfitChart from "@/components/dashboard/ProfitChart";
import Notifications from "@/components/dashboard/Notifications";
import TopSellingProducts from "@/components/dashboard/TopSellingProducts";
import DeadStock from "@/components/dashboard/DeadStock";
import VendorSpend from "@/components/dashboard/VendorSpend";
import LowStockAlerts from "@/components/dashboard/low-stock-alerts";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";

type Dashboard = {
  revenue: number;
  profit: number;
  inventoryValue: number;
  lowStock: number;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const [data, setData] =
    useState<Dashboard | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const router = useRouter();

  const role = user?.role;

  useEffect(() => {
    fetch("/api/dashboard/insights")
      .then((res) => res.json())
      .then((json) => {
        console.log(
          "INSIGHTS:",
          json
        );

        setData(json);
      });
  }, []);

 useEffect(() => {
  fetch("/api/auth/me", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (!data.user) {
        router.replace("/login");
      }
    });
}, []);

  return (
    <div className="space-y-6">

      <DashboardHeader />

      <KPICards data={data} />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

        <div className="xl:col-span-2">
          <ProfitChart />
        </div>

        <Notifications />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <TopSellingProducts />

        <LowStockAlerts />

        <DeadStock />

      </div>

      {(role === "ADMIN" ||
        role === "MANAGER") && (
        <VendorSpend />
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <ActivityFeed />

        <NotificationsPanel />

      </div>

    </div>
  );
}