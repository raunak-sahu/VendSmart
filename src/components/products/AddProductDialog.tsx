"use client";

import { useState } from "react";
export type ProductInput = {
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  vendorId?: string;
};

type Props = {
  onAdd: (
    product: ProductInput
  ) => void | Promise<void>;
};

export default function AddProductDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

const [form, setForm] = useState({
  productName: "",
  category: "Food",
  costPrice: "",
  sellingPrice: "",
  currentStock: "",
  minimumStockThreshold: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

console.log("FORM DATA:", form);

onAdd({
  ...form,
  costPrice: Number(form.costPrice),
  sellingPrice: Number(form.sellingPrice),
  currentStock: Number(form.currentStock),
  minimumStockThreshold: Number(
    form.minimumStockThreshold
  ),
});

 setForm({
  productName: "",
  category: "Food",
  costPrice: "",
  sellingPrice: "",
  currentStock: "",
  minimumStockThreshold: "",
});
    setOpen(false);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          rounded-xl bg-indigo-600 px-4 py-2
          text-white font-medium
          hover:bg-indigo-700 transition
        "
      >
        + Add Product
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          
          <div className="
            w-full max-w-md rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            p-6 space-y-4
            shadow-xl
          ">

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Add Product
            </h2>

            {/* Inputs */}
            <input
              name="productName"
              placeholder="Product Name"
              value={form.productName}
              onChange={handleChange}
              className="
                w-full rounded-xl border px-3 py-2
                bg-white dark:bg-slate-800
                border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="
                w-full rounded-xl border px-3 py-2
                bg-white dark:bg-slate-800
                border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-white
              "
            >
              <option value="Food">Food</option>
              <option value="Drinks">Drinks</option>
              <option value="Electronics">Electronics</option>
            </select>

            <div className="grid grid-cols-2 gap-3">

              <input
                name="costPrice"
                type="number"
                placeholder="Cost Price (₹)"
                value={form.costPrice}
                onChange={handleChange}
                className="
                  w-full rounded-xl border px-3 py-2
                  bg-white dark:bg-slate-800
                  border-slate-200 dark:border-slate-700
                  text-slate-900 dark:text-white
                "
              />

              <input
                name="sellingPrice"
                type="number"
                placeholder="Selling Price (₹)"
                value={form.sellingPrice}
                onChange={handleChange}
                className="
                  w-full rounded-xl border px-3 py-2
                  bg-white dark:bg-slate-800
                  border-slate-200 dark:border-slate-700
                  text-slate-900 dark:text-white
                "
              />

            </div>

            <div className="grid grid-cols-2 gap-3">

              <input
                name="currentStock"
                type="number"
                placeholder="Current Stock Quantity"
                value={form.currentStock}
                onChange={handleChange}
                className="
                  w-full rounded-xl border px-3 py-2
                  bg-white dark:bg-slate-800
                  border-slate-200 dark:border-slate-700
                  text-slate-900 dark:text-white
                "
              />

              <input
                name="minimumStockThreshold"
                type="number"
                placeholder="Low Stock Alert Threshold"
                value={form.minimumStockThreshold}
                onChange={handleChange}
                className="
                  w-full rounded-xl border px-3 py-2
                  bg-white dark:bg-slate-800
                  border-slate-200 dark:border-slate-700
                  text-slate-900 dark:text-white
                "
              />

            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">

              <button
                onClick={() => setOpen(false)}
                className="
                  px-4 py-2 rounded-xl
                  border border-slate-200 dark:border-slate-700
                  text-slate-700 dark:text-slate-300
                  hover:bg-slate-100 dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="
                  px-4 py-2 rounded-xl
                  bg-green-600 text-white
                  hover:bg-green-700 transition
                "
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