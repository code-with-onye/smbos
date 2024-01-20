import  Link from "next/link"
 
import { getOrgsByUserId } from "@/lib/server-actions/org";
import { currentUser } from "@/lib/auth";
import { orgnizationId } from "@/lib/auth";
import { getStoresByOgnId } from "@/lib/server-actions/store";


export default async function AdminPage() {
    const user = await currentUser()
    const orgId = await orgnizationId()
    const orgs = await getOrgsByUserId(user?.id as string);
    const stores = await getStoresByOgnId(orgId as string);

    return <div className="w-full h-screen flex items-center justify-center">
                <div className=" p-8 rounded-lg shadow-md border bg-white dark:bg-black  w-[38%]">
        {
            orgs?.map((org) => (
                <Link key={org.id} href={`/admin/${org.id}`}>
                    <div className="w-full p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-950">
                    {org.name}
                    </div>
                </Link>
            ))
         }
        </div>
    </div>;
}