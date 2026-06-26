import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Product } from "@prisma/client";

export async function GET() {
  const products: Product[] =
    await prisma.product.findMany();

  const totalInventoryValue = products.reduce(
    (sum: number, p: Product) =>
      sum + p.currentStock * p.costPrice,
    0
  );

  const totalRetailValue = products.reduce(
    (sum: number, p: Product) =>
      sum +
      p.currentStock * p.sellingPrice,
    0
  );

  const lowStock = products.filter(
    (p: Product) =>
      p.currentStock <=
      p.minimumStockThreshold
  ).length;

  const totalItems = products.reduce(
    (sum: number, p: Product) =>
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