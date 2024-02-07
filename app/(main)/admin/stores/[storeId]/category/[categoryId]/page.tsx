import Link from "next/link";
import { CategoryForm } from "../_components/category-form";
import { getCategoryById } from "@/lib/server-actions/category";

export default async function CategoryPage({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) {
  const { storeId, categoryId } = params;
  const category = await getCategoryById(categoryId as string);

  return (
    <section className="w-full p-4">
      <div className="my-4 flex flex-col gap-y-2">
        <p className="text-sm">
          <Link href={`/admin/stores/${storeId}/category`}>Category</Link> /
          {category?.name}
        </p>
        <h3 className="text-xl font-semibold">Category Name</h3>
      </div>
      <div className="w-full bg-white dark:bg-slate-800 rounded-lg p-8">
        {/* category form header */}
        <CategoryForm
          categoryId={categoryId}
          isEditing
          categories={category}
        />
      </div>
    </section>
  );
}
