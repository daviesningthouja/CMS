"use server";

import { ProductService } from "@/lib/api";
import type { CreateProductRequest } from "@/types/product";

export async function createProductAction(
  data: CreateProductRequest
) {
  return ProductService.create(data);
}