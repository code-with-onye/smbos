import { getCategoriesByStoreId } from "@/lib/server-actions/category";
import { ServiceForm } from "../_components/service-form";
import Link from "next/link";
import { getServiceById } from "@/lib/server-actions/services";

export default async function ServicePage({
  params,
}: {
  params: { storeId: string; serviceId: string };
}) {
  const { storeId, serviceId } = params;

  const service = await getServiceById(serviceId as string);
  const categoriesByStoreId = await getCategoriesByStoreId(storeId);
  const categoriesByNamesAndIds = categoriesByStoreId?.map((category) => {
    return {
      name: category.name,
      id: category.id,
    };
  });


  return (
    <div className="w-full  px-2">
      <div className="my-4 flex flex-col gap-y-2">
        <div className="text-sm w-full inline-flex items-center gap-x-1.5">
          <Link href={`/admin/stores/${storeId}/service`}>Service</Link> /
          <p className="font-semibold ">{service?.name} </p>
        </div>
        <h3 className="text-xl font-semibold">Service Name</h3>
      </div>
      <div className="w-full ">
        <ServiceForm categories={categoriesByNamesAndIds} isEditing  serviceId={serviceId} service={service} />
      </div>
    </div>
  );
}
