import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const sales = await prisma.salesBill.findMany();

  const monthlyProfit = [
    { month: "Jan", profit: 0 },
    { month: "Feb", profit: 0 },
    { month: "Mar", profit: 0 },
    { month: "Apr", profit: 0 },
    { month: "May", profit: 0 },
    { month: "Jun", profit: 0 },
    { month: "Jul", profit: 0 },
    { month: "Aug", profit: 0 },
    { month: "Sep", profit: 0 },
    { month: "Oct", profit: 0 },
    { month: "Nov", profit: 0 },
    { month: "Dec", profit: 0 },
  ];
sales.forEach(
  (
    sale: {
      date: Date;
      profit: number;
    }
  ) => {
    const month = new Date(sale.date).getMonth();

    monthlyProfit[month].profit += sale.profit;
  });

  return NextResponse.json(monthlyProfit);
}