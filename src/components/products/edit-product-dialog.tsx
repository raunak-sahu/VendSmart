"use client";
import {useEffect,useState} from "react";
type Product={
      id: string;
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;
};
type Props={
    product: Product | null;
    open: boolean;
    onClose:()=> void;
    onUpdate:(product:Product)=> void;
};
export default function EditProductDialog({
    product,open,onClose,onUpdate,
}:Props)
{
     const [form, setForm] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  if (!open || !form) return null;

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
    if (!form) return;
    onUpdate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[420px] space-y-3">

        <h2 className="text-xl font-bold">Edit Product</h2>

        <input
          name="productName"
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
          value={form.costPrice}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="sellingPrice"
          type="number"
          value={form.sellingPrice}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="currentStock"
          type="number"
          value={form.currentStock}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="minimumStockThreshold"
          type="number"
          value={form.minimumStockThreshold}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}