import type { LoginRequest, LoginResponse } from "@/types/auth";

import type { ApiResponse } from "@/types/common";

import type { Product, CreateProductRequest } from "@/types/product";
import type { Category } from "@/types/category";
import type { Branch, CreateBranchRequest } from "@/types/branch";

import { api } from "@/utils/api";

interface HealthResponse {
  success: boolean;
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// Health
export async function checkHealth() {
  return api.get<HealthResponse>(`${API_URL}/api/health`);
}

// Login
export async function login(data: LoginRequest): Promise<LoginResponse> {
  return api.post<LoginResponse>(`${API_URL}/api/login`, data);
}

// Products

export async function getProducts() {
  return api.get<ApiResponse<Product[]>>(`${API_URL}/api/products`);
}

export async function getProduct(id: number) {
  return api.get<ApiResponse<Product>>(`${API_URL}/api/products/${id}`);
}

export async function createProduct(data: CreateProductRequest) {
  return api.post<ApiResponse<Product>>(`${API_URL}/api/products`, data);
}

// Categories


export async function getCategories() {
  return api.get<ApiResponse<Category[]>>(`${API_URL}/api/category`);
}

export async function getCategory(id: number) {
  return api.get<ApiResponse<Category>>(`${API_URL}/api/category/${id}`);
}

// Branches
export async function getBranches() {
  return api.get<ApiResponse<Branch[]>>(`${API_URL}/api/branches`);
}

export async function getBranch(id: number) {
  return api.get<ApiResponse<Branch[]>>(`${API_URL}/api/branches/${id}`);
}

export async function createBranch(data: CreateBranchRequest) {
  return api.post<ApiResponse<Branch>>(`${API_URL}/api/branches`, data);
}
