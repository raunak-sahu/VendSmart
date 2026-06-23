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
};

export default function ProductTable({
  products,
  onEdit,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">

        <div>
          <h2 className="text-xl font-semibold">
            Products Inventory
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor all inventory items
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm">
          {products.length} Products
        </div>

      </div>

      {/* Table */}
      <table className="w-full">

        <thead>
          <tr className="border-b bg-slate-50">

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
              Product
            </th>

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
              Category
            </th>

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
              Stock
            </th>

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
              Price
            </th>

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
              Profit
            </th>

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-slate-50 transition"
            >

              {/* Product */}
              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Package
                      size={18}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="font-medium">
                      {product.productName}
                    </p>

                    <p className="text-xs text-slate-500">
                      SKU #{product.id.slice(0, 6)}
                    </p>
                  </div>

                </div>

              </td>

              {/* Category */}
              <td className="px-6 py-5">

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                  {product.category}
                </span>

              </td>

              {/* Stock */}
              <td className="px-6 py-5 font-medium">
                {product.currentStock}
              </td>

              {/* Price */}
              <td className="px-6 py-5">
                ₹{product.sellingPrice}
              </td>

              {/* Profit */}
              <td className="px-6 py-5">

                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <TrendingUp size={16} />
                  ₹{product.profit ?? 0}
                </div>

              </td>

              {/* Status */}
              <td className="px-6 py-5">

                {product.stockStatus === "LOW" && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    <AlertTriangle size={12} />
                    Low Stock
                  </span>
                )}

                {product.stockStatus === "MEDIUM" && (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    Medium
                  </span>
                )}

                {product.stockStatus === "OK" && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Healthy
                  </span>
                )}

              </td>

              {/* Actions */}
              <td className="px-6 py-5">

                <button
                  onClick={() => onEdit(product)}
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-slate-100 transition"
                >
                  <Pencil size={14} />
                  Edit
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}