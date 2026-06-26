import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const q =
    searchParams.get("q") || "";

  const products =
    await prisma.product.findMany({
      where: {
        productName: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 5,
    });

  const vendors =
    await prisma.vendor.findMany({
      where: {
        vendorName: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 5,
    });

  const sales =
    await prisma.salesBill.findMany({
      where: {
        OR: [
          {
            customerName: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            invoiceNumber: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 5,
    });

  return NextResponse.json({
    products,
    vendors,
    sales,
  });
}