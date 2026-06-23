"use client";

import { useState } from "react";

type ProductInput = {
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;
};

type Props = {
  onAdd: (product: ProductInput) => void;
};

export default function AddProductDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<ProductInput>({
    productName: "",
    category: "Food",
    costPrice: 0,
    sellingPrice: 0,
    currentStock: 0,
    minimumStockThreshold: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.productName) return;

    onAdd(form);

    setForm({
      productName: "",
      category: "Food",
      costPrice: 0,
      sellingPrice: 0,
      currentStock: 0,
      minimumStockThreshold: 0,
    });

    setOpen(false);
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        + Add Product
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">

            <h2 className="text-xl font-bold">Add Product</h2>

            <input
              name="productName"
              placeholder="Product Name"
              value={form.productName}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="Food">Food</option>
              <option value="Drinks">Drinks</option>
            </select>

            <input
              name="costPrice"
              type="number"
              placeholder="Cost Price"
              value={form.costPrice}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <input
              name="sellingPrice"
              type="number"
              placeholder="Selling Price"
              value={form.sellingPrice}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <input
              name="currentStock"
              type="number"
              placeholder="Stock"
              value={form.currentStock}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <input
              name="minimumStockThreshold"
              type="number"
              placeholder="Min Stock"
              value={form.minimumStockThreshold}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}