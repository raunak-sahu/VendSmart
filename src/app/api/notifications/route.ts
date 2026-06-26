import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products =
    await prisma.product.findMany();

  const lowStock = products.filter(
    (p) =>
      p.currentStock <=
      p.minimumStockThreshold
  ).length;

  const notifications = [];

  if (lowStock > 0) {
    notifications.push({
      type: "warning",
      message: `${lowStock} products are low in stock`,
    });
  }

  return NextResponse.json(
    notifications
  );
}