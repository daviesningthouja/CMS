"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { changePassword } from "@/lib/auth-action";

export function ChangePasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!currentPassword) {
      setError("Current password is required");
      return;
    }

    if (!newPassword) {
      setError("New password is required");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const result = await changePassword({
        email: email.trim(),
        current_password: currentPassword,
        new_password: newPassword,
      });

      const message =
        typeof result === "object" &&
        result !== null &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : "Password changed successfully";

      setSuccess(message);

      setEmail("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-app border bg-background p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Change Password
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your account password.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-sm font-medium"
            >
              Current Password
            </label>

            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Enter current password"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-medium"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Enter new password"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Confirm new password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}