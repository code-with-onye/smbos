import { currentUser } from "@/lib/auth"
import { OpenHoursCard } from "../../components/open-hours-card"

export default async function StorePage(){

    const user = await currentUser()

    return(
        <div>
           store
           <OpenHoursCard/>
        </div>
    )
}