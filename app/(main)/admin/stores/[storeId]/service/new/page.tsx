import Link from "next/link";
import { ServiceForm } from "../_components/service-form";
import { getCategoriesByStoreId } from "@/lib/server-actions/category";

export default async function ServiceNewPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;

  const categories = await getCategoriesByStoreId(params.storeId);
  const categoriesNamesAndIds = categories?.map((category) => {
    return {
      name: category.name,
      id: category.id,
    };
  });

  return (
    <section className="w-full p-2">
      <div className="my-4 flex flex-col gap-y-2">
        <p className="text-sm">
          <Link href={`/admin/stores/${storeId}/category`}>Category</Link> /
          categoryName
        </p>
        <h3 className="text-xl font-semibold">New Category</h3>
      </div>
      <div className="w-full bg-white dark:bg-slate-800 rounded-lg p-2">
        {/* category form header */}
        <ServiceForm categories={categoriesNamesAndIds} service={null} />
      </div>
    </section>
  );
}
