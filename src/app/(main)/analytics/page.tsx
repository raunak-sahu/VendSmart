import InventoryCards from "@/components/analytics/inventory-cards";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Inventory Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Deep insights into stock health,
          inventory valuation and movement.
        </p>
      </div>

      <InventoryCards />

    </div>
  );
}