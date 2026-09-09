import Link from "next/link";

import { CategoryService } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { id } = await params;

  const categoryId = Number(id);

  if (!Number.isInteger(categoryId)) {
    return (
      <div className="rounded-app border bg-background p-6">
        <h1 className="text-lg font-semibold">
          Invalid category ID
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          The category ID is not valid.
        </p>
      </div>
    );
  }

  const response = await CategoryService.getById(categoryId);

  const category = response.data;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/categories"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Categories
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">
            {category.name}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Category details
          </p>
        </div>
      </div>

      {/* Category information */}
      <div className="rounded-app border bg-background">
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <CategoryDetail
            label="Name"
            value={category.name}
          />

          <CategoryDetail
            label="Branch ID"
            value={String(category.branch_id)}
          />

          <CategoryDetail
            label="Display Order"
            value={String(category.display_order)}
          />

          <CategoryDetail
            label="Status"
            value={
              category.is_active
                ? "Active"
                : "Inactive"
            }
          />

          <CategoryDetail
            label="Created"
            value={category.created_at}
          />

          <CategoryDetail
            label="Updated"
            value={category.updated_at}
          />

          <div className="sm:col-span-2">
            <CategoryDetail
              label="Description"
              value={category.description || "—"}
            />
          </div>

          <div className="sm:col-span-2">
            <CategoryDetail
              label="Image"
              value={category.image_url || "—"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryDetailProps {
  label: string;
  value: string;
}

function CategoryDetail({
  label,
  value,
}: CategoryDetailProps) {
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