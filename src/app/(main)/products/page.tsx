"use client";

import { useEffect, useState } from "react";
import ProductTable from "@/components/products/product-table";
import SearchBar from "@/components/products/search-bar";
import CategoryFilter from "@/components/products/category-filter";
import AddProductDialog from "@/components/products/add-product-dialog";
import EditProductDialog from "@/components/products/edit-product-dialog";

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

type ProductInput = Omit<
  Product,
  "id" | "profit" | "stockStatus"
>;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  /* ---------------- FETCH PRODUCTS ---------------- */

  const handleDeleteProduct = async (
  id: string
) => {
  const confirmed = window.confirm(
    "Delete this product?"
  );

  if (!confirmed) return;

  try {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------------- ADD PRODUCT ---------------- */

  const handleAddProduct = async (
    product: ProductInput
  ) => {
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- UPDATE PRODUCT (LOCAL FOR NOW) ---------------- */

const handleUpdateProduct = async (
  updated: Product
) => {
  try {
    await fetch(
      `/api/products/${updated.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(updated),
      }
    );

    fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

  /* ---------------- ENRICH PRODUCTS ---------------- */

  const enrichedProducts = products.map(
    (product) => {
      const profit =
        product.sellingPrice -
        product.costPrice;

      let stockStatus:
        | "LOW"
        | "MEDIUM"
        | "OK" = "OK";

      if (
        product.currentStock <=
        product.minimumStockThreshold
      ) {
        stockStatus = "LOW";
      } else if (
        product.currentStock <=
        product.minimumStockThreshold * 2
      ) {
        stockStatus = "MEDIUM";
      }

      return {
        ...product,
        profit,
        stockStatus,
      };
    }
  );

  /* ---------------- FILTERS ---------------- */

  const filteredProducts =
    enrichedProducts.filter((product) => {
      const matchesSearch =
        product.productName
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return (
        matchesSearch && matchesCategory
      );
    });

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage inventory, stock levels,
            pricing and profitability.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <CategoryFilter
            value={category}
            onChange={setCategory}
          />

          <AddProductDialog
            onAdd={handleAddProduct}
          />

        </div>

      </div>

      {/* STATS BAR */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="rounded-2xl bg-white border p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {products.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white border p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            Low Stock
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-500">
            {
              enrichedProducts.filter(
                (p) =>
                  p.stockStatus === "LOW"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-2xl bg-white border p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              new Set(
                products.map(
                  (p) => p.category
                )
              ).size
            }
          </h2>
        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <div className="border-b bg-gray-50 p-4">
          <h2 className="font-semibold">
            Inventory List
          </h2>
        </div>

        <div className="p-2">
        <ProductTable
  products={filteredProducts}
  onEdit={(product) => {
    setEditingProduct(product);
    setEditOpen(true);
  }}
  onDelete={handleDeleteProduct}
/>
        </div>

      </div>

      {/* EDIT MODAL */}

      <EditProductDialog
        product={editingProduct}
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        onUpdate={handleUpdateProduct}
      />

    </div>
  );
}