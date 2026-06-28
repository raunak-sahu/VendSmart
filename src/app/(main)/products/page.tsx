"use client";

import { useEffect, useState } from "react";

import ProductTable from "@/components/products/ProductTable";
import SearchBar from "@/components/products/search-bar";
import CategoryFilter from "@/components/products/category-filter";
import AddProductDialog from "@/components/products/AddProductDialog";
import EditProductDialog from "@/components/products/edit-product-dialog";

import ProductStats from "@/components/products/ProductStats";

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

  /* ---------------- DELETE ---------------- */

  const handleDeleteProduct = async (id: string) => {
    const confirmed = window.confirm("Delete this product?");
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

  /* ---------------- ADD ---------------- */

 const handleAddProduct = async (
  product: ProductInput
) => {
  try {
    const res = await fetch(
      "/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          product
        ),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {
      alert(
        data.error ||
          "Failed to add product"
      );
      return;
    }

    fetchProducts();

    alert(
      `${data.productName} added successfully`
    );
  } catch (error) {
    console.error(error);

    alert(
      "Something went wrong"
    );
  }
};

  /* ---------------- UPDATE ---------------- */

  const handleUpdateProduct = async (updated: Product) => {
    try {
      await fetch(`/api/products/${updated.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- ENRICH PRODUCTS ---------------- */

  const enrichedProducts = products.map((product) => {
    const profit =
      product.sellingPrice - product.costPrice;

    let stockStatus: "LOW" | "MEDIUM" | "OK" = "OK";

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
  });

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

      return matchesSearch && matchesCategory;
    });

  /* ---------------- STATS ---------------- */

  const totalProfit = enrichedProducts.reduce(
    (acc, p) => acc + (p.profit ?? 0),
    0
  );

  const lowStockCount = enrichedProducts.filter(
    (p) => p.stockStatus === "LOW"
  ).length;

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Products
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage inventory, stock levels, pricing and profitability.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">

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

      {/* STATS */}
      <ProductStats
        total={products.length}
        lowStock={lowStockCount}
        totalProfit={totalProfit}
      />

      {/* TABLE */}
      <div className="
        rounded-2xl border
        border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        overflow-hidden
      ">

        <div className="
          border-b border-slate-200 dark:border-slate-800
          p-4
        ">
          <h2 className="font-semibold text-slate-900 dark:text-white">
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
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdateProduct}
      />

    </div>
  );
}