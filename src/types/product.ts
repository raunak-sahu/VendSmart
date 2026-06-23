

export type Product = {
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