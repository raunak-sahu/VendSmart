import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICards from "@/components/dashboard/KPICards";
import ProfitChart from "@/components/dashboard/ProfitChart";
import Notifications from "@/components/dashboard/Notifications";
import TopSellingProducts from "@/components/dashboard/TopSellingProducts";
import DeadStock from "@/components/dashboard/DeadStock";
import VendorSpend from "@/components/dashboard/VendorSpend";
import InventoryHealth from "@/components/dashboard/InventoryHealth";
import LowStockAlerts from "@/components/dashboard/low-stock-alerts";
export default function DashboardPage() {
  return (
   

           
    <div className="space-y-6">

  <KPICards />

  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    <div className="xl:col-span-2">
      <ProfitChart />
    </div>

    <Notifications />

  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    <TopSellingProducts />

<LowStockAlerts />
    <DeadStock />

  </div>

  <VendorSpend />

</div>
  );
}