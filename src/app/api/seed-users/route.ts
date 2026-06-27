import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const password = await bcrypt.hash("123456", 10);

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

  await prisma.user.upsert({
    where: { email: "manager@vendsmart.com" },
    update: {},
    create: {
      name: "Manager",
      email: "manager@vendsmart.com",
      password,
      role: "MANAGER",
      vendorId: vendor.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "employee@vendsmart.com" },
    update: {},
    create: {
      name: "Employee",
      email: "employee@vendsmart.com",
      password,
      role: "EMPLOYEE",
      vendorId: vendor.id,
    },
  });

  return Response.json({
    success: true,
  });
}