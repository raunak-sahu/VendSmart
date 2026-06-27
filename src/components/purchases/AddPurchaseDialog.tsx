"use client";

import { useEffect, useState } from "react";

type Vendor = {
  id: string;
  vendorName: string;
};

type Product = {
  id: string;
  productName: string;
};

export default function AddPurchaseDialog({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [vendorId, setVendorId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [costPrice, setCostPrice] = useState(0);

  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then(setVendors);

    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleSubmit = async () => {
    const totalAmount = quantity * costPrice;

    await fetch("/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceNumber: "INV-" + Date.now(),
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

  return (
    <div className="
      rounded-3xl border
      border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      p-6
    ">

      <h3 className="text-xl font-semibold mb-5 text-slate-900 dark:text-white">
        New Purchase
      </h3>

      <div className="grid gap-4">

        {/* Vendor */}
        <select
          className="
            border rounded-xl p-3
            bg-white dark:bg-slate-800
            border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
        >
          <option value="">Select Vendor</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.vendorName}
            </option>
          ))}
        </select>

        {/* Product */}
        <select
          className="
            border rounded-xl p-3
            bg-white dark:bg-slate-800
            border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.productName}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          placeholder="Quantity"
          className="
            border rounded-xl p-3
            bg-white dark:bg-slate-800
            border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        {/* Cost Price */}
        <input
          type="number"
          placeholder="Cost Price"
          className="
            border rounded-xl p-3
            bg-white dark:bg-slate-800
            border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          onChange={(e) => setCostPrice(Number(e.target.value))}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="
            rounded-xl bg-indigo-600 hover:bg-indigo-700
            text-white p-3 font-medium transition
          "
        >
          Create Purchase
        </button>

      </div>
    </div>
  );
}