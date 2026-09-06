import Link from "next/link";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table/Table";

import type { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({
  products,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-app border bg-background p-8 text-center text-sm text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-app border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>Price</TableHead>

              <TableHead>SKU</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.name}
                </TableCell>

                <TableCell>
                  ₹{product.base_price}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {product.sku || "—"}
                </TableCell>

                <TableCell>
                  {product.is_available ? (
                    <span className="rounded-full bg-success/10 px-2 py-1 text-xs text-success">
                      Available
                    </span>
                  ) : (
                    <span className="rounded-full bg-danger/10 px-2 py-1 text-xs text-danger">
                      Unavailable
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}