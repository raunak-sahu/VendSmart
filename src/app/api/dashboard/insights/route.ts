import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Run queries in parallel (FASTER)
    const [revenue, profit, products, topProducts] =
      await Promise.all([
        prisma.salesBill.aggregate({
          _sum: { totalAmount: true },
        }),

        prisma.salesBill.aggregate({
          _sum: { profit: true },
        }),

        prisma.product.findMany({
          select: {
            currentStock: true,
            minimumStockThreshold: true,
            costPrice: true,
          },
        }),

        prisma.salesItem.groupBy({
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
        }),
      ]);

    // Low stock count
    const lowStock = products.filter((p: {
  currentStock: number;
  minimumStockThreshold: number;
}) =>
  p.currentStock <= p.minimumStockThreshold
).length;

    // Inventory value
    const inventoryValue = products.reduce(
  (
    sum: number,
    p: {
      currentStock: number;
      costPrice: number;
    }
  ) => sum + p.currentStock * p.costPrice,
  0
);

    // Top product name
    let topProduct = "N/A";

    if (topProducts.length > 0) {
      const product = await prisma.product.findUnique({
        where: { id: topProducts[0].productId },
        select: { productName: true },
      });

      topProduct = product?.productName || "N/A";
    }

    return NextResponse.json({
      revenue: revenue._sum.totalAmount ?? 0,
      profit: profit._sum.profit ?? 0,
      inventoryValue,
      lowStock,
      topProduct,
    });
  } catch (error) {
    console.error("Insights API Error:", error);

    return NextResponse.json(
      {
        revenue: 0,
        profit: 0,
        inventoryValue: 0,
        lowStock: 0,
        topProduct: "N/A",
      },
      { status: 500 }
    );
  }
}