import {
  NextResponse,
} from "next/server";

import {
  prisma,
} from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const product =
    await prisma.product.findUnique(
      {
        where: {
          id: params.id,
        },
      }
    );

  return NextResponse.json(
    product
  );
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  await prisma.product.delete(
    {
      where: {
        id: params.id,
      },
    }
  );

  return NextResponse.json({
    success: true,
  });
}