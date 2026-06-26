import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
export async function GET(){
    const transactions=await prisma.inventoryTransaction.findMany({
        include:{
            product:true,
        },
        orderBy:{
            createdAt:"desc",
        },
    });
    return NextResponse.json(transactions);
}