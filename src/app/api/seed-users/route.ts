import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const password =
    await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Manager",
        email: "manager@vendsmart.com",
        password,
        role: "MANAGER",
      },
      {
        name: "Employee",
        email: "employee@vendsmart.com",
        password,
        role: "EMPLOYEE",
      },
    ],
    skipDuplicates: true,
  });

  return Response.json({
    success: true,
  });
}