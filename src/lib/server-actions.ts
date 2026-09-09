"use server";

import { ProductService,BranchService } from "@/lib/api";
import type { CreateProductRequest } from "@/types/product";
//import type { CreateCategory } from "@/types/category";
import type { CreateBranchRequest } from "@/types/branch";

//Author: Davies
// ====================
// Products 
// created on :06/09/26
// ====================

export async function createProductAction(
  data: CreateProductRequest
) {
  return ProductService.create(data);
}

// ====================
// Branches 
// created on :09/09/26
// ====================

export async function createBranchAction(
  data: CreateBranchRequest
) {
  return BranchService.create(data);
}

// ====================
// Category
// created on :09/09/26
// Backend doesn't created yet
// ====================

// export async function createCategoryAction(
//   data: CreateCategory
// ) =>{
//   return 
// };