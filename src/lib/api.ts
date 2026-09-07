
import type {
  ApiResponse,
} from "@/types/common";

import type {
  Product,
  CreateProductRequest,
} from "@/types/product";

import type {
  Category,
} from "@/types/category";

import type {
  Branch,
  CreateBranchRequest,
} from "@/types/branch";

import { api } from "@/utils/api";
import { serverApi } from "@/lib/server-api";

const API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}
interface HealthResponse {
  success: boolean;
  message: string;
}

// Health
export const HealthService = {
  check: () =>
    api.get<HealthResponse>(
      `${API_URL}/api/health`
    ),
};

// Products
export const ProductService = {
  getAll: () =>
    serverApi.get<ApiResponse<Product[]>>(
      `/api/products`
    ),

  getById: (id: number) =>
  serverApi.get<ApiResponse<Product>>(
      `/api/products/${id}`
    ),

  create: (data: CreateProductRequest) =>
    serverApi.post<ApiResponse<Product>>(
      "/api/products",
      data
    ),
};

// Categories
export const CategoryService = {
  getAll: () =>
    serverApi.get<ApiResponse<Category[]>>(
      "/api/category"
    ),

  getById: (id: number) =>
    serverApi.get<ApiResponse<Category>>(
      `/api/category/${id}`
    ),
};

// Branches
export const BranchService = {
  getAll: () =>
    serverApi.get<ApiResponse<Branch[]>>(
      "/api/branches"
    ),

  getById: (id: number) =>
    serverApi.get<ApiResponse<Branch[]>>(
      `/api/branches/${id}`
    ),

  create: (data: CreateBranchRequest) =>
    serverApi.post<ApiResponse<Branch>>(
      "/api/branches",
      data
    ),
};