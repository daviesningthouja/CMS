import Link from "next/link";

import { BranchService, CategoryService, ProductService } from "@/lib/api";


interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return (
      <div className="rounded-app border bg-background p-6">
        <h1 className="text-lg font-semibold">
          Invalid product ID
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          The product ID is not valid.
        </p>
      </div>
    );
  }

  const productResponse =
  await ProductService.getById(productId);

  const product = productResponse.data;

  const [branchResponse, categoryResponse] =
    await Promise.all([
      BranchService.getById(product.branch_id),
      product.category_id !== null 
        ? CategoryService.getById(product.category_id)
        : Promise.resolve(null),
    ]);

  const branch = branchResponse?.data;
  const category = categoryResponse?.data;
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/products"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Products
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">
            {product.name}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Product details
          </p>
        </div>
      </div>

      {/* Product information */}
      <div className="rounded-app border bg-background">
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <ProductDetail
            label="Name"
            value={product.name}
          />

          <ProductDetail
            label="Price"
            value={`₹${product.base_price}`}
          />

          <ProductDetail
            label="SKU"
            value={product.sku || "—"}
          />

          <ProductDetail
            label="Branch"
            value={String(branch?.name || "—")}
          />

          <ProductDetail
            label="Category"
            value={
              product.category_id !== null
                ? String(category?.name)
                : "—"
            }
          />

          <ProductDetail
            label="Availability"
            value={
              product.is_available
                ? "Available"
                : "Unavailable"
            }
          />

          <ProductDetail
            label="Active"
            value={
              product.is_active
                ? "Yes"
                : "No"
            }
          />

          <div className="sm:col-span-2">
            <ProductDetail
              label="Description"
              value={
                product.description || "No description"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductDetailProps {
  label: string;
  value: string;
}

function ProductDetail({
  label,
  value,
}: ProductDetailProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm">
        {value}
      </p>
    </div>
  );
}