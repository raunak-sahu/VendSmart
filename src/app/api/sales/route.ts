import{prisma }from "@/lib/prisma";
import{NextResponse} from"next/server";
export async function GET(){
    const sales=await prisma.salesBill.findMany({
        include:{
            items:{
                include:{
                    product:true,
                },
            },
        },
        orderBy:
        {
            date:"desc"
        },
    })
    return NextResponse.json(sales);
}
export async function POST(req:Request){
    const body=await req.json();
    const sale = await prisma.salesBill.create({
    data: {
      invoiceNumber: body.invoiceNumber,
      customerName: body.customerName,
      paymentMethod: body.paymentMethod,
      totalAmount: body.totalAmount,
      profit: body.profit,
      date: new Date(),

      items: {
        create: body.items.map((item: any) => ({
          quantitySold: item.quantitySold,
          sellingPrice: item.sellingPrice,
          productId: item.productId,
        })),
      },
    },
  });
   
     
  for (const item of body.items) {

  await prisma.product.update({
    where: {
      id: item.productId,
    },
    data: {
      currentStock: {
        decrement: item.quantitySold,
      },
    },
  });

  await prisma.inventoryTransaction.create({
    data: {
      productId: item.productId,
      quantity: item.quantitySold,
      transactionType: "SALE",
    },
  });

}
  

  return NextResponse.json(sale);
}