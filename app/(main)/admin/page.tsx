import  Link from "next/link"
 
import { getOrgsByUserId } from "@/lib/server-actions/org";
import { currentUser } from "@/lib/auth";


export default async function AdminPage() {
    const user = await currentUser()
    const orgs = await getOrgsByUserId(user?.id as string);

    return <div>
         {
            orgs?.map((org) => (
                <Link key={org.id} href={`/admin/${org.id}`}>
                    {org.name}
                </Link>
            ))
         }
    </div>;
}