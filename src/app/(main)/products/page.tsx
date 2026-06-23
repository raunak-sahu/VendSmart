"use client";

import { useState } from "react";
import ProductTable from "@/components/products/product-table";
import SearchBar from "@/components/products/search-bar";
import CategoryFilter from "@/components/products/category-filter";
import AddProductDialog from "@/components/products/add-product-dialog";
import EditProductDialog from "@/components/products/edit-product-dialog";

/* ---------------- TYPES ---------------- */
type Product = {
  id: string;
  productName: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStockThreshold: number;
};

type ProductInput = Omit<Product, "id">;

/* ---------------- INITIAL DATA ---------------- */
const initialProducts: Product[] = [
  {
    id: "1",
    productName: "Maggi",
    category: "Food",
    costPrice: 10,
    sellingPrice: 15,
    currentStock: 200,
    minimumStockThreshold: 20,
  },
  {
    id: "2",
    productName: "Pepsi",
    category: "Drinks",
    costPrice: 25,
    sellingPrice: 35,
    currentStock: 100,
    minimumStockThreshold: 20,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");

  /* ---------------- EDIT & MODAL STATE ---------------- */
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  /* ---------------- HANDLERS ---------------- */
  const handleAddProduct = (product: ProductInput) => {
    const newProduct: Product = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(),
      ...product,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  /* ---------------- ENRICH DATA ---------------- */
  const enrichedProducts = products.map((product) => {
    const profit = product.sellingPrice - product.costPrice;
    let stockStatus: "LOW" | "MEDIUM" | "OK" = "OK";

    if (product.currentStock <= product.minimumStockThreshold) {
      stockStatus = "LOW";
    } else if (product.currentStock <= product.minimumStockThreshold * 2) {
      stockStatus = "MEDIUM";
    }

    return {
      ...product,
      profit,
      stockStatus,
    };
  });

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredProducts = enrichedProducts.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  /* ---------------- UI ---------------- */
 return (
  <div className="space-y-6">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Products
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your inventory, pricing & stock levels
        </p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
        <AddProductDialog onAdd={handleAddProduct} />
      </div>

    </div>

    {/* TABLE CONTAINER */}
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

      <div className="p-4 border-b bg-gray-50">
        <h2 className="font-semibold text-gray-700">
          Inventory List
        </h2>
      </div>

      <div className="p-2">
        <ProductTable
          products={filteredProducts}
          onEdit={(product: Product) => {
            setEditingProduct(product);
            setEditOpen(true);
          }}
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