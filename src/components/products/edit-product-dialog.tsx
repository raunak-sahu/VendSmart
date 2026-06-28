"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;
};

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (product: Product) => void;
};

export default function EditProductDialog({
  product,
  open,
  onClose,
  onUpdate,
}: Props) {
  const [form, setForm] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  if (!open || !form) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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
    if (!form) return;

    onUpdate(form);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div
        className="
          w-full max-w-xl
          rounded-3xl
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          p-6
          space-y-5
          shadow-2xl
        "
      >

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit Product
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update product information, pricing and inventory details.
          </p>
        </div>

        {/* Product Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Product Name
          </label>

          <input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="e.g. Maggi Noodles"
            className="
              w-full rounded-xl border px-4 py-3
              bg-white dark:bg-slate-800
              border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
              w-full rounded-xl border px-4 py-3
              bg-white dark:bg-slate-800
              border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-indigo-500
            "
          >
            <option value="Food">Food</option>
            <option value="Drinks">Drinks</option>
            <option value="Snacks">Snacks</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Household">Household</option>
          </select>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Cost Price (₹)
            </label>

            <input
              name="costPrice"
              type="number"
              value={form.costPrice}
              onChange={handleChange}
              placeholder="Purchase price"
              className="
                w-full rounded-xl border px-4 py-3
                bg-white dark:bg-slate-800
                border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-white
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Selling Price (₹)
            </label>

            <input
              name="sellingPrice"
              type="number"
              value={form.sellingPrice}
              onChange={handleChange}
              placeholder="Customer price"
              className="
                w-full rounded-xl border px-4 py-3
                bg-white dark:bg-slate-800
                border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-white
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

        </div>

        {/* Inventory */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Current Stock Quantity
            </label>

            <input
              name="currentStock"
              type="number"
              value={form.currentStock}
              onChange={handleChange}
              placeholder="Units available"
              className="
                w-full rounded-xl border px-4 py-3
                bg-white dark:bg-slate-800
                border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-white
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Low Stock Alert Threshold
            </label>

            <input
              name="minimumStockThreshold"
              type="number"
              value={form.minimumStockThreshold}
              onChange={handleChange}
              placeholder="Alert below this value"
              className="
                w-full rounded-xl border px-4 py-3
                bg-white dark:bg-slate-800
                border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-white
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              px-5
              py-2.5
              text-slate-700
              dark:text-slate-300
              hover:bg-slate-100
              dark:hover:bg-slate-800
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              rounded-xl
              bg-indigo-600
              px-5
              py-2.5
              font-medium
              text-white
              hover:bg-indigo-700
              transition
            "
          >
            Update Product
          </button>

        </div>

      </div>

    </div>
  );
}