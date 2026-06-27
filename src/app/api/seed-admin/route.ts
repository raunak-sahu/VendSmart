import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const password =
    await bcrypt.hash("admin123", 10);

  const user =
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@vendsmart.com",
        password,
        role: "ADMIN",
      },
    });

  return Response.json(user);
}