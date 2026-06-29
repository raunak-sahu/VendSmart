import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: RouteParams
) {
  const { id } = await params;

  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });

  return NextResponse.json(product);
}

export async function DELETE(
  req: Request,
  { params }: RouteParams
) {
  const { id } = await params;

  await prisma.product.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function PUT(
  req: Request,
  { params }: RouteParams
) {
  const { id } = await params;

  const body = await req.json();

  const updated =
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        productName: body.productName,
        category: body.category,
        costPrice: Number(body.costPrice),
        sellingPrice: Number(body.sellingPrice),
        currentStock: Number(body.currentStock),
        minimumStockThreshold: Number(
          body.minimumStockThreshold
        ),
      },
    });

  return NextResponse.json(updated);
}