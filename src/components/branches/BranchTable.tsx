import Link from "next/link";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table/Table";

import type { Branch } from "@/types/branch";

interface BranchTableProps {
  branches: Branch[];
}

export function BranchTable({
  branches,
}: BranchTableProps) {
  return (
    <div className="overflow-hidden rounded-app border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell className="font-medium">
                {branch.name}
              </TableCell>

              <TableCell>
                {branch.address}
              </TableCell>

              <TableCell>
                {branch.phone}
              </TableCell>

              <TableCell>
                {branch.is_active
                  ? "Active"
                  : "Inactive"}
              </TableCell>

              <TableCell>
                <Link
                  href={`/branches/${branch.id}`}
                  className="text-primary hover:underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}