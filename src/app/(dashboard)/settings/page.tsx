import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and application settings.
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        <section className="rounded-app border bg-background p-6">
          <h2 className="text-lg font-semibold">
            Account
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account security and personal information.
          </p>

          <div className="mt-4">
            <Link
              href="/change-password"
              className="inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Change Password
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}