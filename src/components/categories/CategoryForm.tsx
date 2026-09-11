"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
// import {  } from "@/lib/server-actions";

interface FormErrors {
  name?: string;
  branch?: string;
  display_order?: string;
}

export function CategoryForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [order, setOrder] = useState("");

  const [isActive, setIsActive] = useState(true);

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Category name is required.";
    }

     if (!branchId) {
      newErrors.branch = "Please select a branch.";
    }
    if (!order.trim()) {
      newErrors.display_order = "Order is required.";
    }

    return newErrors;
  }

//   async function handleSubmit(
//     event: SubmitEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();

//     setError("");

//     const validationErrors = validateForm();

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const data = {
//         name: name.trim(),
//         address: address.trim(),
//         phone: phone.trim(),
//         is_active: isActive,
//       };

//       const response = await createBranchAction(data);

//       if (!response.success) {
//         throw new Error(response.message);
//       }

//       router.push("/branches");
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "Failed to create branch."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

  return (
    <form
    //   onSubmit={handleSubmit}
      className="max-w-2xl space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold">
          Create Categories
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Add a new category to your cafe.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <Input
            id="name"
            label="Category Name"
            placeholder="Coffee"
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

          {errors.name && (
            <p className="mt-1 text-sm text-danger">
              {errors.name}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="text-sm font-medium"
          >
            Address
          </label>

          <textarea
            id="branch"
            value={branchId}
            onChange={(event) => {
              setBranchId(event.target.value);

              if (errors.branch) {
                setErrors((current) => ({
                  ...current,
                  branchId: undefined,
                }));
              }
            }}
            disabled={isLoading}
            placeholder="Enter Category"
            rows={3}
            required
            className="mt-1 w-full rounded-app border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          {errors.branch && (
            <p className="mt-1 text-sm text-danger">
              {errors.branch}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            id="display"
            label="Display Order"
            // type="tel"
            placeholder="1"
            value={order}
            onChange={(event) => {
              setOrder(event.target.value);

              if (errors.display_order) {
                setErrors((current) => ({
                  ...current,
                  display: undefined,
                }));
              }
            }}
            disabled={isLoading}
            required
          />

          {errors.display_order && (
            <p className="mt-1 text-sm text-danger">
              {errors.display_order}
            </p>
          )}
        </div>

        {/* Active */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) =>
              setIsActive(event.target.checked)
            }
            disabled={isLoading}
          />

          Active
        </label>
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

        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Branch"}
        </Button>
      </div>
    </form>
  );
}