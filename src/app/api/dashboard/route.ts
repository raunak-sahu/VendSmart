import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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

  return NextResponse.json({
    totalProducts,
    totalVendors,
    revenue:
      revenue._sum.totalAmount || 0,
    profit:
      profit._sum.profit || 0,
    lowStock,
  });
}