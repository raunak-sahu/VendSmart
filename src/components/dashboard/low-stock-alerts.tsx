import {AlertTriangle} from "lucide-react";
const alerts=[
    {
       product: "Pepsi 2L",
    stock: 5,
  },
  {
    product: "Maggi Family Pack",
    stock: 8,
  },
  {
    product: "Coca Cola",
    stock: 3,   
    },
];
export default function LowStockAlerts() {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="flex items-center gap-3">

        <AlertTriangle className="text-red-500" />

        <h2 className="text-xl font-semibold">
          Low Stock Alerts
        </h2>

      </div>

      <div className="mt-6 space-y-4">

        {alerts.map((item) => (
          <div
            key={item.product}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              p-4
            "
          >
            <div>
              <p className="font-medium">
                {item.product}
              </p>

              <p className="text-sm text-slate-500">
                Reorder Required
              </p>
            </div>

            <span className="
              rounded-xl
              bg-red-100
              px-3
              py-1
              text-sm
              font-semibold
              text-red-600
            ">
              {item.stock} left
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}