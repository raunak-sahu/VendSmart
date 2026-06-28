import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products =
    await prisma.product.findMany();

  const notifications = [];

  const lowStockProducts =
    products.filter(
      (p) =>
        p.currentStock <=
        p.minimumStockThreshold
    );

  if (lowStockProducts.length > 0) {
    notifications.push({
      severity: "high",
      message: `${lowStockProducts.length} products are below stock threshold`,
    });
  }

  const expiringProducts =
    products.filter((p) => {
      const days =
        (new Date(
          p.expiryDate
        ).getTime() -
          Date.now()) /
        (1000 * 60 * 60 * 24);

      return days <= 30 && days > 0;
    });

  if (expiringProducts.length > 0) {
    notifications.push({
      severity: "medium",
      message: `${expiringProducts.length} products expire within 30 days`,
    });
  }

  if (notifications.length === 0) {
    notifications.push({
      severity: "low",
      message:
        "All systems operational",
    });
  }

  return NextResponse.json(
    notifications
  );
}