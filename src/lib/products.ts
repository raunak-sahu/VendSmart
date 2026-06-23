// src/lib/products.ts

import { Product } from "@/types/product";

let products: Product[] = [];

export const ProductService = {
  getAll: () => products,

  add: (product: Product) => {
    products.push(product);
  },

  update: (id: string, updated: Partial<Product>) => {
    products = products.map((p) =>
      p.id === id ? { ...p, ...updated } : p
    );
  },

  remove: (id: string) => {
    products = products.filter((p) => p.id !== id);
  },
};