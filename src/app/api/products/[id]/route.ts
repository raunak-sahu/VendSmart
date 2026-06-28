import {
  NextResponse,
} from "next/server";

import {
  prisma,
} from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const product =
    await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

  return NextResponse.json(
    product
  );
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const body =
    await req.json();

  const updatedProduct =
    await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        productName:
          body.productName,

        category:
          body.category,

        costPrice:
          Number(
            body.costPrice
          ),

        sellingPrice:
          Number(
            body.sellingPrice
          ),

        currentStock:
          Number(
            body.currentStock
          ),

        minimumStockThreshold:
          Number(
            body.minimumStockThreshold
          ),
      },
    });

  return NextResponse.json(
    updatedProduct
  );
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  await prisma.product.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}