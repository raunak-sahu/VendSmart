import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("EMAIL:", body.email);

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  console.log("USER FOUND:", !!user);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(
    body.password,
    user.password
  );

  console.log("PASSWORD MATCH:", valid);

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    "secret123"
  );

  const response = NextResponse.json({
    success: true,
    user,
  });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return response;
}