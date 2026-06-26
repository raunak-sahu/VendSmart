import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const sales = await prisma.salesBill.findMany({
    select: {
      date: true,
      totalAmount: true,
      profit: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const monthlyMap = new Map<
    string,
    {
      revenue: number;
      profit: number;
    }
  >();

  sales.forEach((sale) => {
    const month = sale.date.toLocaleString("default", {
      month: "short",
    });

    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, {
        revenue: 0,
        profit: 0,
      });
    }

    const current = monthlyMap.get(month)!;

    current.revenue += sale.totalAmount;

    current.profit += sale.profit;
  });

  return NextResponse.json(
    [...monthlyMap.entries()].map(([month, value]) => ({
      month,
      revenue: value.revenue,
      profit: value.profit,
    }))
  );
}