import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Purchase = {
  totalAmount: number;
};

type VendorAnalytics = {
  vendorName: string;
  purchases: Purchase[];
};

export async function GET() {
  const vendors =
    await prisma.vendor.findMany({
      include: {
        purchases: true,
      },
    });

  const analytics = vendors.map(
    (vendor: VendorAnalytics) => ({
      vendorName:
        vendor.vendorName,

      totalSpend:
        vendor.purchases.reduce(
          (
            sum: number,
            p: Purchase
          ) =>
            sum + p.totalAmount,
          0
        ),

      orders:
        vendor.purchases.length,
    })
  );

  return NextResponse.json(
    analytics
  );
}