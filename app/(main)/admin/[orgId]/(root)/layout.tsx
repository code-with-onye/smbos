
import type { Metadata } from "next";
import { Nav } from "../components/nav";
import { getStoresByOgnId } from "@/lib/server-actions/store";



export const metadata: Metadata = {
    title: "Admin ",
    description: "Manage your service business in one place",
  };

export default async function AdminLayout({ children, params }: { children: React.ReactNode , params: { orgId: string } }) {


    const store = await getStoresByOgnId(params.orgId); 


    if (store?.length === 0) {
        return (
            <div className="w-full px-4">
                <h1>No Store Found</h1>
            </div>
        );
    }


    return (
        <main className="w-full flex flex-col">
            <Nav/>
            {children}
        </main>
    )
}