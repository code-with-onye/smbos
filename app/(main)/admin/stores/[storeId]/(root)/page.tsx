import { currentUser } from "@/lib/auth"
import { getStoresByUserId } from "@/lib/server-actions/store"
import Link from "next/link";


export default async function StorePage(){

    const user = await currentUser()

    return(
        <div>
            
           store
        </div>
    )
}