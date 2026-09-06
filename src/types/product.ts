export interface Product {
  id: number;
  branch_id: number;
  category_id: number | null;
  name: string;
  description: string | null;
  image_url: string | null;
  base_price: number;
  sku: string | null;
  is_available: boolean;
  is_active: boolean;
}

export interface CreateProductRequest {
  branch_id: number;
  category_id?: number | null;
  name: string;
  description?: string | null;
  image_url?: string | null;
  base_price: number;
  sku?: string | null;
  is_available: boolean;
  is_active: boolean;
}