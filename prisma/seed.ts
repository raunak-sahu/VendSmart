import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const vendor = await prisma.vendor.create({
    data: {
      vendorName: "Default Vendor",
      companyName: "VendSmart",
      gstNumber: "GST123",
      phoneNumber: "9999999999",
      email: "vendor@test.com",
      address: "India",
      paymentTerms: "NET 30",
      status: "ACTIVE",
    },
  });

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@vend.com",
      password: hashedPassword,
      role: "ADMIN",
      vendorId: vendor.id,
    },
  });
}

main().then(() => {
  console.log("Seeded!");
  process.exit();
});