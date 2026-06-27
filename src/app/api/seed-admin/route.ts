import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const password = await bcrypt.hash("admin123", 10);

  const vendor = await prisma.vendor.upsert({
    where: { id: "default-vendor" },
    update: {},
    create: {
      id: "default-vendor",
      vendorName: "Default Vendor",
      companyName: "VendSmart",
      gstNumber: "GST123456789",
      phoneNumber: "9999999999",
      email: "vendor@vendsmart.com",
      address: "Default Address",
      paymentTerms: "Net 30",
      status: "ACTIVE",
    },
  });

  const user = await prisma.user.upsert({
    where: {
      email: "admin@vendsmart.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@vendsmart.com",
      password,
      role: "ADMIN",
      vendorId: vendor.id,
    },
  });

  return Response.json({ success: true, user });
}