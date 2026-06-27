import InventoryCards from "@/components/analytics/inventory-cards";
import RevenueAnalytics from "@/components/analytics/RevenueAnalytics";
import InventoryAnalytics from "@/components/analytics/InventoryAnalytics";
import SalesAnalytics from "@/components/analytics/SalesAnalytics";
import VendorAnalytics from "@/components/analytics/VendorAnalytics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Deep business insights across inventory, sales, revenue and vendors.
        </p>
      </div>

      {/* TOP KPI CARDS */}
      <InventoryCards />

      {/* ANALYTICS GRID */}
      <div className="grid gap-6 lg:grid-cols-2">

        <RevenueAnalytics />

        <SalesAnalytics />

        <InventoryAnalytics />

        <VendorAnalytics />

      </div>

    </div>
  );
}