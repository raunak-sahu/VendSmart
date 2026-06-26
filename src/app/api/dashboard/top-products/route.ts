import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type GroupedSale = {
  productId: string;
  _sum: {
    quantitySold: number | null;
  };
};

export async function GET() {
  const sales = await prisma.salesItem.groupBy({
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

  const products = await Promise.all(
    sales.map(
      async (sale: GroupedSale) => {
        const product =
          await prisma.product.findUnique({
            where: {
              id: sale.productId,
            },
          });

        return {
          name:
            product?.productName ??
            "Unknown Product",

          sold:
            sale._sum.quantitySold ??
            0,
        };
      }
    )
  );

  return NextResponse.json(
    products
  );
}