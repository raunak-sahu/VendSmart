import DashboardCards from "@/components/dashboard-cards";
import RevenueChart from "@/components/dashboard/revenue-chart";
import InventoryHealth from "@/components/dashboard/inventory-health";
import ActivityFeed from "@/components/dashboard/activity-feed";
import RevenueCards from "@/components/revenue-cards";
import TopProducts from "@/components/dashboard/top-products";
import ProfitChart from "@/components/dashboard/profit-chart";
import LowStockAlerts from "@/components/dashboard/low-stock-alerts";
export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white">

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10">

          <p className="font-medium text-indigo-100">
            INVENTORY INTELLIGENCE PLATFORM
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Welcome back 👋
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-indigo-100">
            Monitor inventory levels, revenue trends, product performance,
            vendor activity and stock alerts from one unified platform.
          </p>

        </div>

      </section>

      {/* KPI CARDS */}
      <DashboardCards />

      {/* ANALYTICS */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Revenue Chart */}
       <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

  <div className="flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold">
        Revenue Analytics
      </h2>

      <p className="text-slate-500">
        Jan - Jun Revenue Trend
      </p>
    </div>

    <div className="rounded-2xl bg-green-100 px-4 py-2 text-green-600 font-semibold">
      +18%
    </div>

  </div>

  <div className="mt-8">
    <RevenueChart />
  </div>

</div>
        
   
  <div className="rounded-3xl border bg-white p-8 shadow-sm">
    <h2 className="mb-5 text-xl font-semibold">
      Profit Trend
    </h2>

    <ProfitChart />
  </div>

        {/* Inventory Health */}
          <InventoryHealth />
       <LowStockAlerts />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />

    </div>
  );
}