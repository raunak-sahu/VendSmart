"use client";

import {
  Package,
  Pencil,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

type Product = {
  id: string;
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;
  profit?: number;
  stockStatus?: "LOW" | "MEDIUM" | "OK";
};

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="
      overflow-hidden rounded-3xl
      border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      shadow-sm
      transition-colors
    ">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-6">

        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Products Inventory
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage and monitor all inventory items
          </p>
        </div>

        <div className="
          rounded-xl px-4 py-2 text-sm
          bg-slate-100 dark:bg-slate-800
          text-slate-700 dark:text-slate-200
        ">
          {products.length} Products
        </div>

      </div>

      {/* Table wrapper (mobile safe) */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>
            <tr className="
              border-b border-slate-200 dark:border-slate-800
              bg-slate-50 dark:bg-slate-800
            ">

              {[
                "Product",
                "Category",
                "Stock",
                "Price",
                "Profit",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300"
                >
                  {h}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  border-b border-slate-200 dark:border-slate-800
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  transition
                "
              >

                {/* Product */}
                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="
                      h-10 w-10 rounded-xl
                      bg-indigo-100 dark:bg-indigo-500/20
                      flex items-center justify-center
                    ">
                      <Package
                        size={18}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {product.productName}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        SKU #{product.id.slice(0, 6)}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Category */}
                <td className="px-6 py-5">
                  <span className="
                    rounded-full px-3 py-1 text-xs font-medium
                    bg-slate-100 dark:bg-slate-800
                    text-slate-700 dark:text-slate-300
                  ">
                    {product.category}
                  </span>
                </td>

                {/* Stock */}
                <td className="px-6 py-5 font-medium text-slate-900 dark:text-slate-100">
                  {product.currentStock}
                </td>

                {/* Price */}
                <td className="px-6 py-5 text-slate-900 dark:text-slate-100">
                  ₹{product.sellingPrice}
                </td>

                {/* Profit */}
                <td className="px-6 py-5">

                  <div className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                    <TrendingUp size={16} />
                    ₹{product.profit ?? 0}
                  </div>

                </td>

                {/* Status */}
                <td className="px-6 py-5">

                  {product.stockStatus === "LOW" && (
                    <span className="
                      inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium
                      bg-red-100 text-red-700
                      dark:bg-red-500/20 dark:text-red-400
                    ">
                      <AlertTriangle size={12} />
                      Low Stock
                    </span>
                  )}

                  {product.stockStatus === "MEDIUM" && (
                    <span className="
                      rounded-full px-3 py-1 text-xs font-medium
                      bg-yellow-100 text-yellow-700
                      dark:bg-yellow-500/20 dark:text-yellow-400
                    ">
                      Medium
                    </span>
                  )}

                  {product.stockStatus === "OK" && (
                    <span className="
                      rounded-full px-3 py-1 text-xs font-medium
                      bg-green-100 text-green-700
                      dark:bg-green-500/20 dark:text-green-400
                    ">
                      Healthy
                    </span>
                  )}

                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">

                    <button
                      onClick={() => onEdit(product)}
                      className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 hover:opacity-80"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      className="font-medium text-red-600 dark:text-red-400 hover:opacity-80"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}