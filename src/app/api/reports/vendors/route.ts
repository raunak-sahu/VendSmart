import { prisma } from "@/lib/prisma";

export async function GET() {
  const vendors = await prisma.vendor.findMany();

  const headers: string[] = [
    "Vendor",
    "Company",
    "GST",
    "Phone",
    "Email",
    "Status",
  ];

  const rows = vendors.map(
    (v: {
      vendorName: string;
      companyName: string;
      gstNumber: string;
      phoneNumber: string;
      email: string;
      status: string;
    }) => [
      v.vendorName,
      v.companyName,
      v.gstNumber,
      v.phoneNumber,
      v.email,
      v.status,
    ]
  );

  const csv = [
    headers.join(","),
    ...rows.map(
      (r: string[]) => r.join(",")
    ),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="vendor-report.csv"',
    },
  });
}