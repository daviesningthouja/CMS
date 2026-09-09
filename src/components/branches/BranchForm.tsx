"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { createBranchAction } from "@/lib/server-actions";

interface FormErrors {
  name?: string;
  address?: string;
  phone?: string;
}

export function BranchForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [isActive, setIsActive] = useState(true);

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Branch name is required.";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    return newErrors;
  }

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>
  ) {
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
        name: name.trim(),
        address: address.trim(),
        phone: phone.trim(),
        is_active: isActive,
      };

      const response = await createBranchAction(data);

      if (!response.success) {
        throw new Error(response.message);
      }

      router.push("/branches");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create branch."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold">
          Create Branch
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Add a new branch to your cafe.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <Input
            id="name"
            label="Branch Name"
            placeholder="Main Branch"
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
            id="address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);

              if (errors.address) {
                setErrors((current) => ({
                  ...current,
                  address: undefined,
                }));
              }
            }}
            disabled={isLoading}
            placeholder="Enter branch address"
            rows={3}
            required
            className="mt-1 w-full rounded-app border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          {errors.address && (
            <p className="mt-1 text-sm text-danger">
              {errors.address}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            id="phone"
            label="Phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);

              if (errors.phone) {
                setErrors((current) => ({
                  ...current,
                  phone: undefined,
                }));
              }
            }}
            disabled={isLoading}
            required
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-danger">
              {errors.phone}
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