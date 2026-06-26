import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.vendor.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const vendor = await prisma.vendor.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(vendor);
}