"use-client";
import {useEffect,useState} from "react";
type Vendor={
    id:string,
    vendorName:string;
};
type Product={
    id:string;
    productName:string;
}
export default function AddPurchaseDialog({onSuccess,}:{
    onSuccess:()=>void;
})
{
    const[vendors,setVendors]=useState<Vendor[]>([]);
    const[products,setProducts]=useState<Product[]>([]);
    const[vendorId,setVendorId]=useState("");
    const[productId,setProductId]=useState("");
    const[quantity,setQuantity]=useState(0);
    const[costPrice,setCostPrice]=useState(0);
    useEffect(()=>{
        fetch("/api/vendors")
        .then((res)=>res.json())
        .then(setVendors);

        fetch("/api/products")
        .then((res)=>res.json())
        .then(setProducts);
    },[]);
    const handleSubmit=async()=>{
        const totalAmount=quantity*costPrice;
        await fetch("/api/purchases",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                invoiceNumber:
          "INV-" + Date.now(),

        vendorId,

        totalAmount,

        items: [
          {
            productId,
            quantity,
            costPrice,
          },
        ],
      }),
    });

    onSuccess();
    };
    return(
        <div className="rounded-3xl border bg-white p-6">
            <h3 className="text-xl font-semibold mb-5">
                New Purchase
            </h3>
            <div className="grid gap-4">
                <select className="border rounded-xl p-3"
                    value={vendorId}
                    onChange={(e)=>setVendorId(e.target.value)}
                >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor)=>(
                        <option key={vendor.id} value={vendor.id}>
                            {vendor.vendorName}
                        </option>
                    ))}
                </select>
                <select className="border rounded-xl p-3"
                value={productId}
                onChange={(e)=>setProductId(e.target.value)}
                >
                    <option value="">Select Product</option>
                    {products.map((product)=>(
                        <option key={product.id} value={product.id}>
                            {product.productName}
                        </option>
                    ))}
                </select>

                <input type="number" 
                placeholder="Quantity"
                className="border rounded-xl p-3"
                onChange={(e)=>setQuantity(Number(e.target.value))}
                />
                <input type="number"
                placeholder="Cost Price"
                className="border rounded-xl p-3"
                onChange={(e)=>setCostPrice(Number(e.target.value))}
                />
                <button onClick={handleSubmit}
                className="rounded-xl bg-black text-white p-3"
                >
                    Create Purchase
                </button>
        </div>
        </div>
    );
}