"use client";
import{useEffect,useState} from "react";
type Transaction={
    id:string,
    quantity:number;
    transactionType:string;
    createdAt:string;
    product:{
        productName:string,
    };
};
export default function InventoryHistoryPage(){
const[transactions,setTransactions]=useState<Transaction[]>([]);
useEffect(()=>{
    fetch("/api/transactions")
    .then((res)=>res.json())
    .then(setTransactions);
},[]);
return (
    <div className="space-y-6">
        <div> 
            <h1 className="text-4xl font-bold">
                Inventory History
            </h1>
            <p className="text-slate-500 mt-2">
                Track all stock movements
            </p>
        </div>
        <div className="overflow-hidden rounded-3xl border bg-white">
        <table className="w-full">
<thead className="bg-slate-50">
    <tr>
        <th className="p-4 text-left">
            Product
        </th>
        <th className="p-4 text-left">
            Type
        </th>
        <th className="p-4 text-left">
            Quantity
        </th>
        <th className="p-4 text-left">
            Date
        </th>
    </tr>
</thead>
<tbody>
     {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-t"
              >
                <td className="p-4">
                  {t.product.productName}
                </td>

                <td className="p-4">

                  {t.transactionType ===
                  "SALE" ? (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      SALE
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      PURCHASE
                    </span>
                  )}

                </td>
                <td className="p-4">
                  {t.quantity}
                </td>
                <td className="p-4">
                  {new Date(
                    t.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}