import  Link from "next/link"
 
import { currentUser } from "@/lib/auth";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";


export default async function AdminPage() {
    const user = await currentUser()
    

    return <div className="w-full h-screen flex items-center justify-center">
        <div className=" p-8 rounded-lg shadow-md border bg-white dark:bg-black  w-[38%]">

            
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="ghost">Log Out</Button>
      </form>
        </div>
    </div>;
}