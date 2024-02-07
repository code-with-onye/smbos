import { currentUser } from "@/lib/auth"
import { getStoresByUserId } from "@/lib/server-actions/store"
import Link from "next/link";


export default async function StoresPage(){

    const user = await currentUser()

    const stores = await getStoresByUserId( user?.id as string);
    
    return(
        <div className="flex flex-col gap-y-4">
            
            {
                stores?.map((store) => {
                    return <Link href={`/admin/stores/${store.id}/service`} key={store.id} >{store.name}</Link>
                    
                })
            }
        </div>
    )
}