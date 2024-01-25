import { getCategories, getCategoriesByStoreId } from "@/lib/server-actions/category";
import { EmptyService } from "./_components/empty-service";
import { ServiceHeader } from "./_components/service-header";
import { CreatedService } from "./_components/created-service";


export default async function ServicePage({params}: {params: {storeId: string}}) {

    const categories = await getCategoriesByStoreId(params.storeId);



    const categoriesNamesAndIds = categories?.map((category) => {
        return {
            name: category.name,
            id: category.id
        }
    })

    return <main className="w-full flex flex-col px-4">
       <ServiceHeader categories={categoriesNamesAndIds}/>
        {categoriesNamesAndIds?.length ? <CreatedService categories={categories}/> : <EmptyService categories={categoriesNamesAndIds}/>}
    </main>;
}