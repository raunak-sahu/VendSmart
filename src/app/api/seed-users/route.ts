import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const password =
    await bcrypt.hash(
      "password123",
      10
    );

  await prisma.user.upsert({
    where: {
      email: "admin@vend.com",
    },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@vend.com",
      password,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "manager@vend.com",
    },
    update: {},
    create: {
      name: "Manager User",
      email: "manager@vend.com",
      password,
      role: "MANAGER",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "employee@vend.com",
    },
    update: {},
    create: {
      name: "Employee User",
      email: "employee@vend.com",
      password,
      role: "EMPLOYEE",
    },
  });

  return NextResponse.json({
    success: true,
  });
}