import Link from "next/link";

import { ProductService } from "@/lib/api";

// import type { ApiResponse } from "@/types/common";
// import type { Product } from "@/types/product";

import { ProductTable } from "@/components/products/ProductTable";

export default async function ProductsPage() {
  const response = await ProductService.getAll();


  const products = response.data;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your cafe products.
          </p>
        </div>

        <Link
          href="/products/new"
          className="rounded-app bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Add Product
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}