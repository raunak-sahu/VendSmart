import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      vendor: true,
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      productName: body.productName,
      category: body.category,
      costPrice: Number(body.costPrice),
      sellingPrice: Number(body.sellingPrice),
      currentStock: Number(body.currentStock),
      minimumStockThreshold: Number(body.minimumStockThreshold),
   batchNumber:
  body.batchNumber ||
  `BATCH-${Date.now()}`,

manufacturingDate:
  body.manufacturingDate
    ? new Date(
        body.manufacturingDate
      )
    : new Date(),

expiryDate:
  body.expiryDate
    ? new Date(
        body.expiryDate
      )
    : new Date(
        Date.now() +
        365 *
          24 *
          60 *
          60 *
          1000
      ),

vendorId:
  body.vendorId ||
  (
    await prisma.vendor.findFirst()
  )?.id ||
  "",
    },
  });

  return NextResponse.json(product);
}