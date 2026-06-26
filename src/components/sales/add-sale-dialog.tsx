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

  const [customerName, setCustomerName] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const [productId, setProductId] =
    useState("");

  const [quantitySold, setQuantitySold] =
    useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    const product = products.find(
      (p) => p.id === productId
    );

    setSelectedProduct(product || null);
  }, [productId, products]);

  const handleSubmit = async () => {
    if (!selectedProduct) return;

    const totalAmount =
      selectedProduct.sellingPrice *
      quantitySold;

    const profit =
      (selectedProduct.sellingPrice -
        selectedProduct.costPrice) *
      quantitySold;

    await fetch("/api/sales", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        invoiceNumber:
          "SALE-" + Date.now(),

        customerName,
        paymentMethod,
        totalAmount,
        profit,

        items: [
          {
            productId,
            quantitySold,
            sellingPrice:
              selectedProduct.sellingPrice,
          },
        ],
      }),
    });

    onSuccess();

    setCustomerName("");
    setQuantitySold(1);
  };

  return (
    <div className="rounded-3xl border bg-white p-6">

      <h2 className="text-xl font-semibold mb-5">
        Create Sale
      </h2>

      <div className="grid gap-4">

        <input
          placeholder="Customer Name"
          className="border rounded-xl p-3"
          value={customerName}
          onChange={(e) =>
            setCustomerName(
              e.target.value
            )
          }
        />

        <select
          className="border rounded-xl p-3"
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
        >
          <option>UPI</option>
          <option>Cash</option>
          <option>Card</option>
        </select>

        <select
          className="border rounded-xl p-3"
          value={productId}
          onChange={(e) =>
            setProductId(
              e.target.value
            )
          }
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.productName}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          placeholder="Quantity"
          className="border rounded-xl p-3"
          value={quantitySold}
          onChange={(e) =>
            setQuantitySold(
              Number(e.target.value)
            )
          }
        />

        {selectedProduct && (
          <div className="rounded-xl bg-slate-50 p-4">

            <p>
              Selling Price:
              ₹
              {
                selectedProduct.sellingPrice
              }
            </p>

            <p>
              Total:
              ₹
              {selectedProduct.sellingPrice *
                quantitySold}
            </p>

          </div>
        )}

        <button
          onClick={handleSubmit}
          className="rounded-xl bg-indigo-600 py-3 text-white"
        >
          Create Sale
        </button>

      </div>

    </div>
  );
}