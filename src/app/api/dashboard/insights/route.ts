import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type ProductData = {
  currentStock: number;
  minimumStockThreshold: number;
  costPrice: number;
};

export async function GET() {
  const revenue =
    await prisma.salesBill.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

  const profit =
    await prisma.salesBill.aggregate({
      _sum: {
        profit: true,
      },
    });

  const products =
    await prisma.product.findMany();

  const lowStock = products.filter(
    (p: ProductData) =>
      p.currentStock <=
      p.minimumStockThreshold
  ).length;

  const inventoryValue =
    products.reduce(
      (
        sum: number,
        p: ProductData
      ) =>
        sum +
        p.currentStock * p.costPrice,
      0
    );

  const topProducts =
    await prisma.salesItem.groupBy({
      by: ["productId"],
      _sum: {
        quantitySold: true,
      },
      orderBy: {
        _sum: {
          quantitySold: "desc",
        },
      },
      take: 1,
    });

  let topProduct = "N/A";

  if (topProducts.length > 0) {
    const product =
      await prisma.product.findUnique({
        where: {
          id: topProducts[0].productId,
        },
      });

    topProduct =
      product?.productName || "N/A";
  }

  return NextResponse.json({
    revenue:
      revenue._sum.totalAmount || 0,

    profit:
      profit._sum.profit || 0,

    inventoryValue,

    lowStock,

    topProduct,
  });
}