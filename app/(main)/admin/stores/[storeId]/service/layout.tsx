
import type { Metadata } from "next";
import { currentUser } from "@/lib/auth";

import { Sidebar } from "@/app/(main)/admin/stores/components/sidebar";
import { getCurrntStoreByUserId, getStoresByUserId } from "@/lib/server-actions/store";


export const metadata: Metadata = {
    title: "Service ",
    description: "Start creating your service",
  };

export default async function ServiceLayout({ children }: { children: React.ReactNode }) {

    const user = await currentUser()
    const currentStore = await getCurrntStoreByUserId(user?.id as string);
    const stores= await getStoresByUserId(user?.id as string);

    const getStoreNamesAndImages = stores?.map((store) => {
        return {
            storeName: store.name,
            storeImage: store.storeImage,
            storeId: store.id
        }
    })
  
    
    return (
        <main className="w-full flex ">
            {/* <Sidebar  store={getStoreNamesAndImages}  currentStoreId={currentStore?.id as string}/> */}
            {children}
        </main>
    )
}