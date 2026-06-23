"use server";
import {prisma} from "@/lib/prisma";
export async function createProduct(data: {
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;
  vendorId: string;
})
{
    await prisma.product.create({
        data});
        return {
            success: true
        };
}