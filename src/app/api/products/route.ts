import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products =
      await prisma.product.findMany({
        include: {
          vendor: true,
        },
      });

    return NextResponse.json(
      products
    );
  } catch (error) {
    console.error(
      "GET PRODUCTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    console.log(
      "PRODUCT BODY:",
      body
    );

    const vendor =
      await prisma.vendor.findFirst();

    console.log(
      "VENDOR FOUND:",
      vendor?.id
    );

    const product =
      await prisma.product.create({
        data: {
          productName:
            body.productName,

          category:
            body.category,

          costPrice: Number(
            body.costPrice
          ),

          sellingPrice: Number(
            body.sellingPrice
          ),

          currentStock: Number(
            body.currentStock
          ),

          minimumStockThreshold:
            Number(
              body.minimumStockThreshold
            ),

          batchNumber:
            body.batchNumber ||
            `BATCH-${Date.now()}`,

         manufacturingDate:
  body.manufacturingDate &&
  !isNaN(
    Date.parse(body.manufacturingDate)
  )
    ? new Date(
        body.manufacturingDate
      )
    : new Date(),

expiryDate:
  body.expiryDate &&
  !isNaN(
    Date.parse(body.expiryDate)
  )
    ? new Date(body.expiryDate)
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
            vendor?.id ||
            "",
        },

        include: {
          vendor: true,
        },
      });

    console.log(
      "PRODUCT CREATED:",
      product.id
    );

    return NextResponse.json(
      product
    );
  } catch (error) {
    console.error(
      "CREATE PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}