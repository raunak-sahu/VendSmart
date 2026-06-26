import{prisma} from"@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(){
    const products=await prisma.product.findMany({
        include:
        {
            salesItems:{
            include:
            {
                salesBill:true,
            },
            orderBy:{
                salesBill:{
                    date:"desc",
                },
            },
            take:1,
        },
    },
    });
    
    const deadStock =products.map( (product: {
    productName: string;
    currentStock: number;
    salesItems: {
      salesBill: {
        date: Date;
      } | null;
    }[];
  })=>{
        const lastSale=product.salesItems[0]?.salesBill?.date;
        let daysSinceSale=999;
        if(lastSale){
            daysSinceSale=Math.floor((Date.now()-new Date(lastSale).getTime())/(1000 * 60 * 60 * 24));
        }
      return {
  productName:
    product.productName,

  currentStock:
    product.currentStock,

  daysSinceSale,
};
    
    });
    const filtered=deadStock.filter((p:{
        productName:string;
        currentStock:number;
        daysSinceSale:number;
    })=>p.daysSinceSale>30);
    return NextResponse.json(filtered);
}