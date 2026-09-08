"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { createProductAction } from "@/lib/server-actions";
import type { Branch } from "@/types/branch";
import type { Category } from "@/types/category";

interface ProductFormProps {
  branches: Branch[];
  categories: Category[];
}
interface FormErrors {
  name?: string;
  branch?: string;
  basePrice?: string;
  sku?: string;
}
export function ProductForm({ branches, categories }: ProductFormProps) {
  const router = useRouter();
  const [branchId, setBranchId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [sku, setSku] = useState("");

  const [isAvailable, setIsAvailable] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!branchId) {
      newErrors.branch = "Please select a branch.";
    }

    if (!basePrice.trim()) {
      newErrors.basePrice = "Price is required.";
    } else {
      const price = Number(basePrice);

      if (!Number.isFinite(price)) {
        newErrors.basePrice = "Price must be a valid number.";
      } else if (price <= 0) {
        newErrors.basePrice = "Price must be greater than 0.";
      }
    }

    return newErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        branch_id: Number(branchId),
        category_id: categoryId ? Number(categoryId) : null,

        name,
        description: description || null,
        image_url: null,

        base_price: Number(basePrice),

        sku: sku || null,

        is_available: isAvailable,
        is_active: isActive,
      };

      const response = await createProductAction(data);

      if (!response.success) {
        throw new Error(response.message);
      }

      router.push("/products");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create product.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Create Product</h1>

        <p className="text-sm text-muted-foreground">
          Add a new product to your cafe menu.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          id="name"
          label="Product Name"
          placeholder="Cappuccino"
          value={name}
          onChange={(event) => {
            setName(event.target.value);

            if (errors.name) {
              setErrors((current) => ({
                ...current,
                name: undefined,
              }));
            }
          }}
          disabled={isLoading}
          required
        />

        {errors.name && <p className="text-sm text-danger">{errors.name}</p>}

        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={isLoading}
            placeholder="Freshly brewed espresso with steamed milk..."
            rows={4}
            className="w-full rounded-app border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="branch" className="text-sm font-medium">
            Branch
          </label>

          <select
            id="branch"
            value={branchId}
            onChange={(event) => {
              setBranchId(event.target.value);

              if (errors.branch) {
                setErrors((current) => ({
                  ...current,
                  branch: undefined,
                }));
              }
            }}
            disabled={isLoading}
            required
            className="w-full rounded-app border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a branch</option>

            {branches?.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="text-sm text-danger">{errors.branch}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>

          <select
            id="category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            disabled={isLoading}
            className="w-full rounded-app border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">No category</option>

            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="base_price"
          label="Base Price"
          type="number"
          min="0"
          step="0.01"
          placeholder="150"
          value={basePrice}
          onChange={(event) => {
            setBasePrice(event.target.value);

            if (errors.basePrice) {
              setErrors((current) => ({
                ...current,
                basePrice: undefined,
              }));
            }
          }}
          disabled={isLoading}
          required
        />
        {errors.basePrice && (
          <p className="text-sm text-danger">{errors.basePrice}</p>
        )}

        <Input
          id="sku"
          label="SKU"
          placeholder="CAP-001"
          value={sku}
          onChange={(event) => {
            setSku(event.target.value);

            if (errors.sku) {
              setErrors((current) => ({
                ...current,
                sku: undefined,
              }));
            }
          }}
          disabled={isLoading}
        />
        {errors.basePrice && (
          <p className="text-sm text-danger">{errors.sku}</p>
        )}
       
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(event) => setIsAvailable(event.target.checked)}
              disabled={isLoading}
            />
            Available for sale
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              disabled={isLoading}
            />
            Active
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-app border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
