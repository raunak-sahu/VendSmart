import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type GroupedSale = {
  productId: string;
  _sum: {
    quantitySold: number | null;
  };
};

export async function GET() {
  const grouped = await prisma.salesItem.groupBy({
    by: ["productId"],
    _sum: {
      quantitySold: true,
    },
    orderBy: {
      _sum: {
        quantitySold: "desc",
      },
    },
    take: 5,
  });

  const productIds = grouped.map(
    (g: GroupedSale) => g.productId
  );

  const products =
    await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

  const result = grouped.map(
    (sale: GroupedSale) => ({
      name:
        products.find(
          (p) => p.id === sale.productId
        )?.productName || "Unknown",

      sold:
        sale._sum.quantitySold || 0,
    })
  );

  return NextResponse.json(result);
}