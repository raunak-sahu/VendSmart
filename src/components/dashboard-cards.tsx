import { prisma } from "@/lib/prisma";
import {
  Package,
  Users,
  TrendingUp,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

export default async function DashboardCards() {
  const totalProducts =
    await prisma.product.count();

  const totalVendors =
    await prisma.vendor.count();

  const revenue =
    await prisma.salesBill.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

  const profit =
    await prisma.salesBill.aggregate({
      _sum: {
        profit: true,
      },
    });

  const products =
    await prisma.product.findMany();
const lowStock = products.filter(
  (p: {
    currentStock: number;
    minimumStockThreshold: number;
  }) =>
    p.currentStock <=
    p.minimumStockThreshold
).length;

  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Vendors",
      value: totalVendors,
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: `₹${revenue._sum.totalAmount || 0}`,
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      title: "Profit",
      value: `₹${profit._sum.profit || 0}`,
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200"
        >
          <card.icon
            className={`h-7 w-7 ${card.color}`}
          />

          <h3 className="mt-4 text-slate-500">
            {card.title}
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}