import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const purchases = await prisma.purchaseBill.findMany({
    include: {
      vendor: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      purchaseDate: "desc",
    },
  });

  return NextResponse.json(purchases);
}

export async function POST(req: Request) {
  const body = await req.json();

  const purchase = await prisma.purchaseBill.create({
    data: {
      invoiceNumber: body.invoiceNumber,
      purchaseDate: new Date(),
      totalAmount: body.totalAmount,
      vendorId: body.vendorId,

      items: {
        create: body.items.map((item: any) => ({
          quantity: item.quantity,
          costPrice: item.costPrice,
          productId: item.productId,
        })),
      },
    },
  });

  // Increase stock
  
      for (const item of body.items) {
  await prisma.product.update({
    where: {
      id: item.productId,
    },
    data: {
      currentStock: {
        increment: item.quantity,
      },
    },
  });
  await prisma.inventoryTransaction.create({
    data: {
      productId: item.productId,
      quantity: item.quantity,
      transactionType: "PURCHASE",
    },
  });

}


  return NextResponse.json(purchase);
};