import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10
      );

    const vendor =
      await prisma.vendor.create({
        data: {
          vendorName:
            body.name,
          companyName:
            body.companyName ||
            "Default Company",
          gstNumber:
            "NA",
          phoneNumber:
            body.phone ||
            "NA",
          email:
            body.email,
          address:
            "Not Provided",
          paymentTerms:
            "30 Days",
          status:
            "ACTIVE",
        },
      });

    const user =
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password:
            hashedPassword,
          role: "ADMIN",
          vendorId:
            vendor.id,
        },
      });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Signup failed",
      },
      {
        status: 500,
      }
    );
  }
}