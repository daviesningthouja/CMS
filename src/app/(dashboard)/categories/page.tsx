import Link from "next/link";
import { CategoryService } from "@/lib/api";
import {CategoryTable} from "@/components/categories/CategoryTable";

export default async function CategoriesPage(){
    const response = await CategoryService.getAll();
    return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Categories
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your cafe branches.
          </p>
        </div>

        <Link
          href="/categories/new"
          className="rounded-app bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          + Create Categories
        </Link>
      </div>
        <CategoryTable categories={response.data} /> 
    </div>
  );
}