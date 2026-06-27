"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  productName: string;
  sellingPrice: number;
  costPrice: number;
};

export default function AddSaleDialog({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [productId, setProductId] = useState("");
  const [quantitySold, setQuantitySold] = useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product || null);
  }, [productId, products]);

  const handleSubmit = async () => {
    if (!selectedProduct) return;

    const totalAmount =
      selectedProduct.sellingPrice * quantitySold;

    const profit =
      (selectedProduct.sellingPrice -
        selectedProduct.costPrice) *
      quantitySold;

    await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceNumber: "SALE-" + Date.now(),
        customerName,
        paymentMethod,
        totalAmount,
        profit,
        items: [
          {
            productId,
            quantitySold,
            sellingPrice: selectedProduct.sellingPrice,
          },
        ],
      }),
    });

    onSuccess();

    setCustomerName("");
    setQuantitySold(1);
    setProductId("");
  };

  return (
    <div className="
      rounded-3xl border
      border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      p-6
      shadow-sm
    ">

      <h2 className="text-xl font-semibold mb-5 text-slate-900 dark:text-white">
        Create Sale
      </h2>

      <div className="grid gap-4">

        {/* Customer */}
        <input
          placeholder="Customer Name"
          className="
            border rounded-xl p-3
            bg-white dark:bg-slate-800
            border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        {/* Payment */}
        <select
          className="
            border rounded-xl p-3
            bg-white dark:bg-slate-800
            border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>UPI</option>
          <option>Cash</option>
          <option>Card</option>
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

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.productName}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          min={1}
          placeholder="Quantity"
          className="
            border rounded-xl p-3
            bg-white dark:bg-slate-800
            border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={quantitySold}
          onChange={(e) => setQuantitySold(Number(e.target.value))}
        />

        {/* Summary */}
        {selectedProduct && (
          <div className="
            rounded-xl p-4
            bg-slate-50 dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            text-slate-900 dark:text-white
          ">

            <p>
              Selling Price: ₹{selectedProduct.sellingPrice}
            </p>

            <p>
              Total: ₹{selectedProduct.sellingPrice * quantitySold}
            </p>

          </div>
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="
            rounded-xl bg-indigo-600 hover:bg-indigo-700
            py-3 text-white font-medium
            transition
          "
        >
          Create Sale
        </button>

      </div>

    </div>
  );
}