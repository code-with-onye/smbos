import { auth, signOut } from "@/auth"
import { Button } from '@/components/ui/button'


const AdminPage = async () => {
  const session = await auth()
  return (
    <div>AdminPage{" "}
      {JSON.stringify(session)}

      <form action={
        async () => {
          "use server"
          await signOut()
        }
      }>
        <Button variant="ghost">Log Out</Button>
      </form>
    </div>
  )
}

export default AdminPage