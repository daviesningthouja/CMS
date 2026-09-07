import { ProductForm } from "@/components/products/ProductForm";
import { BranchService, CategoryService } from "@/lib/api";

export default async function NewProductPage() {
  const [branchesResponse, categoriesResponse] = await Promise.all([
    BranchService.getAll(),
    CategoryService.getAll(),
  ]);


  const rawBranches = branchesResponse.data;
  const branches = Array.isArray(rawBranches) ? rawBranches : (rawBranches ? [rawBranches] : []);

  const rawCategories = categoriesResponse.data;
  const categories = Array.isArray(rawCategories) ? rawCategories : (rawCategories ? [rawCategories] : []);

  //console.log("Categories API Response:", categoriesResponse);

  return (
    <div className="p-6">
      <ProductForm
        branches={branches}
        categories={categories}
      />
    </div>
  );
}