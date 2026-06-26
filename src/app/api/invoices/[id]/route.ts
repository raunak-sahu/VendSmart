import{prisma } from "@/lib/prisma";
import PDFDocument from"pdfkit";
export async function GET(
    req:Request,
    {
        params
    }:{
        params:Promise<{id:string}>
    }
){
    const {id} =await params;
    const sale=await prisma.salesBill.findUnique({
where:{id},
include:{
    items:{
        include:{
            product:true,
        },
    },
},
    });
    if(!sale){
        return new Response("Invoice not found",{status:404});
    }
    const doc=new PDFDocument();
    const buffers:Buffer[]=[];
    doc.on("data",(b)=>buffers.push(b));
    const pdfPromise=new Promise<Buffer>((resolve)=>{
        doc.on("end",()=>resolve(Buffer.concat(buffers)));
    });
    doc.fontSize(24);
    doc.text("VendSmart");
    doc.moveDown();
    doc.fontSize(18);
    doc.text("Sales Invoice");
    doc.moveDown();
     doc.text(
    `Invoice: ${sale.invoiceNumber}`
  );
  doc.text(
    `Customer: ${sale.customerName}`
  );
  doc.text(
    `Payment: ${sale.paymentMethod}`
  );
  doc.text(
    `Date: ${sale.date.toLocaleDateString()}`
  );
  doc.moveDown();
  sale.items.forEach(
  (item: {
    quantitySold: number;
    sellingPrice: number;
    product: {
      productName: string;
    };
  }) => {
    doc.text(
      `${item.product.productName}
       x${item.quantitySold}
       ₹${item.sellingPrice}`
    );
  }
);
 
  doc.moveDown();
  doc.text(
    `Total: ₹${sale.totalAmount}`
  );
  doc.text(
    `Profit: ₹${sale.profit}`
  );
  doc.end();
const pdf =
  await pdfPromise;

return new Response(
  new Uint8Array(pdf),
  {
    headers: {
      "Content-Type":
        "application/pdf",

      "Content-Disposition":
        `attachment; filename=${sale.invoiceNumber}.pdf`,
    },
  }
);
    
}