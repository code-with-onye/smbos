
import type { Metadata } from "next";
import { orgnizationId } from "@/lib/auth";

import { Sidebar } from "@/app/(main)/admin/[orgId]/components/sidebar";
import {  getCurrentStoreByOgnId, getStoresByOgnId } from "@/lib/server-actions/store";


export const metadata: Metadata = {
    title: "Service ",
    description: "Start creating your service",
  };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const orgId = await orgnizationId();
    const stores  = await getStoresByOgnId(orgId as string);
    const currentStore = await getCurrentStoreByOgnId(orgId as string);

    const getStoreNamesAndImages = stores?.map((store) => {
        return {
            storeName: store.name,
            storeImage: store.storeImage,
            storeId: store.id
        }
    })
    
    return (
        <main className="w-full flex ">
            <Sidebar  store={getStoreNamesAndImages}  currentStoreId={currentStore?.id as string}/>
            {children}
        </main>
    )
}