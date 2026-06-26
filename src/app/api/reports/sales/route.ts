import { prisma } from "@/lib/prisma";

export async function GET() {
  const sales = await prisma.salesBill.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const headers: string[] = [
    "Invoice",
    "Customer",
    "Payment Method",
    "Amount",
    "Profit",
    "Date",
  ];

  const rows = sales.map(
    (sale: {
      invoiceNumber: string;
      customerName: string;
      paymentMethod: string;
      totalAmount: number;
      profit: number;
      date: Date;
    }) => [
      sale.invoiceNumber,
      sale.customerName,
      sale.paymentMethod,
      sale.totalAmount,
      sale.profit,
      sale.date.toISOString(),
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
        'attachment; filename="sales-report.csv"',
    },
  });
}