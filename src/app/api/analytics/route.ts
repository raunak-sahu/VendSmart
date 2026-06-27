import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Use a lightweight local shape for analytics data to avoid Prisma type issues.
type ProductData = {
  currentStock: number;
  costPrice: number;
  sellingPrice: number;
  minimumStockThreshold: number;
};

export async function GET() {
  const products: ProductData[] = await prisma.product.findMany();

  const totalInventoryValue = products.reduce(
    (sum: number, p: ProductData) =>
      sum + p.currentStock * p.costPrice,
    0
  );

  const totalRetailValue = products.reduce(
    (sum: number, p: ProductData) =>
      sum + p.currentStock * p.sellingPrice,
    0
  );

  const lowStock = products.filter(
    (p: ProductData) =>
      p.currentStock <= p.minimumStockThreshold
  ).length;

  const totalItems = products.reduce(
    (sum: number, p: ProductData) =>
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