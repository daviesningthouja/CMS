import Link from "next/link";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table/Table";

import type { Category } from "@/types/category";

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({
  categories,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-app border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">
                {category.name}
              </TableCell>

              <TableCell>
                {category.description}
              </TableCell>

              <TableCell>
                {category.branch_id}
              </TableCell>

              <TableCell>
                {category.is_active
                  ? "Active"
                  : "Inactive"}
              </TableCell>

              <TableCell>
                <Link
                  href={`/categories/${category.id}`}
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