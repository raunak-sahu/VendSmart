"use client";

import { useState } from "react";

type ProductInput = {
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;

  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
};

type Props = {
  initial?: ProductInput;
  onSubmit: (data: ProductInput) => void;
};

export default function ProductForm({ initial, onSubmit }: Props) {
 const [form, setForm] = useState<ProductInput>(
  initial || {
    productName: "",
    category: "Food",
    costPrice: 0,
    sellingPrice: 0,
    currentStock: 0,
    minimumStockThreshold: 0,

    batchNumber: "",
    manufacturingDate: "",
    expiryDate: "",
  }
);

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

  return (
    <div className="space-y-3">

      <input
        name="productName"
        value={form.productName}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-800"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-800"
      >
        <option>Food</option>
        <option>Drinks</option>
        <option>Electronics</option>
      </select>

      <div className="grid grid-cols-2 gap-3">

        <input
          name="costPrice"
          type="number"
          value={form.costPrice}
          onChange={handleChange}
          placeholder="Cost"
          className="border rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-800"
        />

        <input
          name="sellingPrice"
          type="number"
          value={form.sellingPrice}
          onChange={handleChange}
          placeholder="Selling"
          className="border rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-800"
        />

<input
  name="batchNumber"
  value={form.batchNumber}
  onChange={handleChange}
  placeholder="Batch Number"
  className="w-full border rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-800"
/>

<input
  name="manufacturingDate"
  type="date"
  value={form.manufacturingDate}
  onChange={handleChange}
  className="w-full border rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-800"
/>
<input
  name="expiryDate"
  type="date"
  value={form.expiryDate}
  onChange={handleChange}
  className="w-full border rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-800"
/>

      </div>

      <button
        onClick={() => onSubmit(form)}
        className="
          w-full bg-indigo-600 text-white
          py-2 rounded-xl hover:bg-indigo-700
        "
      >
        Save Product
      </button>

    </div>
  );
}