import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(3),
  category: z.string(),
  costPrice: z.number(),
  sellingPrice: z.number(),
  currentStock: z.number(),
  minimumStockThreshold: z.number(),
});