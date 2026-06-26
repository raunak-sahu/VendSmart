import { prisma } from "@/lib/prisma";

export async function GET() {
  const products =
    await prisma.product.findMany();

  const headers: string[] = [
    "Product",
    "Category",
    "Cost Price",
    "Selling Price",
    "Current Stock",
    "Inventory Value",
  ];

  const rows = products.map(
    (p: {
      productName: string;
      category: string;
      costPrice: number;
      sellingPrice: number;
      currentStock: number;
    }) => [
      p.productName,
      p.category,
      p.costPrice,
      p.sellingPrice,
      p.currentStock,
      p.currentStock * p.costPrice,
    ]
  );

  const csv = [
    headers.join(","),
    ...rows.map(
      (r: (string | number)[]) => r.join(",")
    ),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="inventory-report.csv"',
    },
  });
}