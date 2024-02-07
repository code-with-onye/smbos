import Link from "next/link";
import { CategoryForm } from "../_components/category-form";
import prismadb from "@/lib/prismadb";

export default function CategoryNewPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  return (
    <section className="w-full p-4">
      <div className="my-4 flex flex-col gap-y-2">
        <p className="text-sm">
          <Link href={`/admin/stores/${storeId}/service`}>Service</Link> /
          categoryName
        </p>
        <h3 className="text-xl font-semibold">New Category</h3>
      </div>
      <div className="w-full bg-white dark:bg-slate-800 rounded-lg p-8">
        {/* category form header */}
        <CategoryForm />
      </div>
    </section>
  );
}
