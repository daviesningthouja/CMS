import Link from "next/link";

import { BranchService } from "@/lib/api";
import { BranchTable } from "@/components/branches/BranchTable";

export default async function BranchesPage() {
  const response = await BranchService.getAll();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Branches
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your cafe branches.
          </p>
        </div>

        <Link
          href="/branches/new"
          className="rounded-app bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          + Create Branch
        </Link>
      </div>

      <BranchTable branches={response.data} />
    </div>
  );
}