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
      batchNumber: body.batchNumber,
      manufacturingDate: new Date(body.manufacturingDate),
      expiryDate: new Date(body.expiryDate),
      vendorId: body.vendorId,
    },
  });

  return NextResponse.json(product);
}