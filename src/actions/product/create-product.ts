"use server";

import { prisma } from "@/lib/prisma";

export async function createProduct(data: {
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;

  vendorId: string;

  batchNumber: string;
  manufacturingDate: Date | string;
  expiryDate: Date | string;
}) {
  await prisma.product.create({
    data: {
      productName: data.productName,
      category: data.category,
      costPrice: data.costPrice,
      sellingPrice: data.sellingPrice,
      currentStock: data.currentStock,
      minimumStockThreshold:
        data.minimumStockThreshold,

      vendorId: data.vendorId,

      batchNumber: data.batchNumber,

      manufacturingDate: new Date(
        data.manufacturingDate
      ),

      expiryDate: new Date(
        data.expiryDate
      ),
    },
  });

  return {
    success: true,
  };
}