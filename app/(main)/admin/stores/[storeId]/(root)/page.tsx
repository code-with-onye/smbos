import { currentUser } from "@/lib/auth"

export default async function StorePage(){

    const user = await currentUser()

    return(
        <div>
           store
        </div>
    )
}