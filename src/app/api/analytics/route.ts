import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany();

  const totalInventoryValue = products.reduce(
    (sum: number, p: (typeof products)[number]) =>
      sum + p.currentStock * p.costPrice,
    0
  );

  const totalRetailValue = products.reduce(
    (sum: number, p: (typeof products)[number]) =>
      sum + p.currentStock * p.sellingPrice,
    0
  );

  const lowStock = products.filter(
    (p: (typeof products)[number]) =>
      p.currentStock <= p.minimumStockThreshold
  ).length;

  const totalItems = products.reduce(
    (sum: number, p: (typeof products)[number]) =>
      sum + p.currentStock,
    0
  );

  return NextResponse.json({
    totalInventoryValue,
    totalRetailValue,
    lowStock,
    totalItems,
  });
}