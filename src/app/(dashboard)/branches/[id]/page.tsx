import Link from "next/link";

import { BranchService } from "@/lib/api";

interface BranchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BranchPage({
  params,
}: BranchPageProps) {
  const { id } = await params;

  const branchId = Number(id);

  if (!Number.isInteger(branchId)) {
    return (
      <div className="rounded-app border bg-background p-6">
        <h1 className="text-lg font-semibold">
          Invalid branch ID
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          The branch ID is not valid.
        </p>
      </div>
    );
  }

  const response = await BranchService.getById(branchId);

  const branch = response.data;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/branches"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Branches
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">
            {branch.name}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Branch details
          </p>
        </div>
      </div>

      {/* Branch information */}
      <div className="rounded-app border bg-background">
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <BranchDetail
            label="Name"
            value={branch.name}
          />

          <BranchDetail
            label="Phone"
            value={branch.phone || "—"}
          />

          <div className="sm:col-span-2">
            <BranchDetail
              label="Address"
              value={branch.address || "—"}
            />
          </div>

          <BranchDetail
            label="Status"
            value={
              branch.is_active
                ? "Active"
                : "Inactive"
            }
          />
        </div>
      </div>
    </div>
  );
}

interface BranchDetailProps {
  label: string;
  value: string;
}

function BranchDetail({
  label,
  value,
}: BranchDetailProps) {
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